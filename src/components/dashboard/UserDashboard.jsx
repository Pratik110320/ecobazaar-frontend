// src/components/dashboard/UserDashboard.jsx - Redesigned
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const UserDashboard = ({ data }) => {
  if (!data) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="spinner !w-16 !h-16 mb-4"></div>
        <p className="text-gray-600">Loading your eco dashboard...</p>
      </div>
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
    name: name.length > 15 ? name.substring(0, 15) + '...' : name,
    value: Math.round(value * 100) / 100
  }));

  const ecoRatingData = Object.entries(ecoRatingDistribution || {}).map(([rating, count]) => ({
    rating,
    count
  }));

  const COLORS = ['#22c55e', '#34b058', '#47d06f', '#6de593', '#86efad', '#9ff3ba', '#b8f7c9'];
  const ECO_RATING_COLORS = {
    'A+': '#10b981',
    'A': '#22c55e', 
    'B': '#eab308',
    'C': '#f97316',
    'D': '#ef4444'
  };

  return (
    <div className="page-wrapper">
      <div className="container-modern">
        {/* Hero Section */}
        <div className="section-header mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-100 text-eco-700 font-semibold text-sm mb-4 animate-fade-in">
            <span className="text-lg">🏆</span>
            <span>{stats?.badge || 'Eco Beginner'}</span>
          </div>
          
          <h1 className="section-title">
            Your Eco Journey
          </h1>
          
          <p className="section-subtitle">
            Track your sustainability impact and environmental achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: '🏆',
              title: 'Eco Score',
              value: stats?.ecoScore || 0,
              subtitle: stats?.badge || 'Beginner',
              gradient: 'from-yellow-400 to-orange-500',
              bgGradient: 'from-yellow-50 to-orange-50'
            },
            {
              icon: '🌍',
              title: 'Carbon Saved',
              value: `${stats?.carbonSaved || 0}kg`,
              subtitle: 'Total Reduction',
              gradient: 'from-eco-500 to-leaf-500',
              bgGradient: 'from-eco-50 to-leaf-50'
            },
            {
              icon: '💚',
              title: 'Green Purchases',
              value: stats?.greenPurchases || 0,
              subtitle: 'Eco-Friendly Items',
              gradient: 'from-green-500 to-emerald-500',
              bgGradient: 'from-green-50 to-emerald-50'
            },
            {
              icon: '💰',
              title: 'Total Invested',
              value: `$${stats?.totalSpent || 0}`,
              subtitle: 'In Sustainability',
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-50 to-cyan-50'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-card-modern group animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-medium`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  {stat.title}
                </h3>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <span className="text-xs text-gray-500">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Carbon Trend Chart */}
          <div className="lg:col-span-2 card-modern p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Carbon Footprint Trend</h3>
                <p className="text-sm text-gray-600">Your monthly environmental impact</p>
              </div>
              <div className="badge-eco">
                <span>📉</span>
                <span>Tracking</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={carbonTrendData}>
                <defs>
                  <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => {
                    if (name === 'carbon') return [`${value} kg`, 'Carbon Footprint'];
                    if (name === 'orders') return [value, 'Orders'];
                    return [value, name];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="carbon" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  fill="url(#carbonGradient)"
                  name="Carbon Footprint" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Achievements */}
          <div className="card-modern p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
                <p className="text-sm text-gray-600">Your eco milestones</p>
              </div>
              <div className="badge-eco">
                <span>🏆</span>
              </div>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-eco">
              {(achievements || []).slice(0, 6).map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-eco-50 to-leaf-50 border-eco-200 shadow-soft' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`text-2xl ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-eco-500 to-leaf-500' 
                            : 'bg-gradient-to-r from-primary-400 to-eco-400'
                        }`}
                        style={{ width: `${Math.min(100, (achievement.currentValue / achievement.requiredValue) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-600">Progress</span>
                      <span className={achievement.unlocked ? 'text-eco-600' : 'text-gray-600'}>
                        {achievement.currentValue}/{achievement.requiredValue}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Breakdown */}
          <div className="card-modern p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Carbon by Category</h3>
                <p className="text-sm text-gray-600">Impact distribution</p>
              </div>
            </div>
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
                  labelStyle={{ fontSize: '11px', fontWeight: '600' }}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} kg`, 'Carbon']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Eco Rating Distribution */}
          <div className="card-modern p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Eco Ratings</h3>
                <p className="text-sm text-gray-600">Product distribution</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ecoRatingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="rating" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {ecoRatingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ECO_RATING_COLORS[entry.rating]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Personalized Tips */}
          <div className="card-modern p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Eco Tips</h3>
                <p className="text-sm text-gray-600">Personalized advice</p>
              </div>
              <div className="badge-eco">
                <span>💡</span>
              </div>
            </div>
            <div className="space-y-3">
              {(personalizedTips || []).slice(0, 4).map((tip, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border-l-4 ${
                    tip.priority === 'HIGH' ? 'border-red-500 bg-red-50' :
                    tip.priority === 'MEDIUM' ? 'border-yellow-500 bg-yellow-50' :
                    'border-eco-500 bg-eco-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{tip.icon}</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card-modern p-6 animate-slide-up" style={{ animationDelay: '350ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-600">Your latest purchases</p>
            </div>
            <a href="/orders" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              View All →
            </a>
          </div>
          <div className="space-y-3">
            {(recentOrders || []).slice(0, 5).map(order => (
              <div key={order.orderId} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-primary-50/30 hover:from-primary-50 hover:to-eco-50 transition-all border border-gray-100 group">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">Order #{order.orderId}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-eco-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {order.totalCarbon}kg CO₂
                    </span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <div className="text-lg font-bold text-gradient-eco">${order.totalAmount}</div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'DELIVERED' ? 'bg-eco-100 text-eco-800 border border-eco-200' :
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: stats?.totalOrders || 0 },
            { label: 'Items Purchased', value: stats?.totalItemsPurchased || 0 },
            { label: 'Avg Order Value', value: `$${stats?.totalOrders > 0 ? (stats.totalSpent / stats.totalOrders).toFixed(2) : 0}` },
            { label: 'Green Rate', value: `${stats?.totalItemsPurchased > 0 ? ((stats.greenPurchases / stats.totalItemsPurchased) * 100).toFixed(1) : 0}%` },
          ].map((stat, index) => (
            <div
              key={index}
              className="card-modern p-4 text-center animate-scale-in"
              style={{ animationDelay: `${400 + index * 50}ms` }}
            >
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;