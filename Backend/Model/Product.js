import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Basic Product Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Groceries', 'Bakery', 'Dairy', 'Produce', 'Meat', 'Seafood', 'Other']
  },
  
  // Pricing
  originalPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  
  // Inventory & Expiry
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  bestBeforeDate: {
    type: Date,
    required: true
  },
  
  // Sustainability Metrics
  sustainabilityMetrics: {
    potentialWastePrevented: {
      type: Number,
      required: true
    },
    carbonFootprintSaved: {
      type: Number,
      required: true
    }
  },
  
  // Sustainability Badges
  sustainabilityBadges: [{
    type: String,
    enum: [
      'Almost Expired',
      'Rescue Ready',
      'Planet Saver',
      'Best Deal',
      'Quick Sale',
      'High Impact'
    ]
  }],
  
  // Product Status
  status: {
    type: String,
    enum: ['Available', 'Low Stock', 'Out of Stock', 'Expired'],
    default: 'Available'
  },
  
  // Delivery Info
  deliveryOptions: {
    isDeliverable: {
      type: Boolean,
      default: true
    },
    deliveryAreas: [{
      areaName: String,
      pincode: String,
      deliveryFee: Number
    }],
    estimatedDeliveryTime: {
      type: String,
      default: "2-3 hours"
    }
  },
  
  // Timestamps
  listedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for frequent queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ expiryDate: 1 });
productSchema.index({ status: 1 });
productSchema.index({ 'sustainabilityBadges': 1 });

// Pre-save hook to update status based on quantity and expiry
productSchema.pre('save', function(next) {
  // Update status based on quantity
  if (this.quantity === 0) {
    this.status = 'Out of Stock';
  } else if (this.quantity <= 5) {
    this.status = 'Low Stock';
  }
  
  // Update status based on expiry
  const now = new Date();
  if (this.expiryDate <= now) {
    this.status = 'Expired';
  }
  
  // Update sustainability badges
  this.updateSustainabilityBadges();
  
  next();
});

// Method to update sustainability badges
productSchema.methods.updateSustainabilityBadges = function() {
  const badges = [];
  const now = new Date();
  const hoursUntilExpiry = (this.expiryDate - now) / (1000 * 60 * 60);
  
  // Add badges based on conditions
  if (hoursUntilExpiry <= 48) {
    badges.push('Almost Expired');
    badges.push('Quick Sale');
  }
  
  if (this.discountPercentage >= 50) {
    badges.push('Best Deal');
  }
  
  if (this.sustainabilityMetrics.potentialWastePrevented > 5) {
    badges.push('Planet Saver');
  }
  
  if (this.sustainabilityMetrics.carbonFootprintSaved > 10) {
    badges.push('High Impact');
  }
  
  this.sustainabilityBadges = badges;
};

const Product = mongoose.model('Product', productSchema);

export default Product; 