import { useState } from 'react';

const RetailerDashboard = () => {
  const demoData = {
    // Inventory Management
    inventoryMetrics: {
      totalItems: 245,
      lowStockItems: [
        { id: 1, name: "Fresh Milk", stock: 5, supplier: "Dairy Farm Co." },
        { id: 2, name: "Whole Wheat Bread", stock: 3, supplier: "Local Bakery" },
        { id: 3, name: "Organic Eggs", stock: 4, supplier: "Free Range Farms" }
      ],
      expiringItems: 8,
      overStockedItems: 15
    },
    
    // Financial Metrics
    financials: {
      totalRevenue: 12850.00,
      savingsFromWastePrevention: 2340.00,
      revenueFromDiscountedItems: 1580.00,
      sustainabilityBonus: 450.00
    },
    
    // Waste Prevention Metrics
    wasteMetrics: {
      wastePreventedKg: 156,
      carbonFootprintReduced: 234,
      socialImpactScore: 89,
      donationsToNGOs: 45
    },
    
    // AI Predictions
    aiInsights: {
      predictedStockouts: [
        { product: "Apples", probability: 0.85, timeframe: "3 days" },
        { product: "Milk", probability: 0.72, timeframe: "2 days" }
      ],
      demandForecast: [
        { product: "Bread", trend: "increasing", suggestion: "Increase stock by 20%" },
        { product: "Yogurt", trend: "decreasing", suggestion: "Consider promotions" }
      ]
    },
    
    // Social Impact
    socialImpact: {
      ngoPartnerships: 3,
      totalDonations: 234,
      communityRating: 4.5,
      impactCertifications: ["Zero Waste", "Community Champion"]
    },
    
    // Gamification Metrics
    gamification: {
      sustainabilityScore: 850,
      rankingInArea: 3,
      badges: ["Waste Warrior", "Community Leader", "Smart Predictor"],
      monthlyGoalProgress: 78
    },
    
    // Blockchain Tracking
    blockchainMetrics: {
      verifiedTransactions: 156,
      wasteTraceability: 98,
      qualityScore: 4.8,
      transparencyRating: "A+"
    },

    // Top Products
    topProducts: [
      { id: 1, name: "Organic Bananas", sales: 234, revenue: 468.00, trend: "+15%" },
      { id: 2, name: "Fresh Milk", sales: 189, revenue: 567.00, trend: "+8%" },
      { id: 3, name: "Whole Grain Bread", sales: 156, revenue: 468.00, trend: "+12%" }
    ],

    // Recent Activity Feed
    recentActivity: [
      { id: 1, type: "order", message: "New bulk order received", time: "5 minutes ago" },
      { id: 2, type: "stock", message: "Low stock alert: Fresh Milk", time: "15 minutes ago" },
      { id: 3, type: "customer", message: "New customer feedback", time: "1 hour ago" },
      { id: 4, type: "waste", message: "Waste prevention goal achieved", time: "2 hours ago" }
    ],

    // Sales Data for Chart
    salesData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales 2024",
          data: [12, 19, 3, 5, 2, 3],
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1
        }
      ]
    },

    // Performance Metrics
    performanceMetrics: {
      monthlyGrowth: "+12.5%",
      averageOrderValue: "$45.50",
      customerRetention: "85%",
      wasteReduction: "23%"
    }
  };

  return (
    <div className="p-6 bg-luxury-pearl min-h-screen">
      {/* Header with gradient */}
      <div className="mb-8 bg-luxury-gradient from-luxury-light to-luxury-pearl p-8 rounded-2xl shadow-luxury">
        <h1 className="text-4xl font-bold text-luxury-dark">Retailer Dashboard</h1>
        <p className="text-gray-600 mt-2 text-lg">Your store performance at a glance</p>
      </div>

      {/* Stats Grid - Enhanced styling */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${demoData.financials.totalRevenue}</p>
              <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Add similar stats cards for other metrics */}
        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{demoData.inventoryMetrics.totalItems}</p>
              <p className="text-sm text-green-600 mt-2">+8% from last month</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${((demoData.financials.totalRevenue / demoData.inventoryMetrics.totalItems).toFixed(2))}
              </p>
              <p className="text-sm text-yellow-600 mt-2">-2% from last month</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{demoData.socialImpact.ngoPartnerships}</p>
              <p className="text-sm text-green-600 mt-2">+15% from last month</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <svg className="w-6 h-6 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Overview - Enhanced chart container */}
      <div className="bg-white rounded-2xl shadow-luxury p-8 mb-8">
        <h2 className="text-2xl font-semibold text-luxury-dark mb-6">Sales Overview</h2>
        <div className="h-80 bg-luxury-pearl/50 rounded-xl p-4">
          {/* Chart component */}
        </div>
      </div>

      {/* Two Column Layout - Enhanced cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-luxury p-8">
          <h2 className="text-2xl font-semibold text-luxury-dark mb-6">Top Products</h2>
          <div className="space-y-4">
            {demoData.topProducts?.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-6 bg-luxury-pearl rounded-xl hover:shadow-luxury transition-all duration-300">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${product.revenue}</p>
                  <p className="text-sm text-green-600">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl shadow-luxury p-8">
          <h2 className="text-2xl font-semibold text-luxury-dark mb-6">Low Stock Alerts</h2>
          <div className="space-y-4">
            {demoData.inventoryMetrics.lowStockItems?.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-6 bg-red-50 rounded-xl hover:shadow-luxury transition-all duration-300">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-red-600">Only {item.stock} units left</p>
                  <p className="text-xs text-gray-500 mt-1">Supplier: {item.supplier}</p>
                </div>
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity - Enhanced feed */}
      <div className="bg-white rounded-2xl shadow-luxury p-8">
        <h2 className="text-2xl font-semibold text-luxury-dark mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {demoData.recentActivity?.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-6 bg-luxury-pearl rounded-xl hover:shadow-luxury transition-all duration-300">
              <div className={`p-2 rounded-full ${
                activity.type === 'order' ? 'bg-blue-100' :
                activity.type === 'stock' ? 'bg-red-100' :
                activity.type === 'customer' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                <svg className="w-4 h-4" /> {/* Add appropriate icon based on type */}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard; 