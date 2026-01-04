import React, { useState, useEffect } from 'react';
import { carbonService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  FaTree, 
  FaRecycle, 
  FaSeedling,
  FaChartBar,
  FaArrowUp,
  FaArrowDown,
  FaLeaf,
  FaDownload,
  FaBullseye,
  FaAward,
  FaBox,
  FaGlobeAmericas
} from 'react-icons/fa';

const CarbonReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Define this function at the top of the component
  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': '#3B82F6',
      'Clothing': '#10B981',
      'Home': '#8B5CF6',
      'Food': '#F59E0B',
      'Beauty': '#EF4444',
      'Other': '#6B7280'
    };
    return colors[category] || '#94A3B8';
  };

  useEffect(() => {
    if (user) {
      loadCarbonReport();
    }
  }, [user]);

  const loadCarbonReport = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await carbonService.getUserCarbonReport(user.id);
      setReport(response.data);
    } catch (error) {
      console.error('Failed to load carbon report:', error);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format = 'txt') => {
    if (!user?.id) return;
    
    try {
      const response = await carbonService.exportCarbonReport(user.id, format);
      
      // Handle different response types
      if (format === 'pdf') {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carbon-report-${user.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        // For text format, create a text file
        const blob = new Blob([response.data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carbon-report-${user.id}.txt`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report. Please try again.');
    }
  };

  // Helper function to safely extract data
  const getReportData = () => {
    if (!report) return {};
    
    // Handle different possible response structures
    return {
      // User stats
      totalCarbonFootprint: report.totalCarbonFootprint || report.carbonFootprint || 0,
      totalCarbonSaved: report.totalCarbonSaved || report.carbonSaved || 0,
      ecoScore: report.ecoScore || 'N/A',
      
      // Category breakdown - handle different possible structures
      categoryBreakdown: report.categoryBreakdown || report.breakdown || {},
      
      // Monthly trend data
      monthlyTrend: report.monthlyTrend || report.trend || [],
      
      // Additional metrics
      improvementRate: report.improvementRate || 0,
      totalOrders: report.totalOrders || 0,
      greenPurchases: report.greenPurchases || 0
    };
  };

  const reportData = getReportData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your carbon report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <FaChartBar className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Unavailable</h2>
          <p className="text-gray-600 mb-6">Unable to load your carbon footprint report</p>
          <button 
            onClick={loadCarbonReport}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const categoryData = Object.entries(reportData.categoryBreakdown).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
    color: getCategoryColor(name)
  }));

  const monthlyData = reportData.monthlyTrend.map((month, index) => ({
    month: month.label || `Month ${index + 1}`,
    carbon: month.carbonFootprint || month.carbon || 0,
    savings: month.carbonSaved || 0,
    orders: month.orderCount || 0
  }));

  const CarbonStat = ({ icon, label, value, sublabel }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {sublabel && <div className="text-xs text-gray-500 mt-1">{sublabel}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm mb-4">
            <FaLeaf className="text-lg" />
            <span>Carbon Footprint Report</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Environmental Impact
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analysis of your carbon footprint and sustainability progress
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center px-6 py-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition font-semibold"
            >
              <FaDownload className="mr-2" />
              Export PDF Report
            </button>
            <button
              onClick={() => handleExport('txt')}
              className="flex items-center px-6 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition font-semibold"
            >
              <FaDownload className="mr-2" />
              Export Text Report
            </button>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <CarbonStat
            icon={<FaBullseye className="text-2xl" />}
            label="Carbon Footprint"
            value={`${reportData.totalCarbonFootprint.toFixed(0)}kg`}
            sublabel="Total emissions"
          />
          <CarbonStat
            icon={<FaTree className="text-2xl" />}
            label="Carbon Saved"
            value={`${reportData.totalCarbonSaved.toFixed(0)}kg`}
            sublabel="Environmental impact"
          />
          <CarbonStat
            icon={<FaAward className="text-2xl" />}
            label="Eco Score"
            value={reportData.ecoScore}
            sublabel="Sustainability rating"
          />
          <CarbonStat
            icon={<FaBox className="text-2xl" />}
            label="Green Purchases"
            value={reportData.greenPurchases}
            sublabel="Eco-friendly choices"
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Trend */}
          {monthlyData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FaArrowUp className="mr-3 text-emerald-600" />
                Carbon Trend Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="carbon" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="Carbon Footprint"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Carbon Saved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Category Breakdown */}
          {categoryData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FaBox className="mr-3 text-emerald-600" />
                Carbon by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}kg`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg text-white p-8 mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <FaGlobeAmericas className="mr-3" />
            Your Environmental Contribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {Math.round(reportData.totalCarbonSaved / 22)}
              </div>
              <div className="text-emerald-100">Trees Equivalent</div>
              <div className="text-sm text-emerald-200 mt-1">(22kg CO₂ per tree per year)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {(reportData.totalCarbonSaved / 1800).toFixed(1)}
              </div>
              <div className="text-emerald-100">Car Miles Offset</div>
              <div className="text-sm text-emerald-200 mt-1">(per gallon of gasoline)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {(reportData.totalCarbonSaved / 1000).toFixed(1)}
              </div>
              <div className="text-emerald-100">Homes Powered</div>
              <div className="text-sm text-emerald-200 mt-1">(for one day)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarbonReport;