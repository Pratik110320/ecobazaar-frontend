// src/pages/orders/Orders.jsx
import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import OrderCard from '../../components/orders/OrderCard';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiClock, 
  FiCheckCircle, 
  FiTruck, 
  FiHome, 
  FiXCircle,
  FiFilter
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'PENDING': 
        return { icon: <FiClock />, color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Pending' };
      case 'CONFIRMED': 
        return { icon: <FiCheckCircle />, color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Confirmed' };
      case 'PROCESSING': 
        return { icon: <FiPackage />, color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Processing' };
      case 'SHIPPED': 
        return { icon: <FiTruck />, color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Shipped' };
      case 'DELIVERED': 
        return { icon: <FiHome />, color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Delivered' };
      case 'CANCELLED': 
        return { icon: <FiXCircle />, color: 'bg-rose-100 text-rose-800 border-rose-200', label: 'Cancelled' };
      default: 
        return { icon: <FiClock />, color: 'bg-gray-100 text-gray-800 border-gray-200', label: status };
    }
  };

  const statusFilters = [
    { value: 'ALL', label: 'All Orders', count: orders.length },
    { value: 'PENDING', label: 'Pending', count: orders.filter(o => o.status === 'PENDING').length },
    { value: 'CONFIRMED', label: 'Confirmed', count: orders.filter(o => o.status === 'CONFIRMED').length },
    { value: 'PROCESSING', label: 'Processing', count: orders.filter(o => o.status === 'PROCESSING').length },
    { value: 'SHIPPED', label: 'Shipped', count: orders.filter(o => o.status === 'SHIPPED').length },
    { value: 'DELIVERED', label: 'Delivered', count: orders.filter(o => o.status === 'DELIVERED').length },
    { value: 'CANCELLED', label: 'Cancelled', count: orders.filter(o => o.status === 'CANCELLED').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <FiPackage className="text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {user.role === 'ADMIN' ? 'All Orders' : 'My Orders'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your order history and status
          </p>
        </motion.div>

        {/* Status Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-emerald-600" />
            <h3 className="font-semibold text-gray-900">Filter Orders</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((statusFilter) => {
              const config = getStatusConfig(statusFilter.value === 'ALL' ? 'PENDING' : statusFilter.value);
              return (
                <motion.button
                  key={statusFilter.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilter(statusFilter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    filter === statusFilter.value
                      ? `${config.color} border-2 border-current shadow-sm`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {statusFilter.value !== 'ALL' && config.icon}
                  {statusFilter.label} 
                  <span className="bg-white bg-opacity-30 rounded-full px-2 py-0.5">
                    {statusFilter.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                <FiPackage className="text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No {filter === 'ALL' ? '' : filter.toLowerCase() } orders found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {user.role === 'USER' && filter === 'ALL' 
                  ? "You haven't placed any orders yet."
                  : `No ${filter.toLowerCase()} orders at the moment.`
                }
              </p>
              {user.role === 'USER' && filter === 'ALL' && (
                <a 
                  href="/products" 
                  className="inline-flex items-center px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
                >
                  Start Shopping
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <OrderCard 
                    order={order} 
                    userRole={user.role}
                    onStatusUpdate={loadOrders}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;
