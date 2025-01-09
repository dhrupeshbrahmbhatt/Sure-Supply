const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, enum: ['retailer', 'customer'], required: true },
  isPhoneVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date }
});

module.exports = mongoose.model('SS:User', userSchema); 