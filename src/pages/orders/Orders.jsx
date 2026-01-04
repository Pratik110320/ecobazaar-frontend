// src/pages/orders/Orders.jsx
import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import OrderCard from '../../components/orders/OrderCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, 
  FiClock, 
  FiCheckCircle, 
  FiTruck, 
  FiHome, 
  FiXCircle,
  FiShoppingBag,
  FiActivity
} from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = user.role === 'ADMIN' 
        ? await orderService.getAll()
        : await orderService.getUserOrders(user.id);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'ALL') return true;
    return order.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <FiClock />;
      case 'CONFIRMED': return <FiCheckCircle />;
      case 'PROCESSING': return <FiPackage />;
      case 'SHIPPED': return <FiTruck />;
      case 'DELIVERED': return <FiHome />;
      case 'CANCELLED': return <FiXCircle />;
      default: return <FiClock />;
    }
  };

  // Calculate counts for the Quick Stats Grid
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    processing: orders.filter(o => ['CONFIRMED', 'PROCESSING', 'SHIPPED'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'DELIVERED').length,
  };

  const tabs = [
    { id: 'ALL', label: 'All Orders' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-emerald-500 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FiPackage className="text-emerald-500 text-xl" />
          </div>
        </div>
        <p className="mt-4 text-gray-500 font-medium">Fetching orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Modern Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FiShoppingBag className="text-emerald-600" />
                {user.role === 'ADMIN' ? 'Order Management' : 'My Orders'}
              </h1>
              <p className="text-gray-500 text-sm mt-1 ml-9">
                Manage and track all your recent purchases
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <FiActivity className="text-emerald-500" />
              <span>Last updated: just now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 2. Quick Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Total Orders" value={stats.total} icon={<FiShoppingBag />} color="blue" />
          <StatCard label="Pending" value={stats.pending} icon={<FiClock />} color="yellow" />
          <StatCard label="In Progress" value={stats.processing} icon={<FiTruck />} color="purple" />
          <StatCard label="Completed" value={stats.completed} icon={<FiCheckCircle />} color="emerald" />
        </motion.div>

        {/* 3. Filter Tabs */}
        <div className="mb-8 overflow-x-auto pb-1 scrollbar-hide">
          <div className="flex space-x-1 border-b border-gray-200 min-w-max">
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              const count = tab.id === 'ALL' 
                ? orders.length 
                : orders.filter(o => o.status === tab.id).length;

              if (count === 0 && tab.id !== 'ALL') return null; // Optional: hide empty tabs

              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`
                    relative px-6 py-3 text-sm font-medium transition-colors duration-200 ease-in-out flex items-center gap-2
                    ${isActive ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'}
                  `}
                >
                  {tab.label}
                  <span className={`
                    ml-2 py-0.5 px-2.5 rounded-full text-xs
                    ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {count}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Orders List */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={filter}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="mx-auto h-16 w-16 text-gray-300 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  <FiPackage size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                <p className="text-gray-500 mt-1">There are no orders in this category.</p>
                {user.role === 'USER' && filter === 'ALL' && (
                  <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm">
                    Start Shopping
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Wrapping existing card to control its container style if needed */}
                    <div className="hover:shadow-md transition-shadow duration-300">
                      <OrderCard 
                        order={order} 
                        userRole={user.role}
                        onStatusUpdate={loadOrders}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ label, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
};

export default Orders;