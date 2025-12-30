// src/components/dashboard/AdminDashboard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ---------- React‑Icons ----------- */
import {
  FiDollarSign,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiClock,
  FiBarChart2,
  FiActivity,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiShoppingBag,
  FiGlobe,
  FiRefreshCw,
  FiChevronUp,
  FiChevronDown,
  FiTarget,
  FiTrendingDown,
  FiShield,
} from "react-icons/fi";
import { motion } from "framer-motion";

/* ---------- Color Palette ----------- */
const GREEN_THEME = {
  primary: "#10B981", // Emerald-500
  primaryLight: "#D1FAE5", // Emerald-100
  primaryDark: "#059669", // Emerald-600
  secondary: "#3B82F6", // Blue-500
  accent: "#8B5CF6", // Purple-500
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  neutral: "#6B7280",
  background: "#F9FAFB",
  cardBg: "#FFFFFF"
};

/* ---------- Re‑usable UI helpers ----------- */

/**
 * Modern card wrapper with subtle green accent
 */
const Card = ({ title, children, className = "", variant = "default" }) => {
  const variants = {
    default: "border-l-4 border-l-emerald-500",
    success: "border-l-4 border-l-green-500",
    warning: "border-l-4 border-l-amber-500",
    info: "border-l-4 border-l-blue-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            {title}
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </motion.div>
  );
};

/**
 * Modern stat tile with gradient background
 */
const StatTile = ({ icon, label, value, sub, trend, color = "emerald" }) => {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-500",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-violet-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 text-white`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            {icon}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center text-sm font-medium ${trend > 0 ? 'text-white' : 'text-rose-100'}`}>
              {trend > 0 ? (
                <FiChevronUp className="mr-1" />
              ) : (
                <FiChevronDown className="mr-1" />
              )}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <p className="text-sm font-medium opacity-90 mb-1">{label}</p>
        <p className="text-3xl font-bold mb-2">{value}</p>
        {sub && <p className="text-sm opacity-80">{sub}</p>}
      </div>
    </motion.div>
  );
};

/**
 * Metric indicator component
 */
const MetricIndicator = ({ label, current, previous, icon, unit = "" }) => {
  const change = previous ? ((current - previous) / previous * 100).toFixed(1) : 0;
  const isPositive = change >= 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mr-3">
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-700">{unit}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900">{current}{unit}</p>
        <p className={`text-sm font-medium flex items-center ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <FiChevronUp className="mr-1" /> : <FiChevronDown className="mr-1" />}
          {Math.abs(change)}%
        </p>
      </div>
    </div>
  );
};

/* ---------- Main Dashboard Component ----------- */
const AdminDashboard = ({ data, onRefresh }) => {
  /* ---------- Loading state ---------- */
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[24rem]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  /* ---------- Destructure payload ---------- */
  const {
    platformStats,
    pendingVerifications,
    topSellers,
    recentActivities,
    carbonImpact,
    userRoleDistribution,
  } = data;

  /* ---------- Chart data preparations ---------- */
  const topSellersData = (topSellers ?? []).map((s) => ({
    name:
      s.sellerName.length > 12
        ? `${s.sellerName.substring(0, 12)}...`
        : s.sellerName,
    revenue: s.revenue,
    productsSold: s.productsSold,
    carbonImpact: s.averageCarbonImpact,
  }));

  const roleDistributionData = Object.entries(userRoleDistribution ?? {}).map(
    ([role, count]) => ({
      name: role,
      value: count,
    })
  );

  const carbonByCategoryData = Object.entries(
    carbonImpact?.carbonByCategory ?? {}
  ).map(([category, carbon]) => ({
    category:
      category.length > 10 ? `${category.substring(0, 10)}...` : category,
    value: Math.round((carbon ?? 0) * 100) / 100,
  }));

  const platformMetrics = [
    {
      metric: "Active Users",
      value: platformStats?.activeUsers ?? 0,
      icon: <FiUsers className="text-lg" />,
      unit: "",
      previous: platformStats?.previousUsers ?? 0,
    },
    {
      metric: "Platform Revenue",
      value: platformStats?.totalRevenue ?? 0,
      icon: <FiDollarSign className="text-lg" />,
      unit: "$",
      previous: platformStats?.previousRevenue ?? 0,
    },
    {
      metric: "Carbon Saved",
      value: platformStats?.platformCarbonSaved ?? 0,
      icon: <FiGlobe className="text-lg" />,
      unit: "kg",
      previous: platformStats?.previousCarbonSaved ?? 0,
    },
    {
      metric: "Active Products",
      value: platformStats?.totalProducts ?? 0,
      icon: <FiPackage className="text-lg" />,
      unit: "",
      previous: platformStats?.previousProducts ?? 0,
    },
  ];

  const quickActions = [
    { 
      label: "Review Products", 
      count: pendingVerifications?.length ?? 0,
      icon: <FiPackage className="text-xl" />,
      color: "bg-amber-500",
      href: "#verifications"
    },
    {
      label: "User Management",
      count: platformStats?.totalUsers ?? 0,
      icon: <FiUsers className="text-xl" />,
      color: "bg-blue-500",
      href: "#users"
    },
    {
      label: "Carbon Reports",
      count: carbonImpact?.totalReports ?? 0,
      icon: <FiTarget className="text-xl" />,
      color: "bg-emerald-500",
      href: "#reports"
    },
    {
      label: "Security",
      icon: <FiShield className="text-xl" />,
      color: "bg-purple-500",
      href: "#security"
    },
  ];

  const CHART_COLORS = [
    "#10B981", // Emerald
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#8B5CF6", // Violet
  ];

  const CARBON_COLORS = [
    "#10B981", // Low carbon
    "#34D399", // Medium-low
    "#FBBF24", // Medium
    "#F59E0B", // Medium-high
    "#EF4444", // High
  ];

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with actions */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-700 mt-1">Welcome back, Administrator</p>
          </div>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-emerald-200 transition-all font-medium shadow-sm"
          >
            <FiRefreshCw className="mr-2" />
            Refresh Data
          </motion.button> */}
        </motion.header>

        {/* Top‑level stats with gradient */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <StatTile
            icon={<FiDollarSign className="text-2xl" />}
            label="Total Revenue"
            value={`$${platformStats?.totalRevenue?.toLocaleString() ?? 0}`}
            sub="This month"
            trend={platformStats?.revenueTrend}
            color="emerald"
          />
          <StatTile
            icon={<FiUsers className="text-2xl" />}
            label="Active Users"
            value={platformStats?.activeUsers?.toLocaleString() ?? 0}
            sub="Engaged community"
            trend={platformStats?.usersTrend}
            color="blue"
          />
          <StatTile
            icon={<FiGlobe className="text-2xl" />}
            label="Carbon Saved"
            value={`${platformStats?.platformCarbonSaved?.toLocaleString() ?? 0}kg`}
            sub="Environmental impact"
            trend={platformStats?.carbonSavedTrend}
            color="purple"
          />
          <StatTile
            icon={<FiShoppingBag className="text-2xl" />}
            label="Total Orders"
            value={platformStats?.totalOrders?.toLocaleString() ?? 0}
            sub="Platform activity"
            trend={platformStats?.ordersTrend}
            color="amber"
          />
        </motion.section>

        {/* Quick Actions
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {quickActions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 ${action.color} rounded-xl text-white`}>
                  {action.icon}
                </div>
                {action.count !== undefined && (
                  <span className="bg-gray-100 text-gray-700 text-sm font-bold px-2.5 py-1 rounded-full">
                    {action.count}
                  </span>
                )}
              </div>
              <p className="font-semibold text-gray-900 mt-4">{action.label}</p>
              <p className="text-sm text-gray-600 mt-1">View details →</p>
            </motion.a>
          ))}
        </motion.section> */}

        {/* Main dashboard grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Top Sellers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="xl:col-span-2"
          >
            <Card
              title={
                <span className="flex items-center text-lg font-semibold">
                  <FiTrendingUp className="mr-3 text-emerald-500" />
                  Top Sellers Performance
                </span>
              }
              variant="success"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSellersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11 }} 
                      stroke="#6b7280" 
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }} 
                      stroke="#6b7280" 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        padding: "12px",
                      }}
                      formatter={(value, name) => {
                        if (name === "revenue") return [`$${value.toLocaleString()}`, "Revenue"];
                        if (name === "productsSold") return [value.toLocaleString(), "Products Sold"];
                        return [`${value}kg`, "Carbon Impact"];
                      }}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="#10B981" 
                      radius={[6, 6, 0, 0]} 
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Role Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card
              title={
                <span className="flex items-center text-lg font-semibold">
                  <FiUsers className="mr-3 text-blue-500" />
                  User Distribution
                </span>
              }
              variant="info"
            >
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={30}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {roleDistributionData.map((_entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        padding: "12px",
                      }}
                      formatter={(value) => [value, "Users"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Platform Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card
              title={
                <span className="flex items-center text-lg font-semibold">
                  <FiBarChart2 className="mr-3 text-purple-500" />
                  Key Metrics
                </span>
              }
              variant="default"
            >
              <div className="space-y-3">
                {platformMetrics.map((metric, i) => (
                  <MetricIndicator
                    key={i}
                    label={metric.metric}
                    current={metric.value}
                    previous={metric.previous}
                    icon={metric.icon}
                    unit={metric.unit}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Pending Verifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-lg font-semibold">
                    <FiClock className="mr-3 text-amber-500" />
                    Pending Verifications
                    <span className="ml-3 bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-full">
                      {pendingVerifications?.length ?? 0}
                    </span>
                  </span>
                  <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    View all →
                  </button>
                </div>
              }
              variant="warning"
            >
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {(pendingVerifications ?? []).length > 0 ? (
                  (pendingVerifications ?? []).slice(0, 4).map((p) => (
                    <motion.div
                      key={p.productId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {p.productName}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          Seller: {p.sellerName} • {p.carbonFootprint}kg CO₂
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium text-sm"
                        >
                          Approve
                        </motion.button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-sm">
                          Review
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-600">
                    <FiCheckCircle className="mx-auto text-3xl mb-3 text-emerald-400" />
                    <p className="font-medium">All clear!</p>
                    <p className="text-sm">No pending verifications</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="xl:col-span-2"
          >
            <Card
              title={
                <span className="flex items-center text-lg font-semibold">
                  <FiActivity className="mr-3 text-emerald-500" />
                  Recent Activities
                </span>
              }
              variant="default"
            >
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {(recentActivities ?? []).length > 0 ? (
                  (recentActivities ?? []).slice(0, 5).map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm text-gray-900">{a.action}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-600">
                            {a.actorName}
                          </span>
                          <span className="text-xs text-gray-600">
                            {new Date(a.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-500 group-hover:text-gray-700 transition-colors" />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-600">
                    <FiActivity className="mx-auto text-3xl mb-3 text-gray-500" />
                    <p className="font-medium">No recent activities</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Carbon Impact Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                <FiTarget className="text-2xl text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Carbon Footprint</p>
                <p className="text-2xl font-bold text-gray-900">
                  {carbonImpact?.totalCarbonFootprint?.toLocaleString() ?? 0}kg
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Monthly target</span>
                <span className="font-medium text-emerald-600">-12%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <FiCheckCircle className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Carbon Saved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {carbonImpact?.totalCarbonSaved?.toLocaleString() ?? 0}kg
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Vs last month</span>
                <span className="font-medium text-emerald-600">+18%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <FiTrendingUp className="text-2xl text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700 mb-1">Avg per Order</p>
                <p className="text-2xl font-bold text-gray-900">
                  {carbonImpact?.averageCarbonPerOrder ?? 0}kg
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Improvement</span>
                <span className="font-medium text-emerald-600">+8.2%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminDashboard;
