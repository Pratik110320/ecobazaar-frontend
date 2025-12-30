// src/components/dashboard/SellerDashboard.jsx
import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area,
  LineChart, Line
} from 'recharts';
import { 
  FiPackage, FiDollarSign, FiShoppingBag, FiTrendingUp,
  FiCheckCircle, FiClock, FiTruck, FiBarChart2, 
  FiPieChart, FiAward, FiActivity, FiGrid, FiTarget
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const SellerDashboard = ({ data }) => {
  if (!data) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-emerald-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-700 font-medium">Loading seller dashboard...</p>
      </div>
    </div>
  );

  const { stats, topProducts, recentOrders, salesByCategory, revenueBreakdown } = data;

  // Prepare chart data
  const topProductsData = (topProducts || []).map(product => ({
    name: product.productName.length > 15 ? product.productName.substring(0, 12) + '...' : product.productName,
    revenue: product.revenue,
    sales: product.unitsSold,
    carbon: product.carbonFootprint
  }));

  const salesCategoryData = Object.entries(salesByCategory || {}).map(([category, revenue]) => ({
    name: category.length > 10 ? category.substring(0, 8) + '...' : category,
    value: Math.round(revenue * 100) / 100
  }));

  const revenueData = [
    { period: 'Today', revenue: revenueBreakdown?.todayRevenue || 0 },
    { period: 'Week', revenue: revenueBreakdown?.weekRevenue || 0 },
    { period: 'Month', revenue: revenueBreakdown?.monthRevenue || 0 },
    { period: 'Total', revenue: revenueBreakdown?.totalRevenue || 0 }
  ];

  const performanceData = [
    { month: 'Jan', sales: 4000, revenue: 2400 },
    { month: 'Feb', sales: 3000, revenue: 1398 },
    { month: 'Mar', sales: 9800, revenue: 2000 },
    { month: 'Apr', sales: 3908, revenue: 2780 },
    { month: 'May', sales: 4800, revenue: 1890 },
    { month: 'Jun', sales: 3800, revenue: 2390 },
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      subtitle: `${stats?.activeProducts || 0} Active`,
      icon: <FiPackage />,
      color: 'text-blue-600',
      bg: 'from-blue-50 to-blue-50/50',
      trend: stats?.productsTrend || 12.5
    },
    {
      title: 'Total Revenue',
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      subtitle: 'Lifetime Earnings',
      icon: <FiDollarSign />,
      color: 'text-emerald-600',
      bg: 'from-emerald-50 to-emerald-50/50',
      trend: stats?.revenueTrend || 8.2
    },
    {
      title: 'Total Sales',
      value: stats?.totalSales || 0,
      subtitle: 'Units Sold',
      icon: <FiShoppingBag />,
      color: 'text-purple-600',
      bg: 'from-purple-50 to-purple-50/50',
      trend: stats?.salesTrend || 15.3
    },
    {
      title: 'Avg Carbon',
      value: `${stats?.averageCarbonPerProduct || 0}kg`,
      subtitle: 'Per Product',
      icon: <FiActivity />,
      color: 'text-green-600',
      bg: 'from-green-50 to-green-50/50',
      trend: stats?.carbonTrend || -5.7
    }
  ];

  const performanceMetrics = [
    { 
      label: 'Verified Products', 
      value: stats?.verifiedProducts || 0, 
      icon: <FiCheckCircle />,
      color: 'emerald',
      percentage: '85%'
    },
    { 
      label: 'Pending Verification', 
      value: stats?.pendingProducts || 0, 
      icon: <FiClock />,
      color: 'amber',
      percentage: '15%'
    },
    { 
      label: 'Active Products', 
      value: stats?.activeProducts || 0, 
      icon: <FiPackage />,
      color: 'blue',
      percentage: '92%'
    },
    { 
      label: 'Conversion Rate', 
      value: '4.7%', 
      icon: <FiTarget />,
      color: 'purple',
      percentage: '+2.3%'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Performance Chart */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <FiTrendingUp className="mr-3 text-emerald-500" /> Performance Overview
              </h3>
              <p className="text-gray-600 mt-1">Monthly sales and revenue trends</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-sm text-gray-700">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-700">Sales</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3B82F6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <FiAward className="mr-3 text-amber-500" /> Top Products
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart 
                data={topProductsData.slice(0, 5)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="#9ca3af"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#9ca3af"
                  axisLine={false}
                  tickLine={false}
                  width={70}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'revenue') return [`$${value}`, 'Revenue'];
                    if (name === 'sales') return [value, 'Units Sold'];
                    return [`${value}kg`, 'Carbon'];
                  }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#10B981" 
                  name="Revenue" 
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <FiPieChart className="mr-3 text-purple-500" /> Sales by Category
            </h3>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={salesCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {salesCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                      padding: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 lg:mt-0 lg:ml-6 space-y-3">
                {salesCategoryData.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-800">{category.name}</span>
                    <span className="ml-auto text-sm font-semibold text-gray-900">
                      ${category.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-emerald-50/50 to-green-50/30 rounded-2xl border border-emerald-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <FiBarChart2 className="mr-3 text-emerald-500" /> Performance Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-4 border ${
                  metric.color === 'emerald' ? 'border-emerald-100' :
                  metric.color === 'amber' ? 'border-amber-100' :
                  metric.color === 'blue' ? 'border-blue-100' :
                  'border-purple-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    metric.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    metric.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    metric.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {metric.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    metric.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                    metric.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                    metric.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {metric.percentage}
                  </span>
                </div>
                <div className={`text-2xl font-bold mb-1 ${
                  metric.color === 'emerald' ? 'text-emerald-700' :
                  metric.color === 'amber' ? 'text-amber-700' :
                  metric.color === 'blue' ? 'text-blue-700' :
                  'text-purple-700'
                }`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-700">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <FiTruck className="mr-3 text-blue-500" /> Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders || []).slice(0, 5).map((order, index) => (
                  <motion.tr 
                    key={order.orderId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">#{order.orderId}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900 font-medium">{order.itemCount}</span>
                      <span className="text-gray-600 text-sm ml-1">items</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-emerald-700">${order.totalAmount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        order.status === 'DELIVERED' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : order.status === 'PENDING' 
                            ? 'bg-amber-100 text-amber-800' 
                            : order.status === 'PROCESSING'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {(!recentOrders || recentOrders.length === 0) && (
              <div className="text-center py-12">
                <FiTruck className="mx-auto text-3xl text-gray-400 mb-3" />
                <p className="text-gray-600">No recent orders found</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SellerDashboard;
