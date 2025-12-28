// src/components/dashboard/UserDashboard.jsx - Updated with Tailwind CSS
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const UserDashboard = ({ data }) => {
  if (!data) return (
    <div className="flex items-center justify-center min-h-96">
      <LoadingSpinner text="Loading your dashboard..." />
    </div>
  );

  const { stats, recentOrders, achievements, personalizedTips, carbonTrend, categoryBreakdown, ecoRatingDistribution } = data;

  // Prepare chart data
  const carbonTrendData = carbonTrend?.labels?.map((label, index) => ({
    month: label,
    carbon: carbonTrend.carbonData?.[index] || 0,
    orders: carbonTrend.orderCounts?.[index] || 0
  })) || [];

  const categoryData = Object.entries(categoryBreakdown || {}).map(([name, value]) => ({
    name: name.length > 12 ? name.substring(0, 12) + '...' : name,
    value: Math.round(value * 100) / 100
  }));

  const ecoRatingData = Object.entries(ecoRatingDistribution || {}).map(([rating, count]) => ({
    rating,
    count
  }));

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'];
  const ECO_RATING_COLORS = {
    'A+': '#10b981',
    'A': '#22c55e', 
    'B': '#eab308',
    'C': '#f97316',
    'D': '#ef4444'
  };

  const statCards = [
    {
      title: 'Eco Score',
      value: stats?.ecoScore || 0,
      subtitle: stats?.badge || 'Beginner',
      icon: '🏆',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      title: 'Carbon Saved',
      value: `${stats?.carbonSaved || 0}kg`,
      subtitle: 'Total Reduction',
      icon: '🌍',
      color: 'text-eco-600',
      bg: 'bg-eco-50'
    },
    {
      title: 'Green Purchases',
      value: stats?.greenPurchases || 0,
      subtitle: 'Eco-Friendly Items',
      icon: '💚',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Total Spent',
      value: `$${stats?.totalSpent || 0}`,
      subtitle: 'On Sustainable Products',
      icon: '💰',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🌱 My Eco Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your sustainability journey and environmental impact
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
          {/* Carbon Trend Chart */}
          <Card className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon Footprint Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={carbonTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'carbon') return [`${value} kg`, 'Carbon'];
                    if (name === 'orders') return [value, 'Orders'];
                    return [value, name];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="#FF6B6B" 
                  fill="#FF6B6B" 
                  fillOpacity={0.3} 
                  name="Carbon Footprint" 
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#4ECDC4" 
                  strokeWidth={2} 
                  name="Orders" 
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🏆</span> Your Achievements
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {(achievements || []).slice(0, 6).map(achievement => (
                <div key={achievement.id} className={`p-4 rounded-lg border-l-4 ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-gray-50 border-gray-300'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(100, (achievement.currentValue / achievement.requiredValue) * 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Progress</span>
                          <span>{achievement.currentValue}/{achievement.requiredValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Carbon by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}kg`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} kg`, 'Carbon']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Eco Rating Distribution */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eco Rating Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ecoRatingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {ecoRatingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ECO_RATING_COLORS[entry.rating]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Personalized Tips */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">💡</span> Personalized Tips
            </h3>
            <div className="space-y-3">
              {(personalizedTips || []).slice(0, 4).map((tip, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  tip.priority === 'HIGH' ? 'border-red-500 bg-red-50' :
                  tip.priority === 'MEDIUM' ? 'border-yellow-500 bg-yellow-50' :
                  'border-green-500 bg-green-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">{tip.icon}</span>
                    <p className="text-sm text-gray-700">{tip.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Orders */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📦</span> Recent Orders
            </h3>
            <div className="space-y-3">
              {(recentOrders || []).slice(0, 5).map(order => (
                <div key={order.orderId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Order #{order.orderId}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${order.totalAmount}</div>
                    <div className="text-sm text-gray-500">{order.totalCarbon}kg CO₂</div>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">{stats?.totalItemsPurchased || 0}</div>
            <div className="text-sm text-gray-500">Items Purchased</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats?.totalOrders > 0 ? (stats.totalSpent / stats.totalOrders).toFixed(2) : 0}
            </div>
            <div className="text-sm text-gray-500">Avg Order Value</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">
              {stats?.totalItemsPurchased > 0 ? ((stats.greenPurchases / stats.totalItemsPurchased) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-500">Green Purchase Rate</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
