const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainable-marketplace')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Generate Demo Data
const generateDemoData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Generate Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('+91##########'),
        sustainabilityMetrics: {
          wastePreventedKg: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
          carbonFootprintReduced: faker.number.float({ min: 0, max: 200, precision: 0.1 }),
          totalImpact: faker.number.float({ min: 0, max: 1000, precision: 0.1 })
        },
        rewards: {
          points: faker.number.int({ min: 0, max: 5000 }),
          tier: faker.helpers.arrayElement(['Bronze', 'Silver', 'Gold', 'Platinum']),
          badges: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
            name: faker.helpers.arrayElement([
              'Eco Warrior',
              'Smart Shopper',
              'Waste Reducer',
              'Green Champion',
              'Sustainability Star'
            ]),
            earnedAt: faker.date.past()
          })),
          pointsHistory: Array.from({ length: faker.number.int({ min: 2, max: 8 }) }, () => ({
            points: faker.number.int({ min: 10, max: 500 }),
            reason: faker.helpers.arrayElement([
              'Purchase Reward',
              'Referral Bonus',
              'Sustainability Achievement',
              'Monthly Bonus'
            ]),
            date: faker.date.past()
          }))
        }
      });
      users.push(await user.save());
    }

    // Generate Products
    const products = [];
    const categories = ['Groceries', 'Bakery', 'Dairy', 'Produce', 'Meat', 'Seafood'];
    
    for (let i = 0; i < 50; i++) {
      const originalPrice = faker.number.float({ min: 10, max: 1000, precision: 0.01 });
      const discountPercentage = faker.number.int({ min: 10, max: 70 });
      const discountedPrice = originalPrice * (1 - discountPercentage / 100);

      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.helpers.arrayElement(categories),
        originalPrice,
        discountedPrice,
        discountPercentage,
        quantity: faker.number.int({ min: 0, max: 100 }),
        expiryDate: faker.date.future(),
        bestBeforeDate: faker.date.future(),
        sustainabilityMetrics: {
          potentialWastePrevented: faker.number.float({ min: 0.1, max: 10, precision: 0.1 }),
          carbonFootprintSaved: faker.number.float({ min: 0.1, max: 15, precision: 0.1 })
        },
        status: faker.helpers.arrayElement(['Available', 'Low Stock', 'Out of Stock']),
        deliveryOptions: {
          isDeliverable: faker.datatype.boolean(),
          deliveryAreas: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
            areaName: faker.location.city(),
            pincode: faker.location.zipCode(),
            deliveryFee: faker.number.float({ min: 20, max: 100, precision: 1 })
          }))
        }
      });
      products.push(await product.save());
    }

    // Generate Orders
    for (let i = 0; i < 100; i++) {
      const user = faker.helpers.arrayElement(users);
      const orderItems = Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => {
          const product = faker.helpers.arrayElement(products);
          return {
            productName: product.name,
            originalPrice: product.originalPrice,
            discountedPrice: product.discountedPrice,
            quantity: faker.number.int({ min: 1, max: 5 }),
            expiryDate: product.expiryDate,
            sustainabilityMetrics: {
              wastePreventedKg: faker.number.float({ min: 0.1, max: 5, precision: 0.1 }),
              carbonFootprintSaved: faker.number.float({ min: 0.1, max: 7, precision: 0.1 })
            }
          };
        }
      );

      const totalOriginalPrice = orderItems.reduce(
        (sum, item) => sum + (item.originalPrice * item.quantity), 
        0
      );
      const totalDiscountedPrice = orderItems.reduce(
        (sum, item) => sum + (item.discountedPrice * item.quantity), 
        0
      );

      const order = new Order({
        userId: user._id,
        items: orderItems,
        status: faker.helpers.arrayElement(['Pending', 'Processing', 'Delivered', 'Cancelled']),
        totalOriginalPrice,
        totalDiscountedPrice,
        totalSaved: totalOriginalPrice - totalDiscountedPrice,
        pointsEarned: Math.floor(totalDiscountedPrice * 0.1),
        deliveryDate: faker.date.future()
      });

      await order.save();
    }

    console.log('Demo data generated successfully!');
  } catch (error) {
    console.error('Error generating demo data:', error);
  }
};

// Call generate demo data when starting the server
generateDemoData();

// ... (previous code remains the same)

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  };
  
  // Authentication Routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, email, phoneNumber, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ 
        $or: [{ email }, { phoneNumber }] 
      });
  
      if (existingUser) {
        return res.status(400).json({ 
          message: 'User already exists with this email or phone number' 
        });
      }
  
      // Create new user
      const user = new User({
        name,
        email,
        phoneNumber,
        sustainabilityMetrics: {
          wastePreventedKg: 0,
          carbonFootprintReduced: 0,
          totalImpact: 0
        },
        rewards: {
          points: 100, // Welcome bonus
          tier: 'Bronze',
          badges: [{
            name: 'New Member',
            earnedAt: new Date()
          }],
          pointsHistory: [{
            points: 100,
            reason: 'Welcome Bonus',
            date: new Date()
          }]
        }
      });
  
      await user.save();
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
  
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          rewards: user.rewards
        }
      });
  
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
  
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          rewards: user.rewards
        }
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  });
  
  // Password Reset Routes
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP (in a real app, you'd want to store this securely)
      user.resetPasswordOtp = otp;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      // Send OTP (mock implementation)
      console.log(`Password reset OTP for ${email}: ${otp}`);
  
      res.json({ message: 'Password reset OTP sent successfully' });
  
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Error initiating password reset' });
    }
  });
  
  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await User.findOne({
        email,
        resetPasswordOtp: otp,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      // Update password
      user.resetPasswordOtp = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successful' });
  
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  });
  
  // Protected User Routes
  app.get('/api/user/profile', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          sustainabilityMetrics: user.sustainabilityMetrics,
          rewards: user.rewards
        }
      });
  
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  });
  
  app.put('/api/user/profile', authenticateToken, async (req, res) => {
    try {
      const { name, phoneNumber } = req.body;
      const user = await User.findById(req.user.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name || user.name;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      await user.save();
  
      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      });
  
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  });

// Product Operations
app.get('/api/products', async (req, res) => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      sortBy = 'expiryDate',
      page = 1,
      limit = 10 
    } = req.query;

    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.discountedPrice = {};
      if (minPrice) filter.discountedPrice.$gte = Number(minPrice);
      if (maxPrice) filter.discountedPrice.$lte = Number(maxPrice);
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'expiryDate':
        sort = { expiryDate: 1 };
        break;
      case 'price':
        sort = { discountedPrice: 1 };
        break;
      case 'impact':
        sort = { 'sustainabilityMetrics.potentialWastePrevented': -1 };
        break;
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: Number(page),
        limit: Number(limit)
      }
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Order Operations
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.userId;

    // Calculate totals
    let totalOriginalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalWastePrevented = 0;
    let totalCarbonSaved = 0;

    // Process each item
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);

      const itemTotal = product.discountedPrice * item.quantity;
      totalOriginalPrice += product.originalPrice * item.quantity;
      totalDiscountedPrice += itemTotal;
      totalWastePrevented += product.sustainabilityMetrics.potentialWastePrevented * item.quantity;
      totalCarbonSaved += product.sustainabilityMetrics.carbonFootprintSaved * item.quantity;

      return {
        productName: product.name,
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice,
        quantity: item.quantity,
        expiryDate: product.expiryDate,
        sustainabilityMetrics: {
          wastePreventedKg: product.sustainabilityMetrics.potentialWastePrevented * item.quantity,
          carbonFootprintSaved: product.sustainabilityMetrics.carbonFootprintSaved * item.quantity
        }
      };
    }));

    // Calculate rewards points (1 point per ₹10 spent)
    const pointsEarned = Math.floor(totalDiscountedPrice / 10);

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalOriginalPrice,
      totalDiscountedPrice,
      totalSaved: totalOriginalPrice - totalDiscountedPrice,
      pointsEarned,
      sustainabilityMetrics: {
        wastePreventedKg: totalWastePrevented,
        carbonFootprintSaved: totalCarbonSaved
      }
    });

    await order.save();

    // Update user metrics
    await User.findByIdAndUpdate(userId, {
      $inc: {
        'sustainabilityMetrics.wastePreventedKg': totalWastePrevented,
        'sustainabilityMetrics.carbonFootprintReduced': totalCarbonSaved,
        'rewards.points': pointsEarned
      },
      $push: {
        'rewards.pointsHistory': {
          points: pointsEarned,
          reason: 'Purchase Reward',
          date: new Date()
        }
      }
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      rewards: {
        pointsEarned,
        sustainabilityImpact: {
          wastePreventedKg: totalWastePrevented,
          carbonFootprintSaved: totalCarbonSaved
        }
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({ orders });

  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Rewards and Impact Dashboard
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const orders = await Order.find({ userId: req.user.userId });

    // Calculate metrics
    const totalOrders = orders.length;
    const totalSaved = orders.reduce((sum, order) => sum + order.totalSaved, 0);
    const impactMetrics = {
      wastePreventedKg: user.sustainabilityMetrics.wastePreventedKg,
      carbonFootprintReduced: user.sustainabilityMetrics.carbonFootprintReduced,
      totalOrders,
      totalSaved,
      rewardsPoints: user.rewards.points,
      tier: user.rewards.tier,
      badges: user.rewards.badges
    };

    // Get nearby deals
    const nearbyDeals = await Product.find({
      status: 'Available',
      expiryDate: { $gt: new Date() }
    })
    .sort({ expiryDate: 1 })
    .limit(5);

    res.json({
      impactMetrics,
      nearbyDeals,
      recentOrders: orders.slice(0, 5)
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

// Example API calls for testing
const testAPICalls = async () => {
  try {
    console.log('\nTesting API Endpoints:');

    // 1. Register new user
    console.log('\nTesting User Registration:');
    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+919876543210',
        password: 'password123'
      })
    });
    console.log('Register Response:', await registerResponse.json());

    // 2. Login
    console.log('\nTesting Login:');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);

    // Use token for authenticated requests
    const token = loginData.token;

    // 3. Get Products
    console.log('\nTesting Get Products:');
    const productsResponse = await fetch('http://localhost:3000/api/products');
    console.log('Products Response:', await productsResponse.json());

    // 4. Create Order
    console.log('\nTesting Create Order:');
    const orderResponse = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items: [
          { productId: '...', quantity: 2 },
          { productId: '...', quantity: 1 }
        ]
      })
    });
    console.log('Order Response:', await orderResponse.json());

    // 5. Get Dashboard
    console.log('\nTesting Get Dashboard:');
    const dashboardResponse = await fetch('http://localhost:3000/api/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Dashboard Response:', await dashboardResponse.json());

  } catch (error) {
    console.error('API Test Error:', error);
  }
};

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Uncomment to run API tests
  // testAPICalls();
});
// ... (previous code remains the same)

// Analytics and Reporting
app.get('/api/analytics/impact', authenticateToken, async (req, res) => {
    try {
      const { timeframe = 'month' } = req.query;
      const userId = req.user.userId;
  
      let dateFilter = {};
      const now = new Date();
      
      switch(timeframe) {
        case 'week':
          dateFilter = { 
            createdAt: { 
              $gte: new Date(now.setDate(now.getDate() - 7))
            }
          };
          break;
        case 'month':
          dateFilter = {
            createdAt: {
              $gte: new Date(now.setMonth(now.getMonth() - 1))
            }
          };
          break;
        case 'year':
          dateFilter = {
            createdAt: {
              $gte: new Date(now.setFullYear(now.getFullYear() - 1))
            }
          };
          break;
      }
  
      // Aggregate impact metrics
      const impactMetrics = await Order.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId), ...dateFilter } },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalSaved: { $sum: '$totalSaved' },
            wastePreventedKg: { $sum: '$sustainabilityMetrics.wastePreventedKg' },
            carbonFootprintSaved: { $sum: '$sustainabilityMetrics.carbonFootprintSaved' }
          }
        }
      ]);
  
      // Get trending products
      const trendingProducts = await Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.productName',
            totalQuantity: { $sum: '$items.quantity' },
            totalImpact: { 
              $sum: '$items.sustainabilityMetrics.wastePreventedKg'
            }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 }
      ]);
  
      res.json({
        timeframe,
        metrics: impactMetrics[0] || {
          totalOrders: 0,
          totalSaved: 0,
          wastePreventedKg: 0,
          carbonFootprintSaved: 0
        },
        trendingProducts
      });
  
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({ message: 'Error fetching analytics' });
    }
  });
  
  // Notifications System
  app.post('/api/notifications/settings', authenticateToken, async (req, res) => {
    try {
      const { 
        emailNotifications, 
        pushNotifications, 
        dealAlerts,
        expiryAlerts 
      } = req.body;
  
      await User.findByIdAndUpdate(req.user.userId, {
        notificationSettings: {
          email: emailNotifications,
          push: pushNotifications,
          deals: dealAlerts,
          expiry: expiryAlerts
        }
      });
  
      res.json({ message: 'Notification settings updated successfully' });
  
    } catch (error) {
      console.error('Notification settings error:', error);
      res.status(500).json({ message: 'Error updating notification settings' });
    }
  });
  
  // Community Features
  app.get('/api/community/leaderboard', async (req, res) => {
    try {
      const leaderboard = await User.aggregate([
        {
          $project: {
            name: 1,
            impact: '$sustainabilityMetrics.wastePreventedKg',
            points: '$rewards.points',
            tier: '$rewards.tier'
          }
        },
        { $sort: { points: -1 } },
        { $limit: 10 }
      ]);
  
      res.json({ leaderboard });
  
    } catch (error) {
      console.error('Leaderboard error:', error);
      res.status(500).json({ message: 'Error fetching leaderboard' });
    }
  });
  
  // Health Check Endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime()
    });
  });
  
  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
  
  // Graceful Shutdown
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    server.close(() => {
      console.log('Server closed. Database connections cleaned up.');
      process.exit(0);
    });
  });
  
  // Example Usage Documentation
  const apiDocs = {
    auth: {
      register: 'POST /api/auth/register - Register new user',
      login: 'POST /api/auth/login - User login',
      resetPassword: 'POST /api/auth/reset-password - Reset password'
    },
    products: {
      list: 'GET /api/products - Get products with filters',
      details: 'GET /api/products/:id - Get product details'
    },
    orders: {
      create: 'POST /api/orders - Create new order',
      list: 'GET /api/orders - Get user orders'
    },
    dashboard: {
      metrics: 'GET /api/dashboard - Get user dashboard data',
      analytics: 'GET /api/analytics/impact - Get impact analytics'
    },
    community: {
      leaderboard: 'GET /api/community/leaderboard - Get community leaderboard'
    }
  };
  
  // Print API documentation in development
  if (process.env.NODE_ENV === 'development') {
    console.log('\nAPI Documentation:', apiDocs);
  }
  
  // Export for testing
  module.exports = app;