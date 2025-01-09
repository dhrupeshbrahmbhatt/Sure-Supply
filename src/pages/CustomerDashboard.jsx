import { useState } from 'react';

const CustomerDashboard = () => {
  const demoData = {
    // Rewards & Points
    rewardsMetrics: {
      totalPoints: 2850,
      pointsThisMonth: 450,
      sustainabilityScore: 78,
      badges: ["Smart Shopper", "Eco Warrior", "Regular Saver"]
    },
    
    // Shopping Impact
    impactMetrics: {
      moneySaved: 156.00,
      wastePreventedKg: 23,
      carbonFootprintReduced: 45,
      communityImpact: "Silver Level"
    },
    
    // Available Deals
    nearbyDeals: [
      { store: "FreshMart", distance: "0.8km", deals: 12 },
      { store: "GreenGrocer", distance: "1.2km", deals: 8 }
    ],
    
    // Shopping History
    shoppingHistory: {
      totalPurchases: 24,
      discountedItems: 18,
      averageSavings: 25,
      favoriteStores: ["FreshMart", "OrganicLife"]
    },
    
    // Personalized Recommendations
    recommendations: [
      { item: "Organic Apples", store: "FreshMart", discount: "30%", expiresIn: "2 days" },
      { item: "Whole Grain Bread", store: "BakeHouse", discount: "25%", expiresIn: "1 day" }
    ],
    
    // Community Engagement
    community: {
      rank: 123,
      leaderboardPosition: "Silver Tier",
      challengesCompleted: 8,
      socialConnections: 15
    },
    
    // Add these new properties
    recentOrders: [
      {
        id: 1,
        product: "Organic Apples",
        date: "2024-03-15",
        price: 24.99,
        status: "Delivered"
      },
      {
        id: 2,
        product: "Fresh Bread",
        date: "2024-03-14",
        price: 12.99,
        status: "Processing"
      },
      {
        id: 3,
        product: "Mixed Vegetables",
        date: "2024-03-13",
        price: 18.99,
        status: "Pending"
      }
    ],
    
    wishlist: [
      {
        id: 1,
        name: "Organic Milk",
        price: 4.99,
        inStock: true
      },
      {
        id: 2,
        name: "Whole Grain Pasta",
        price: 3.99,
        inStock: true
      },
      {
        id: 3,
        name: "Fresh Berries",
        price: 6.99,
        inStock: false
      }
    ],
    
    // Also add these if they're being used
    totalOrders: 45,
    totalSpent: 1250,
    pendingOrders: 3,
    savedItems: 12
  };

  return (
    <div className="p-6 bg-luxury-pearl min-h-screen">
      {/* Header with gradient */}
      <div className="mb-8 bg-luxury-gradient from-luxury-light to-luxury-pearl p-8 rounded-2xl shadow-luxury">
        <h1 className="text-4xl font-bold text-luxury-dark">Welcome back, John!</h1>
        <p className="text-gray-600 mt-2 text-lg">Here's what's happening with your orders</p>
      </div>

      {/* Stats Grid - Enhanced styling */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-luxury-dark mt-2">{demoData.totalOrders}</p>
            </div>
            <div className="p-4 bg-luxury-light rounded-xl">
              <svg className="w-8 h-8 text-luxury-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-luxury-primary">+12% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-luxury-dark mt-2">${demoData.totalSpent}</p>
            </div>
            <div className="p-4 bg-luxury-light rounded-xl">
              <svg className="w-8 h-8 text-luxury-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-luxury-primary">+8.5% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-3xl font-bold text-luxury-dark mt-2">{demoData.pendingOrders}</p>
            </div>
            <div className="p-4 bg-luxury-light rounded-xl">
              <svg className="w-8 h-8 text-luxury-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saved Items</p>
              <p className="text-3xl font-bold text-luxury-dark mt-2">{demoData.savedItems}</p>
            </div>
            <div className="p-4 bg-luxury-light rounded-xl">
              <svg className="w-8 h-8 text-luxury-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Order Analytics */}
      <div className="bg-white rounded-2xl shadow-luxury p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-luxury-dark">Order Analytics</h2>
        <div className="h-64">
          {/* Add your chart component here */}
        </div>
      </div>

      {/* Recent Orders - Enhanced table */}
      <div className="bg-white rounded-2xl shadow-luxury p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-luxury-dark">Recent Orders</h2>
          <button className="px-6 py-2 bg-luxury-light text-luxury-primary rounded-xl hover:bg-luxury-primary hover:text-white transition-all duration-300">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxury-pearl">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-dark uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-dark uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-dark uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-dark uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-luxury-dark uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-light">
              {demoData.recentOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-luxury-pearl/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark font-medium">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-primary">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-luxury-dark">
                    ${order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Wishlist Section - Enhanced cards */}
      <div className="bg-white rounded-2xl shadow-luxury p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-luxury-dark">Wishlist</h2>
          <button className="px-6 py-2 bg-luxury-light text-luxury-primary rounded-xl hover:bg-luxury-primary hover:text-white transition-all duration-300">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoData.wishlist?.map((item) => (
            <div key={item.id} className="border border-luxury-light rounded-xl p-6 hover:shadow-luxury transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-luxury-dark text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-lg mt-1">${item.price}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  item.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <button className="mt-6 w-full bg-luxury-primary text-white py-3 rounded-xl hover:bg-luxury-dark transition-all duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;