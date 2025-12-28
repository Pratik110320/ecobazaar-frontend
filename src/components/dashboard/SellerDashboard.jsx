// src/components/dashboard/SellerDashboard.jsx - Updated with Tailwind CSS
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const SellerDashboard = ({ data }) => {
  if (!data) return (
    <div className="flex items-center justify-center min-h-96">
      <LoadingSpinner text="Loading seller dashboard..." />
    </div>
  );

  const { stats, topProducts, recentOrders, salesByCategory, revenueBreakdown } = data;

  // Prepare chart data
  const topProductsData = (topProducts || []).map(product => ({
    name: product.productName.length > 15 ? product.productName.substring(0, 15) + '...' : product.productName,
    revenue: product.revenue,
    sales: product.unitsSold,
    carbon: product.carbonFootprint
  }));

  const salesCategoryData = Object.entries(salesByCategory || {}).map(([category, revenue]) => ({
    category: category.length > 12 ? category.substring(0, 12) + '...' : category,
    revenue: Math.round(revenue * 100) / 100
  }));

  const revenueData = [
    { period: 'Today', revenue: revenueBreakdown?.todayRevenue || 0 },
    { period: 'This Week', revenue: revenueBreakdown?.weekRevenue || 0 },
    { period: 'This Month', revenue: revenueBreakdown?.monthRevenue || 0 },
    { period: 'Total', revenue: revenueBreakdown?.totalRevenue || 0 }
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      subtitle: `${stats?.activeProducts || 0} Active`,
      icon: '📦',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue || 0}`,
      subtitle: 'Lifetime Earnings',
      icon: '💰',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Total Sales',
      value: stats?.totalSales || 0,
      subtitle: 'Units Sold',
      icon: '📊',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Avg Carbon',
      value: `${stats?.averageCarbonPerProduct || 0}kg`,
      subtitle: 'Per Product',
      icon: '🌱',
      color: 'text-eco-600',
      bg: 'bg-eco-50'
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🛍️ Seller Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your products and track business performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className={`p-6 ${stat.bg}`}>
              <div className="flex items-center space-x-4">
                <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {stat.title}
                  </h3>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <span className="text-xs text-gray-500">{stat.subtitle}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Revenue Breakdown */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Sales by Category */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                  label={({ category, revenue }) => `${category}: $${revenue}`}
                >
                  {salesCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Products */}
          <Card className="lg:col-span-2 xl:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value, name) => {
                  if (name === 'revenue') return [`$${value}`, 'Revenue'];
                  if (name === 'sales') return [value, 'Units Sold'];
                  return [`${value}kg`, 'Carbon'];
                }} />
                <Legend />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenue" radius={[0, 4, 4, 0]} />
                <Bar dataKey="sales" fill="#00C49F" name="Units Sold" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

         // Continuing SellerDashboard from previous...
          {/* Recent Orders */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📦</span> Recent Orders
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {(recentOrders || []).slice(0, 8).map(order => (
                <div key={order.orderId} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">#{order.orderId}</span>
                    <span className="font-bold text-green-600">${order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{order.itemCount} items</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📈</span> Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Verified Products', value: stats?.verifiedProducts || 0, color: 'green' },
                { label: 'Pending Verification', value: stats?.pendingProducts || 0, color: 'yellow' },
                { label: 'Active Products', value: stats?.activeProducts || 0, color: 'blue' },
                { label: 'Total Sales', value: stats?.totalSales || 0, color: 'purple' }
              ].map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'yellow' ? 'text-yellow-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    'text-purple-600'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Business Insights */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">💡</span> Business Insights
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900">Average Order Value</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${stats?.totalSales > 0 ? (stats.totalRevenue / stats.totalSales).toFixed(2) : 0}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-900">Carbon Efficiency Score</div>
                <div className="text-2xl font-bold text-green-600">
                  {stats?.totalRevenue > 0 ? (stats.totalRevenue / (stats.averageCarbonPerProduct || 1)).toFixed(0) : 0}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-900">Verification Rate</div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats?.totalProducts > 0 ? ((stats.verifiedProducts / stats.totalProducts) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
