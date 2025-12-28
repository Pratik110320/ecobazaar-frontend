// src/components/dashboard/AdminDashboardEnhanced.jsx
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard = ({ data }) => {
  if (!data) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  );

  const { platformStats, pendingVerifications, topSellers, recentActivities, carbonImpact, userRoleDistribution } = data;

  // Prepare chart data
  const topSellersData = (topSellers || []).map(seller => ({
    name: seller.sellerName.length > 12 ? seller.sellerName.substring(0, 12) + '...' : seller.sellerName,
    revenue: seller.revenue,
    productsSold: seller.productsSold,
    carbonImpact: seller.averageCarbonImpact
  }));

  const roleDistributionData = Object.entries(userRoleDistribution || {}).map(([role, count]) => ({
    role,
    count
  }));

  const carbonByCategoryData = Object.entries(carbonImpact?.carbonByCategory || {}).map(([category, carbon]) => ({
    category: category.length > 10 ? category.substring(0, 10) + '...' : category,
    carbon: Math.round(carbon * 100) / 100
  }));

  const platformMetrics = [
    { metric: 'Total Users', value: platformStats?.totalUsers || 0, icon: '👥', color: 'blue' },
    { metric: 'Active Products', value: platformStats?.totalProducts || 0, icon: '📦', color: 'green' },
    { metric: 'Total Orders', value: platformStats?.totalOrders || 0, icon: '🛒', color: 'purple' },
    { metric: 'Carbon Saved', value: `${platformStats?.platformCarbonSaved || 0}kg`, icon: '🌍', color: 'teal' }
  ];

  const quickStats = [
    { label: 'Active Sellers', value: platformStats?.totalSellers || 0 },
    { label: 'Pending Verifications', value: pendingVerifications?.length || 0 },
    { label: 'Platform Revenue', value: `$${platformStats?.totalRevenue || 0}` },
    { label: 'Carbon Footprint', value: `${platformStats?.platformCarbonFootprint || 0}kg` }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            👑 Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Platform overview and management control center
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">💰</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Platform Revenue</h3>
                <div className="text-2xl font-bold text-gray-900">${platformStats?.totalRevenue || 0}</div>
                <span className="text-xs text-gray-500">Total Earnings</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🌱</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Carbon Saved</h3>
                <div className="text-2xl font-bold text-gray-900">{platformStats?.platformCarbonSaved || 0}kg</div>
                <span className="text-xs text-gray-500">Environmental Impact</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">⏳</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending Verifications</h3>
                <div className="text-2xl font-bold text-gray-900">{pendingVerifications?.length || 0}</div>
                <span className="text-xs text-gray-500">Products Awaiting Review</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📊</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Users</h3>
                <div className="text-2xl font-bold text-gray-900">{platformStats?.activeUsers || 0}</div>
                <span className="text-xs text-gray-500">Engaged Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Top Sellers */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Sellers by Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSellersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => {
                  if (name === 'revenue') return [`$${value}`, 'Revenue'];
                  if (name === 'productsSold') return [value, 'Products Sold'];
                  return [`${value}kg`, 'Carbon Impact'];
                }} />
                <Bar dataKey="revenue" fill="#0088FE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Role Distribution */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ role, count }) => `${role}: ${count}`}
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Carbon Impact */}
          <div className="card lg:col-span-2 xl:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Impact by Category</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={carbonByCategoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="category" width={80} />
                <Tooltip formatter={(value) => [`${value}kg`, 'Carbon']} />
                <Bar dataKey="carbon" fill="#FF6B6B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Metrics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📈</span> Platform Metrics
            </h3>
            <div className="space-y-4">
              {platformMetrics.map((metric, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">{metric.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{metric.metric}</div>
                    <div className={`text-xl font-bold ${
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'green' ? 'text-green-600' :
                      metric.color === 'purple' ? 'text-purple-600' :
                      'text-teal-600'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⏳</span> Pending Verifications ({pendingVerifications?.length || 0})
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {(pendingVerifications || []).slice(0, 5).map(product => (
                <div key={product.productId} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{product.productName}</div>
                      <div className="text-sm text-gray-600">Seller: {product.sellerName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-600">{product.carbonFootprint}kg CO₂</div>
                      <button className="btn-primary text-xs mt-1">Review</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📝</span> Recent Activities
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {(recentActivities || []).slice(0, 6).map((activity, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">🔔</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-gray-900">{activity.actorName}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carbon Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">{carbonImpact?.totalCarbonFootprint || 0}kg</div>
            <div className="text-sm text-gray-600">Total Carbon Footprint</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{carbonImpact?.totalCarbonSaved || 0}kg</div>
            <div className="text-sm text-gray-600">Total Carbon Saved</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600">{carbonImpact?.averageCarbonPerOrder || 0}kg</div>
            <div className="text-sm text-gray-600">Average per Order</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
