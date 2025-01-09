require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const User = require('./Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTP } = require('./utils/otpUtils');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const corsOptions = {
//     origin: 'https://hello-haven.onrender.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'], // Include any required headers
// };
app.use(cors({
  origin: 'http://localhost:5173', // or whatever your frontend URL is
  credentials: true
}));

// Connect to MongoDB
mongoose.connect("mongodb+srv://dhrupesh:DK_dk@lab.pk1pccj.mongodb.net/labData")
  .then(() => console.log("Server connected to DB..."))
  .catch(err => console.log("Error in MongoDB connection: " + err));
console.log("DB connected succesfully");

app.post("/signup", async (req, res) => {
    console.log("Signup request received:", req.body);
    try {
        // Validate required fields
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(400).send("Missing required fields: email, password, and name are required");
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("Email address already in use.");
        }
        console.log("No existing user found starting to create a new user...");
        // Use a default value for saltRounds if environment variable isn't set
        const saltRounds = process.env.saltRounds ? parseInt(process.env.saltRounds) : 10;
        const hash = await bcrypt.hash(req.body.password.toString(), saltRounds);

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phoneNumber: req.body.phoneNumber,
        };
        await User.create(user);
        console.log("User created: " + user);
        res.status(200).json({symmetric_key: symmetricKey});
    } catch (err) {
        console.error("Error:", err);
        res.sendStatus(500); // Internal Server Error
    }
})
  
  .post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Signin request received:", req.body);
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("User not found");
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }
  
      // If the password matches, sign-in is successful
      // Create a JWT token after successful signin
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, user, symmetric_key: user.symmetric_key });
    } catch (err) {
      console.error("Sign In Error:", err);
      res.status(500).send("Internal Server Error");
    }
  })

  .get("/profile", verifyToken, async (req, res) => {
    if (req.user) {
      try {
        // Validate if the _id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
          return res.status(400).send("Invalid user ID");
        }
        const user = await User.findById(req.user.userId); 
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.send({ user: user });
      } catch (err) {
        return res.status(400).send("Error fetching user profile");
      }
    } else {
      return res.status(401).send("Unauthorized");
    }
  })

// Retailer signup
app.post("/retailer/signup", async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        
        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).send("All fields are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        const otp = generateOTP();
        const hash = await bcrypt.hash(password.toString(), 10);

        const user = await User.create({
            name,
            email,
            password: hash,
            phoneNumber,
            userType: 'retailer',
            otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000) // OTP valid for 10 minutes
        });

        await sendOTP(phoneNumber, otp);
        res.status(200).json({ message: "OTP sent for verification" });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Customer signup
app.post("/customer/signup", async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        
        if (!name || !phoneNumber) {
            return res.status(400).send("Name and phone number are required");
        }

        const existingUser = await User.findOne({ phoneNumber, userType: 'customer' });
        if (existingUser) {
            return res.status(400).send("Phone number already registered");
        }

        const user = await User.create({
            name,
            phoneNumber,
            userType: 'customer'
        });

        res.status(200).json({ message: "Customer registered successfully" });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }

        if (user.otp !== otp || Date.now() > user.otpExpiry) {
            return res.status(400).send("Invalid or expired OTP");
        }

        user.isPhoneVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Phone number verified successfully" });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
});

async function verifyToken(req, res, next) {  
  // Extract the token from the 'Authorization' header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Split by space, not '='  
  if (!token) return res.status(401).send("Access denied");
  try {
    // Verify the token using JWT
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user info to the request
    req.user = decodedPayload; // Attach the full decoded payload, not just the _id
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

app.listen(3000, () => console.log("Server Started..."));