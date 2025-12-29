// src/components/dashboard/UserDashboard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
import { motion } from "framer-motion";

/* ---------- React Icons ---------- */
import {
  FiAward,
  FiShoppingBag,
  FiDollarSign,
  FiBarChart2,
  FiRefreshCw,
  FiClock,
  FiCheckCircle,
  FiChevronRight,
  FiTrendingUp,
  FiActivity,
  FiTarget,
  FiCheck,
  FiEye
} from "react-icons/fi";
import {
  FaLeaf,
  FaChartPie,
  FaRegLightbulb,
  FaRecycle,
  FaSeedling,
  FaBox,
  FaTree,
  FaWallet,
  FaShippingFast,
  FaCalendarAlt,
  FaPercentage,
  FaTrophy
} from "react-icons/fa";
import { TbTrees, TbPlant } from "react-icons/tb";

/* ---------- Custom Components ---------- */
const Card = ({ title, children, className = "", headerAction, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    {...props}
  >
    {title && (
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {headerAction && (
          <div className="text-sm text-gray-500">{headerAction}</div>
        )}
      </div>
    )}
    <div className="p-6">{children}</div>
  </motion.div>
);

const StatCard = ({ icon, title, value, subtitle, trend, badge, color = "emerald" }) => {
  const colors = {
    emerald: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-cyan-500",
    amber: "from-amber-500 to-orange-500",
    violet: "from-violet-500 to-purple-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} text-white text-xl`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-lg ${
            trend > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {trend > 0 ? <FiTrendingUp className="mr-1" /> : null}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          {badge && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
              {badge}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

/* ---------- Main Dashboard Component ---------- */
const UserDashboard = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your eco dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const {
    stats,
    recentOrders,
    achievements,
    personalizedTips,
    carbonTrend,
    categoryBreakdown,
    ecoRatingDistribution,
  } = data;

  const carbonTrendData = (carbonTrend?.labels || []).map((label, i) => ({
    month: label,
    carbon: carbonTrend?.carbonData?.[i] ?? 0,
    orders: carbonTrend?.orderCounts?.[i] ?? 0,
  })) ?? [];

  const categoryData = Object.entries(categoryBreakdown ?? []).map(
    ([name, value]) => ({
      name: name.length > 10 ? `${name.slice(0, 10)}...` : name,
      value: Math.round(value * 100) / 100,
    })
  );

  const ecoRatingData = Object.entries(ecoRatingDistribution ?? []).map(
    ([rating, count]) => ({
      rating,
      count,
    })
  );

  const pieColors = [
    "#10b981", "#34d399", "#059669", "#047857", "#065f46", "#064e3b"
  ];

  const ratingColors = {
    "A+": "#10b981",
    "A": "#34d399",
    "B": "#fbbf24",
    "C": "#f87171",
    "D": "#dc2626",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 to-emerald-50/30 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <FaLeaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Eco Dashboard</h1>
              </div>
              <p className="text-gray-600">
                Track your sustainability impact and make greener choices
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium"
            >
              <FaTrophy className="w-5 h-5" />
              <span>{stats?.badge || "Eco Pioneer"}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- Top Stats Grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<FiTarget />}
              title="Eco Score"
              value={stats?.ecoScore ?? 0}
              subtitle="Your sustainability rating"
              trend={stats?.ecoScoreTrend}
              badge="Top 10%"
              color="emerald"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<TbTrees />}
              title="Carbon Saved"
              value={`${stats?.carbonSaved ?? 0}kg`}
              subtitle="Equivalent to 5 trees"
              trend={stats?.carbonSavedTrend}
              color="blue"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<FaSeedling />}
              title="Green Purchases"
              value={stats?.greenPurchases ?? 0}
              subtitle="Eco-friendly items"
              trend={stats?.greenPurchasesTrend}
              color="amber"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<FaWallet />}
              title="Total Invested"
              value={`$${stats?.totalSpent ?? 0}`}
              subtitle="In sustainable products"
              trend={stats?.totalSpentTrend}
              color="violet"
            />
          </motion.div>
        </motion.div>

        {/* ---------- Main Content Grid ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Carbon Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card 
              title="Carbon Footprint Trend" 
              headerAction={
                <div className="flex items-center text-emerald-600 text-sm">
                  <FiTrendingUp className="mr-1" />
                  <span>Last 6 months</span>
                </div>
              }
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={carbonTrendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      tick={{ fill: '#64748b' }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      tick={{ fill: '#64748b' }}
                      label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      }}
                      formatter={(value) => [`${value} kg`, "Carbon Footprint"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="carbon"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#carbonGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card title="Recent Achievements">
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {(achievements ?? []).slice(0, 4).map((ach, index) => (
                  <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      ach.unlocked
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        ach.unlocked 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {ach.icon || <FiAward className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{ach.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{ach.description}</p>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{ach.currentValue}/{ach.requiredValue}</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                ach.unlocked ? 'bg-emerald-500' : 'bg-emerald-300'
                              }`}
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min(
                                  100,
                                  (ach.currentValue / Math.max(ach.requiredValue, 1)) * 100
                                )}%`
                              }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>

                        {ach.unlocked && (
                          <div className="flex items-center gap-1 text-emerald-600 text-sm mt-2">
                            <FiCheckCircle />
                            <span className="font-medium">Achieved</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* ---------- Analytics Grid ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card title="Category Breakdown">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={pieColors[index % pieColors.length]}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} kg`, "Carbon"]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-sm text-gray-600">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Eco Ratings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card title="Eco Ratings Distribution">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ecoRatingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="rating" 
                      stroke="#64748b"
                      tick={{ fill: '#64748b' }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      tick={{ fill: '#64748b' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      radius={[6, 6, 0, 0]}
                      barSize={40}
                    >
                      {ecoRatingData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={ratingColors[entry.rating] || "#94a3b8"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Personalized Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card 
              title="Personalized Eco Tips"
              headerAction={
                <div className="flex items-center text-emerald-600 text-sm">
                  <FaRegLightbulb />
                  <span className="ml-1">{personalizedTips?.length || 0} tips</span>
                </div>
              }
            >
              <div className="space-y-4">
                {(personalizedTips ?? []).slice(0, 3).map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      tip.priority === "HIGH"
                        ? "border-rose-500 bg-rose-50"
                        : tip.priority === "MEDIUM"
                        ? "border-amber-500 bg-amber-50"
                        : "border-emerald-500 bg-emerald-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg mt-0.5">
                        {tip.icon || <FaRegLightbulb className="text-gray-600" />}
                      </div>
                      <p className="text-sm text-gray-700">{tip.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* ---------- Recent Orders ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <Card 
            title="Recent Orders"
            headerAction={
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All <FiChevronRight className="ml-1" />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Carbon</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentOrders ?? []).slice(0, 5).map((order, index) => (
                    <motion.tr
                      key={order.orderId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">#{order.orderId}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendarAlt className="w-4 h-4" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-900">${order.totalAmount}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <TbPlant className="w-4 h-4 text-emerald-600" />
                          <span className="text-gray-600">{order.totalCarbon}kg</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : order.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* ---------- Quick Stats ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            {
              label: "Total Orders",
              value: stats?.totalOrders ?? 0,
              icon: <FiShoppingBag className="w-6 h-6 text-blue-600" />,
              change: "+12%"
            },
            {
              label: "Items Purchased",
              value: stats?.totalItemsPurchased ?? 0,
              icon: <FaBox className="w-6 h-6 text-amber-600" />,
              change: "+8%"
            },
            {
              label: "Avg Order Value",
              value: `$${stats?.totalOrders > 0
                ? (stats?.totalSpent / stats?.totalOrders).toFixed(2)
                : 0}`,
              icon: <FaWallet className="w-6 h-6 text-emerald-600" />,
              change: "+5%"
            },
            {
              label: "Green Purchase Rate",
              value: `${stats?.totalItemsPurchased > 0
                ? ((stats?.greenPurchases / stats?.totalItemsPurchased) * 100).toFixed(1)
                : 0}%`,
              icon: <FaPercentage className="w-6 h-6 text-teal-600" />,
              change: "+15%"
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {item.icon}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  {item.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{item.value}</div>
              <div className="text-sm text-gray-600 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;