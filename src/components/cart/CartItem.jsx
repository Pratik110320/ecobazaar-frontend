// src/components/cart/CartItem.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiTag, 
  FiTrash2, 
  FiRefreshCw,
  FiChevronRight
} from 'react-icons/fi';

const CartItem = ({ item, onRemove }) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(item.id);
    setRemoving(false);
  };

  const getEcoRatingConfig = (rating) => {
    const configs = {
      'A+': { bg: 'bg-emerald-500', text: 'text-white' },
      'A': { bg: 'bg-green-500', text: 'text-white' },
      'B': { bg: 'bg-yellow-500', text: 'text-white' },
      'C': { bg: 'bg-orange-500', text: 'text-white' },
      'D': { bg: 'bg-red-500', text: 'text-white' },
    };
    return configs[rating] || { bg: 'bg-gray-300', text: 'text-gray-700' };
  };

  const ecoConfig = getEcoRatingConfig(item.ecoRating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition"
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Image */}
          <Link to={`/products/${item.productId}`} className="flex-shrink-0">
            <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
              <img 
                src={item.imageUrl} 
                alt={item.productName}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Eco Badge on Image */}
              <div className={`absolute top-2 right-2 ${ecoConfig.bg} ${ecoConfig.text} px-2 py-1 rounded-lg shadow-md`}>
                <div className="text-xs font-bold flex items-center gap-1">
                  <FiPackage className="text-xs" />
                  <span>{item.ecoRating}</span>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <Link to={`/products/${item.productId}`}>
                  <h4 className="font-bold text-gray-900 text-lg mb-2 hover:text-emerald-600 transition-colors">
                    {item.productName}
                  </h4>
                </Link>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <FiTag className="text-xs" />
                  {item.category}
                </div>
              </div>
              
              {/* Mobile Remove Button */}
              <button 
                onClick={handleRemove}
                disabled={removing}
                className="sm:hidden px-4 py-2 rounded-lg font-medium text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {removing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
                    Removing...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Remove
                  </>
                )}
              </button>
            </div>
            
            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-1">Price</div>
                <div className="text-lg font-bold text-emerald-600">${item.price}</div>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-1">Quantity</div>
                <div className="text-lg font-bold text-gray-900">{item.quantity}</div>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-1">Carbon</div>
                <div className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  <FiPackage className="text-sm" />
                  {item.carbonFootprint}kg
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-1">Subtotal</div>
                <div className="text-lg font-bold text-emerald-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Remove Button */}
          <div className="hidden sm:flex flex-col justify-center">
            <button 
              onClick={handleRemove}
              disabled={removing}
              className="px-4 py-2 rounded-lg font-medium text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 disabled:opacity-50 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {removing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
                  <span>Removing...</span>
                </>
              ) : (
                <>
                  <FiTrash2 />
                  Remove
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
