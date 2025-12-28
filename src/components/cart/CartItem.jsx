// src/components/cart/CartItem.jsx - Redesigned
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="card-modern p-5 group hover:shadow-medium transition-all">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Image */}
        <Link to={`/products/${item.productId}`} className="flex-shrink-0">
          <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-primary-50">
            <img 
              src={item.imageUrl} 
              alt={item.productName}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Eco Badge on Image */}
            <div className={`absolute top-2 right-2 ${ecoConfig.bg} ${ecoConfig.text} px-2 py-1 rounded-lg shadow-medium`}>
              <div className="text-xs font-bold flex items-center gap-1">
                <span>🌱</span>
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
                <h4 className="font-bold text-gray-900 text-lg mb-2 hover:text-primary-600 transition-colors">
                  {item.productName}
                </h4>
              </Link>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {item.category}
              </div>
            </div>
            
            {/* Mobile Remove Button */}
            <button 
              onClick={handleRemove}
              disabled={removing}
              className="sm:hidden px-4 py-2 rounded-xl font-medium text-sm text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {removing ? (
                <>
                  <div className="spinner !w-4 !h-4 !border-2 !border-red-300 !border-t-red-600"></div>
                  Removing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </>
              )}
            </button>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary-50 to-eco-50 border border-primary-100">
              <div className="text-xs font-medium text-gray-600 mb-1">Price</div>
              <div className="text-lg font-bold text-gradient-eco">${item.price}</div>
            </div>
            
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="text-xs font-medium text-gray-600 mb-1">Quantity</div>
              <div className="text-lg font-bold text-blue-600">{item.quantity}</div>
            </div>
            
            <div className="p-3 rounded-xl bg-gradient-to-br from-eco-50 to-leaf-50 border border-eco-100">
              <div className="text-xs font-medium text-gray-600 mb-1">Carbon</div>
              <div className="text-lg font-bold text-eco-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.carbonFootprint}kg
              </div>
            </div>
            
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="text-xs font-medium text-gray-600 mb-1">Subtotal</div>
              <div className="text-lg font-bold text-purple-600">
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
            className="px-4 py-2 rounded-xl font-medium text-sm text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            {removing ? (
              <>
                <div className="spinner !w-4 !h-4 !border-2 !border-red-300 !border-t-red-600"></div>
                <span>Removing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;