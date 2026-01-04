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
import CountUp from "react-countup";

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
  FiEye,
  FiShield,
  FiGlobe,
  FiAlertTriangle,
  FiAlertCircle,
  FiInfo
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
  FaTrophy,
  FaMedal,
  FaCrown
} from "react-icons/fa";
import { TbTrees, TbPlant } from "react-icons/tb";

// Enhanced CSS for premium styling
const dashboardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  .dashboard-container {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    min-height: 100vh;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  
  .dashboard-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 20%);
    z-index: -1;
  }
  
  /* Hero Section Enhancements */
  .hero-section {
    background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
    border-radius: 24px;
    padding: 3rem;
    color: white;
    box-shadow: 
      0 25px 50px -12px rgba(20, 184, 166, 0.25),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    margin-bottom: 2.5rem;
    position: relative;
    overflow: hidden;
    min-height: 280px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .hero-section::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%),
      conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 60deg);
    transform: rotate(30deg);
    animation: rotate 15s linear infinite;
    z-index: 0;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .hero-main-number {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1;
    margin: 1rem 0;
    letter-spacing: -0.5px;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    font-weight: 500;
    opacity: 0.9;
    max-width: 90%;
    margin-bottom: 1.5rem;
  }
  
  .hero-badge {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 9999px;
    padding: 0.5rem 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    margin-top: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .leaf-pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Card Weight System */
  .hero-card {
    background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
    border-radius: 24px;
    box-shadow: 
      0 25px 50px -12px rgba(20, 184, 166, 0.25),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    color: white;
    margin-bottom: 2.5rem;
    padding: 3rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .primary-card {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    box-shadow: 
      0 10px 30px rgba(0,0,0,0.08),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
    backdrop-filter: blur(12px);
  }
  
  .primary-card:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.12),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  }
  
  .secondary-card {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 18px;
    box-shadow: 
      0 6px 20px rgba(0,0,0,0.04),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    backdrop-filter: blur(8px);
  }
  
  .secondary-card:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 10px 30px rgba(0,0,0,0.06),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
  }
  
  .metric-value {
    font-size: 2.75rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
    background: linear-gradient(90deg, #0f766e, #14b8a6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .metric-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.7;
  }
  
  .status-pill {
    padding: 0.3rem 0.9rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
  }
  
  .status-success {
    background: rgba(220, 252, 231, 0.7);
    color: #166534;
    border: 1px solid rgba(187, 247, 208, 0.5);
  }
  
  .status-warning {
    background: rgba(254, 243, 199, 0.7);
    color: #92400e;
    border: 1px solid rgba(253, 230, 138, 0.5);
  }
  
  .status-info {
    background: rgba(219, 234, 254, 0.7);
    color: #1e40af;
    border: 1px solid rgba(191, 219, 254, 0.5);
  }
  
  .status-neutral {
    background: rgba(241, 245, 249, 0.7);
    color: #475569;
    border: 1px solid rgba(226, 232, 240, 0.5);
  }
  
  /* Timeline Enhancements */
  .timeline-container {
    padding: 1.5rem 0;
  }
  
  .timeline-item {
    position: relative;
    padding-left: 3rem;
    padding-bottom: 1.75rem;
  }
  
  .timeline-item:last-child {
    padding-bottom: 0;
  }
  
  .timeline-item::before {
    content: "";
    position: absolute;
    left: 1.25rem;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, #cbd5e1, transparent);
  }
  
  .timeline-item:last-child::before {
    height: 1.75rem;
  }
  
  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  .timeline-icon.unlocked {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    animation: bounce 1s ease;
    box-shadow: 0 6px 15px rgba(16, 185, 129, 0.3);
  }
  
  .timeline-icon.locked {
    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
    color: #94a3b8;
  }
  
  .timeline-icon:hover {
    transform: scale(1.1);
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-5px);}
    60% {transform: translateY(-3px);}
  }
  
  /* Chart Enhancements */
  .chart-container {
    padding: 1.75rem;
  }
  
  .chart-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
  }
  
  .chart-insight {
    font-size: 0.95rem;
    color: #64748b;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
  
  .chart-insight strong {
    color: #0f172a;
    font-weight: 600;
  }
  
  /* Table Enhancements */
  .table-container {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  
  .table-header {
    background-color: rgba(248, 250, 252, 0.7);
    font-weight: 600;
    color: #334155;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(4px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  }
  
  .table-row {
    transition: background-color 0.2s ease;
    border-bottom: 1px solid rgba(226, 232, 240, 0.3);
  }
  
  .table-row:last-child {
    border-bottom: none;
  }
  
  .table-row:hover {
    background-color: rgba(241, 245, 249, 0.5);
  }
  
  .table-cell {
    padding: 1rem 1.25rem;
  }
  
  /* Color System Refinement */
  .accent-blue {
    background: rgba(219, 234, 254, 0.7);
    color: #1e40af;
    border: 1px solid rgba(191, 219, 254, 0.5);
  }
  
  .accent-amber {
    background: rgba(254, 243, 199, 0.7);
    color: #92400e;
    border: 1px solid rgba(253, 230, 138, 0.5);
  }
  
  .accent-emerald {
    background: rgba(220, 252, 231, 0.7);
    color: #166534;
    border: 1px solid rgba(187, 247, 208, 0.5);
  }
  
  .neutral-bg {
    background: rgba(248, 250, 252, 0.5);
  }
  
  /* Typography Authority */
  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
  }
  
  .section-title::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #059669);
    border-radius: 3px;
  }
  
  .section-subtitle {
    font-size: 1rem;
    color: #64748b;
    font-weight: 400;
    opacity: 0.8;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .hero-main-number {
      font-size: 3rem;
    }
    
    .hero-section {
      padding: 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .dashboard-container {
      padding: 1.25rem;
    }
    
    .hero-main-number {
      font-size: 2.5rem;
    }
    
    .hero-section {
      padding: 1.5rem;
    }
  }
`;

/* ---------- Custom Components ---------- */
const Card = ({ title, children, className = "", headerAction, variant = "primary", ...props }) => {
  const cardClasses = {
    hero: "hero-card",
    primary: "primary-card",
    secondary: "secondary-card"
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${cardClasses[variant]} ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-100/50 flex items-center justify-between backdrop-blur-sm">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          {headerAction && (
            <div className="text-sm text-gray-600">{headerAction}</div>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
};

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
      className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 p-5 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} text-white text-xl shadow-md`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-lg ${
            trend > 0 ? 'bg-emerald-50/70 text-emerald-700' : 'bg-rose-50/70 text-rose-700'
          } backdrop-blur-sm border border-white/30`}>
            {trend > 0 ? <FiTrendingUp className="mr-1" /> : null}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
          {badge && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100/70 text-emerald-700 backdrop-blur-sm border border-white/30">
              {badge}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          <CountUp end={typeof value === 'number' ? value : parseFloat(value) || 0} duration={2} />
          {typeof value === 'string' && value.includes('kg') ? 'kg' : ''}
          {typeof value === 'string' && value.includes('$') ? '$' : ''}
        </p>
        {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

// Add these new styled components for better design
const AchievementCard = ({ achievement, index }) => {
  const progress = Math.min(100, (achievement.currentValue / Math.max(achievement.requiredValue, 1)) * 100);
  
  // Define icon mapping based on achievement ID
  const getAchievementIcon = (id) => {
    const iconMap = {
      'first_order': <FaSeedling className="w-5 h-5" />,
      'green_shopper_5': <FaLeaf className="w-5 h-5" />,
      'green_shopper_25': <TbPlant className="w-5 h-5" />,
      'green_shopper_50': <FaTree className="w-5 h-5" />,
      'carbon_saver_10': <TbTrees className="w-5 h-5" />,
      'carbon_saver_50': <FiShield className="w-5 h-5" />,
      'carbon_saver_100': <FiGlobe className="w-5 h-5" />,
      'carbon_saver_250': <FaMedal className="w-5 h-5" />,
      'eco_starter': <FaRecycle className="w-5 h-5" />,
      'eco_enthusiast': <FaRegLightbulb className="w-5 h-5" />,
      'eco_warrior': <FiShield className="w-5 h-5" />,
      'eco_legend': <FaCrown className="w-5 h-5" />,
      'regular_customer': <FiShoppingBag className="w-5 h-5" />,
      'loyal_customer': <FiAward className="w-5 h-5" />,
      'vip_customer': <FaCrown className="w-5 h-5" />,
      'spender_100': <FaWallet className="w-5 h-5" />,
      'spender_500': <FaChartPie className="w-5 h-5" />,
      'spender_1000': <FiTrendingUp className="w-5 h-5" />,
    };
    return iconMap[id] || <FiAward className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
        achievement.unlocked 
          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 shadow-sm' 
          : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300'
      } hover:shadow-md`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full flex items-center justify-center ${
          achievement.unlocked 
            ? 'bg-emerald-100 text-emerald-600' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          {getAchievementIcon(achievement.id)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`font-bold ${
              achievement.unlocked ? 'text-emerald-800' : 'text-gray-700'
            }`}>
              {achievement.name}
            </h4>
            {achievement.unlocked && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <FiCheck className="mr-1" /> Unlocked
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-1 mb-3">
            {achievement.description}
          </p>
          
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{achievement.currentValue}/{achievement.requiredValue}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  achievement.unlocked ? 'bg-emerald-500' : 'bg-emerald-300'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EcoTipCard = ({ tip, index }) => {
  // Define icon mapping based on priority
  const getTipIcon = (priority) => {
    const iconMap = {
      'HIGH': <FiAlertTriangle className="w-5 h-5 text-rose-500" />,
      'MEDIUM': <FiAlertCircle className="w-5 h-5 text-amber-500" />,
      'LOW': <FiInfo className="w-5 h-5 text-emerald-500" />,
    };
    return iconMap[priority] || <FiInfo className="w-5 h-5 text-blue-500" />;
  };

  // Define background color based on priority
  const getTipBackground = (priority) => {
    const bgMap = {
      'HIGH': 'bg-rose-50 border-rose-200',
      'MEDIUM': 'bg-amber-50 border-amber-200',
      'LOW': 'bg-emerald-50 border-emerald-200',
    };
    return bgMap[priority] || 'bg-blue-50 border-blue-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-xl border-l-4 ${getTipBackground(tip.priority)} transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getTipIcon(tip.priority)}
        </div>
        <p className="text-sm text-gray-800 font-medium">
          {tip.message}
        </p>
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
          <p className="text-gray-700 font-medium">Loading your eco dashboard...</p>
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

  // Calculate tree equivalent
  const calculateTreeEquivalent = (carbonSaved) => {
    // Average tree absorbs ~22kg CO2 per year
    return Math.max(1, Math.round(carbonSaved / 22));
  };

  return (
    <div className="dashboard-container">
      <style>{dashboardStyles}</style>
      <div className="max-w-7xl mx-auto">
        {/* ---------- Enhanced Hero Section (Primary Level) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-section"
        >
          <div className="hero-content">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="leaf-pulse">
                    <FaLeaf className="w-8 h-8 text-emerald-200" />
                  </div>
                  <h1 className="text-2xl font-bold">Your Sustainability Impact</h1>
                </div>
                
                <h2 className="hero-main-number">
                  {stats?.carbonSaved ? (
                    <CountUp 
                      end={stats.carbonSaved} 
                      duration={3} 
                      decimals={0}
                      suffix="kg CO₂"
                    />
                  ) : (
                    "0kg CO₂"
                  )}
                </h2>
                
                <p className="hero-subtitle">
                  {stats?.carbonSaved > 0 ? (
                    `Equivalent to planting ${calculateTreeEquivalent(stats.carbonSaved)} trees 🌳 and better than last month by ↑ ${stats.carbonSavedTrend || 0}%`
                  ) : (
                    `You're in the Top 10% of eco-friendly users! Start making purchases to see your impact.`
                  )}
                </p>
                
                <div className="hero-badge">
                  <FaMedal className="text-yellow-300" />
                  <span>Eco Score: {stats?.ecoScore || 'A+'} • Top 10%</span>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🌱</div>
                    <h3 className="font-bold text-lg mb-2">Next Milestone</h3>
                    <p className="text-sm opacity-90">Save 300kg CO₂</p>
                    <div className="mt-4 w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="bg-white h-3 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, ((stats?.carbonSaved ?? 0) / 300) * 100)}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      ></motion.div>
                    </div>
                    <p className="text-xs mt-3 opacity-80">
                      {300 - (stats?.carbonSaved ?? 0)}kg to go
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Secondary Level: Key Metrics Grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card variant="secondary" className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-emerald-100/70 text-emerald-600 backdrop-blur-sm border border-white/30">
                  <FiTarget className="w-6 h-6" />
                </div>
              </div>
              <p className="metric-label">Eco Score</p>
              <p className="metric-value">{stats?.ecoScore ?? 'A+'}</p>
              <div className="mt-2">
                <span className="status-pill status-success">Top 10%</span>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card variant="secondary" className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-100/70 text-blue-600 backdrop-blur-sm border border-white/30">
                  <TbTrees className="w-6 h-6" />
                </div>
              </div>
              <p className="metric-label">Carbon Saved</p>
              <p className="metric-value">
                <CountUp end={stats?.carbonSaved ?? 0} duration={2} />kg
              </p>
              <p className="text-xs text-gray-500 mt-1">Equivalent to {calculateTreeEquivalent(stats?.carbonSaved ?? 0)} trees</p>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card variant="secondary" className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-amber-100/70 text-amber-600 backdrop-blur-sm border border-white/30">
                  <FaSeedling className="w-6 h-6" />
                </div>
              </div>
              <p className="metric-label">Green Purchases</p>
              <p className="metric-value">{stats?.greenPurchases ?? 0}</p>
              <div className="mt-2 flex items-center justify-center text-emerald-600 text-sm">
                <FiTrendingUp className="mr-1" />
                <span>{stats?.greenPurchasesTrend ?? 0}% this month</span>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card variant="secondary" className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-violet-100/70 text-violet-600 backdrop-blur-sm border border-white/30">
                  <FaWallet className="w-6 h-6" />
                </div>
              </div>
              <p className="metric-label">Total Invested</p>
              <p className="metric-value">
                ${stats?.totalSpent ?? 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">In sustainable products</p>
            </Card>
          </motion.div>
        </motion.div>

        {/* ---------- Carbon Trend Chart (Secondary Level) - Full Width ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card variant="primary">
            <div className="chart-container">
              <h3 className="chart-title">Carbon Footprint Trend</h3>
              <p className="chart-insight">
                📉 Your footprint spiked during holiday purchases but dropped 18% in the last 30 days
              </p>
              
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
                    <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      label={{ 
                        value: 'kg CO₂', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#94a3b8'
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                      formatter={(value) => [`${value} kg`, "Carbon Footprint"]}
                      labelStyle={{ fontWeight: 600 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="carbon"
                      stroke="#10b981"
                      strokeWidth={4}
                      fill="url(#carbonGradient)"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ---------- Quick Stats (Tertiary Level) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total Orders",
              value: stats?.totalOrders ?? 0,
              icon: <FiShoppingBag className="w-5 h-5 text-blue-600" />,
              change: "+12%"
            },
            {
              label: "Items Purchased",
              value: stats?.totalItemsPurchased ?? 0,
              icon: <FaBox className="w-5 h-5 text-amber-600" />,
              change: "+8%"
            },
            {
              label: "Avg Order Value",
              value: `$${stats?.totalOrders > 0
                ? (stats?.totalSpent / stats?.totalOrders).toFixed(2)
                : 0}`,
              icon: <FaWallet className="w-5 h-5 text-emerald-600" />,
              change: "+5%"
            },
            {
              label: "Green Purchase Rate",
              value: `${stats?.totalItemsPurchased > 0
                ? ((stats?.greenPurchases / stats?.totalItemsPurchased) * 100).toFixed(1)
                : 0}%`,
              icon: <FaPercentage className="w-5 h-5 text-teal-600" />,
              change: "+15%"
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="secondary-card p-4 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-gray-100/70 rounded-lg backdrop-blur-sm border border-white/30">
                  {item.icon}
                </div>
              </div>
              <div className="metric-value text-2xl">{item.value}</div>
              <div className="metric-label mt-1">{item.label}</div>
              <div className="mt-2">
                <span className="status-pill status-success">{item.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- Analytics Grid (Tertiary Level) ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card variant="secondary">
              <div className="chart-container">
                <h3 className="chart-title">Category Breakdown</h3>
                <p className="chart-insight">
                  Electronics contribute most to your carbon footprint
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        animationDuration={1000}
                        animationBegin={200}
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
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(226, 232, 240, 0.5)',
                          borderRadius: '12px',
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                          backdropFilter: 'blur(10px)'
                        }}
                        labelStyle={{ fontWeight: 600 }}
                      />
                      <Legend 
                        verticalAlign="bottom"
                        height={40}
                        formatter={(value) => (
                          <span className="text-sm text-gray-700 font-medium">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Eco Ratings Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="secondary">
              <div className="chart-container">
                <h3 className="chart-title">Eco Ratings Distribution</h3>
                <p className="chart-insight">
                  Most users score B or higher on sustainable purchases
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ecoRatingData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                      <XAxis 
                        dataKey="rating" 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(226, 232, 240, 0.5)',
                          borderRadius: '12px',
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                          backdropFilter: 'blur(10px)'
                        }}
                        labelStyle={{ fontWeight: 600 }}
                      />
                      <Bar 
                        dataKey="count" 
                        radius={[8, 8, 0, 0]}
                        barSize={45}
                        animationDuration={1000}
                        animationBegin={300}
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
              </div>
            </Card>
          </motion.div>

         
        </div>

        {/* ---------- Recent Orders Table (Tertiary Level) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <Card 
            variant="primary"
            title="Recent Orders"
            headerAction={
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All <FiChevronRight className="ml-1" />
              </button>
            }
          >
            <div className="table-container">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th className="table-cell text-left text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="table-cell text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="table-cell text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="table-cell text-left text-sm font-semibold text-gray-700">Carbon</th>
                    <th className="table-cell text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentOrders ?? []).slice(0, 5).map((order, index) => (
                    <motion.tr
                      key={order.orderId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="table-row"
                    >
                      <td className="table-cell">
                        <div className="font-semibold text-gray-900">#{order.orderId}</div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="font-bold text-gray-900">${order.totalAmount}</div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <TbPlant className="w-4 h-4 text-emerald-600" />
                          <span className="text-gray-700 font-medium">{order.totalCarbon}kg</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`status-pill ${
                          order.status === "DELIVERED"
                            ? "status-success"
                            : order.status === "PENDING"
                            ? "status-warning"
                            : order.status === "SHIPPED"
                            ? "status-info"
                            : "status-neutral"
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

        {/* ---------- Recent Achievements ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="primary" title="Your Achievements" className="overflow-hidden">
            <div className="space-y-4">
              {(achievements ?? []).slice(0, 4).map((ach, index) => (
                <AchievementCard key={ach.id} achievement={ach} index={index} />
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                View All Achievements <FiChevronRight className="ml-1" />
              </button>
            </div>
          </Card>
        </motion.div>

        {/* ---------- Personalized Eco Tips ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card variant="secondary" title="Eco Tips for You" className="overflow-hidden">
            <div className="space-y-4">
              {(personalizedTips ?? []).slice(0, 3).map((tip, index) => (
                <EcoTipCard key={index} tip={tip} index={index} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Refresh Tips
              </button>
              <button className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                View All Tips <FiChevronRight className="ml-1" />
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
