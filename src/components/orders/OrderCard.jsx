// src/components/orders/OrderCard.jsx - Updated with Tailwind CSS
import React, { useState } from 'react';
import { orderService } from '../../services/api';
import Button from '../ui/Button';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'SHIPPED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PROCESSING': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'CONFIRMED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PENDING': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <h3 className="text-xl font-semibold text-gray-900">Order #{order.id}</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
            {order.status || 'PENDING'}
          </span>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">${order.totalAmount || 0}</div>
          <div className="text-sm text-gray-600">{totalCarbon}kg CO₂</div>
          <div className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Address:</strong> {order.shippingAddress || order.address || 'N/A'}</p>
            <p><strong>Phone:</strong> {order.phoneNumber || order.phone || 'N/A'}</p>
            <p><strong>Payment:</strong> {order.paymentMethod || 'N/A'} ({order.paymentStatus || 'Pending'})</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Order Items ({orderItems.length})</h4>
          <div className="space-y-2">
            {orderItems.map((item, index) => (
              <div key={item.id || index} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.productNameSnapshot || item.productName || 'Product'} × {item.quantity || 1}
                </span>
                <span className="text-gray-900">${item.priceSnapshot || item.price || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      {userRole === 'ADMIN' && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Update Status:</span>
            <select 
              value={order.status || 'PENDING'}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={updating}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            {updating && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
