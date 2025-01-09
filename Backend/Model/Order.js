import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // Order Basic Info
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Order Items
  items: [{
    productName: {
      type: String,
      required: true
    },
    originalPrice: {
      type: Number,
      required: true
    },
    discountedPrice: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    expiryDate: {
      type: Date,
      required: true
    },
    // Track sustainability impact per item
    sustainabilityMetrics: {
      wastePreventedKg: Number,
      carbonFootprintSaved: Number
    }
  }],
  
  // Order Status
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  
  // Payment & Pricing
  totalOriginalPrice: {
    type: Number,
    required: true
  },
  totalDiscountedPrice: {
    type: Number,
    required: true
  },
  totalSaved: {
    type: Number,
    required: true
  },
  
  // Rewards
  pointsEarned: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: Date,
  
  // Monthly/Yearly tracking
  monthYear: {
    type: String, // Format: "YYYY-MM"
    required: true
  }
}, {
  timestamps: true
});

// Indexes for frequent queries
orderSchema.index({ userId: 1, orderDate: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ monthYear: 1 });
orderSchema.index({ orderNumber: 1 }, { unique: true });

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await mongoose.model('Order').countDocuments() + 1;
    this.orderNumber = `ORD-${year}${month}-${count.toString().padStart(5, '0')}`;
    this.monthYear = `${date.getFullYear()}-${month}`;
  }
  next();
});

// Calculate sustainability metrics before saving
orderSchema.pre('save', function(next) {
  let totalWastePrevented = 0;
  let totalCarbonSaved = 0;
  
  this.items.forEach(item => {
    if (item.sustainabilityMetrics) {
      totalWastePrevented += item.sustainabilityMetrics.wastePreventedKg || 0;
      totalCarbonSaved += item.sustainabilityMetrics.carbonFootprintSaved || 0;
    }
  });
  
  // Update user's sustainability metrics (will be handled by a post-save hook)
  this._sustainabilityMetrics = {
    wastePreventedKg: totalWastePrevented,
    carbonFootprintSaved: totalCarbonSaved
  };
  
  next();
});

// Update user's metrics after order is saved
orderSchema.post('save', async function(doc) {
  if (this._sustainabilityMetrics) {
    await mongoose.model('User').findByIdAndUpdate(
      this.userId,
      {
        $inc: {
          'sustainabilityMetrics.wastePreventedKg': this._sustainabilityMetrics.wastePreventedKg,
          'sustainabilityMetrics.carbonFootprintReduced': this._sustainabilityMetrics.carbonFootprintSaved,
          'rewards.points': this.pointsEarned
        }
      }
    );
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order; 