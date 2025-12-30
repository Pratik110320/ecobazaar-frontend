// src/components/orders/OrderCard.jsx
import React, { useState } from 'react';
import { orderService } from '../../services/api';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiXCircle, 
  FiClock, 
  FiDollarSign, 
  FiMapPin, 
  FiPhone, 
  FiCreditCard, 
  FiCalendar,
  FiActivity
} from 'react-icons/fi';

const OrderCard = ({ order, userRole, onStatusUpdate }) => {
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    if (userRole !== 'ADMIN') return;
    
    setUpdating(true);
    try {
      await orderService.updateStatus(order.id, newStatus);
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  // Safe data access with fallbacks
  const orderItems = order.items || [];
  const totalCarbon = order.totalCarbonFootprint || orderItems.reduce((sum, item) => sum + (item.carbonFootprint || 0) * (item.quantity || 1), 0);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'DELIVERED': 
        return { 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
          icon: <FiCheckCircle className="text-emerald-500" />,
          label: 'Delivered'
        };
      case 'SHIPPED': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: <FiTruck className="text-blue-500" />,
          label: 'Shipped'
        };
      case 'PROCESSING': 
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200', 
          icon: <FiPackage className="text-purple-500" />,
          label: 'Processing'
        };
      case 'CONFIRMED': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          icon: <FiClock className="text-yellow-500" />,
          label: 'Confirmed'
        };
      case 'PENDING': 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: <FiClock className="text-gray-500" />,
          label: 'Pending'
        };
      case 'CANCELLED': 
        return { 
          color: 'bg-rose-100 text-rose-800 border-rose-200', 
          icon: <FiXCircle className="text-rose-500" />,
          label: 'Cancelled'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: <FiClock className="text-gray-500" />,
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition"
    >
      {/* Order Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white border border-gray-200">
              <FiPackage className="text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
              <div className="flex items-center mt-1">
                <FiCalendar className="text-gray-600 text-sm mr-1" />
                <span className="text-xs text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig.color}`}>
              <span className="mr-1.5">{statusConfig.icon}</span>
              {statusConfig.label}
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <FiDollarSign className="text-emerald-600 mr-1" />
                <span className="text-xl font-bold text-emerald-600">${order.totalAmount || 0}</span>
              </div>
              <div className="flex items-center justify-end text-sm text-gray-700">
                <FiActivity className="mr-1" />
                <span>{totalCarbon}kg CO₂</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FiMapPin className="mr-2 text-indigo-500" />
              Shipping Information
            </h4>
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-600 w-24 text-sm">Address:</span>
                <span className="text-gray-900 text-sm">
                  {order.shippingAddress || order.address || 'N/A'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24 text-sm">Phone:</span>
                <span className="text-gray-900 text-sm">
                  {order.phoneNumber || order.phone || 'N/A'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-24 text-sm">Payment:</span>
                <span className="text-gray-900 text-sm">
                  {order.paymentMethod || 'N/A'} ({order.paymentStatus || 'Pending'})
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FiPackage className="mr-2 text-indigo-500" />
              Order Items ({orderItems.length})
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <div key={item.id || index} className="flex justify-between items-start py-2 border-b border-gray-200 last:border-0">
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.productNameSnapshot || item.productName || 'Product'}
                      </div>
                      <div className="text-sm text-gray-700">
                        Qty: {item.quantity || 1}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        ${(item.priceSnapshot || item.price || 0).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-700">
                        {(item.carbonFootprint || 0) * (item.quantity || 1)}kg CO₂
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-600">
                  <FiPackage className="mx-auto text-2xl mb-2" />
                  <p>No items in this order</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        {userRole === 'ADMIN' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-800 mr-3">Update Status:</span>
                <div className="relative">
                  <select 
                    value={order.status || 'PENDING'}
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                    disabled={updating}
                    className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              {updating && (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                  <span className="ml-2 text-sm text-gray-700">Updating...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;
