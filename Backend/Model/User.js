import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Sustainability Metrics
  sustainabilityMetrics: {
    wastePreventedKg: {
      type: Number,
      default: 0
    },
    carbonFootprintReduced: {
      type: Number,
      default: 0
    },
    totalImpact: {
      type: Number,
      default: 0
    }
  },
  
  // Rewards System
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    tier: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      default: 'Bronze'
    },
    badges: [{
      name: String,
      earnedAt: Date
    }],
    pointsHistory: [{
      points: Number,
      reason: String,
      date: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for frequent queries
userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ 'rewards.points': -1 });

const User = mongoose.model('User', userSchema);

export default User; 