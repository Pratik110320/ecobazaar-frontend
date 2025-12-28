// src/pages/orders/Orders.jsx - Updated with Tailwind CSS
import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import OrderCard from '../../components/orders/OrderCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <LoadingSpinner text="Loading your orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📦 {user.role === 'ADMIN' ? 'All Orders' : 'My Orders'}
          </h1>
          <p className="text-xl text-gray-600">
            Track your order history and status
          </p>
        </div>

        {/* Status Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((statusFilter) => (
              <button
                key={statusFilter.value}
                onClick={() => setFilter(statusFilter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === statusFilter.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {statusFilter.label} ({statusFilter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No {filter === 'ALL' ? '' : filter.toLowerCase() } orders found
              </h3>
              <p className="text-gray-500 mb-6">
                {user.role === 'USER' && filter === 'ALL' 
                  ? "You haven't placed any orders yet."
                  : `No ${filter.toLowerCase()} orders at the moment.`
                }
              </p>
              {user.role === 'USER' && filter === 'ALL' && (
                <Button as="a" href="/products" variant="success">
                  Start Shopping
                </Button>
              )}
            </div>
          ) : (
            filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                userRole={user.role}
                onStatusUpdate={loadOrders}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
