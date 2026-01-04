// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/api';
import UserDashboard from '../../components/dashboard/UserDashboard';
import SellerDashboard from '../../components/dashboard/SellerDashboard';
import AdminDashboard from '../../components/dashboard/AdminDashboard';
import { motion } from 'framer-motion';
import { FiBarChart2, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, [user]);

  const loadDashboard = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (user.role) {
        case 'ADMIN':
          response = await dashboardService.getAdminDashboard();
          break;
        case 'SELLER':
          response = await dashboardService.getSellerDashboard(user.id);
          break;
        default: // USER
          response = await dashboardService.getUserDashboard(user.id);
      }
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-100 text-rose-600 mb-6">
            <FiAlertCircle className="text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadDashboard}
            className="flex items-center px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium mx-auto"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const getDashboardTitle = () => {
    switch (user.role) {
      case 'ADMIN': return 'Admin Dashboard';
      case 'SELLER': return 'Seller Dashboard';
      case 'USER': return 'User Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <FiBarChart2 className="text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {getDashboardTitle()}
          </h1>
          <p className="text-lg text-gray-600">
            {user.role === 'ADMIN' && 'Platform overview & management console'}
            {user.role === 'SELLER' && 'Manage your products and track sales'}
            {user.role === 'USER' && 'Track your sustainability impact and achievements'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {user.role === 'USER' && <UserDashboard data={dashboardData} />}
          {user.role === 'SELLER' && <SellerDashboard data={dashboardData} />}
          {user.role === 'ADMIN' && <AdminDashboard data={dashboardData} />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
