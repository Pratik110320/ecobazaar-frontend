// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/api';
import UserDashboard from '../../components/dashboard/UserDashboard';
import SellerDashboard from '../../components/dashboard/SellerDashboard';
import AdminDashboard from '../../components/dashboard/AdminDashboard';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadDashboard}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {user.role === 'USER' && <UserDashboard data={dashboardData} />}
      {user.role === 'SELLER' && <SellerDashboard data={dashboardData} />}
      {user.role === 'ADMIN' && <AdminDashboard data={dashboardData} />}
    </div>
  );
};

export default Dashboard;
