import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || user.role !== 'USER') return;
    
    setAdding(true);
    try {
      const result = await addToCart(product.id, 1);
      if (!result.success) {
        alert(result.error);
      }
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const getEcoRatingConfig = (rating) => {
    const configs = {
      'A+': { bg: 'bg-emerald-500', text: 'text-white', label: 'Excellent' },
      'A': { bg: 'bg-green-500', text: 'text-white', label: 'Great' },
      'B': { bg: 'bg-yellow-500', text: 'text-white', label: 'Good' },
      'C': { bg: 'bg-orange-500', text: 'text-white', label: 'Fair' },
      'D': { bg: 'bg-red-500', text: 'text-white', label: 'Poor' },
    };
    return configs[rating] || { bg: 'bg-gray-300', text: 'text-gray-700', label: 'N/A' };
  };

  const ecoConfig = getEcoRatingConfig(product.ecoRating);

  return (
    // ADDED 'group' class here to the Link element
    <Link to={`/products/${product.id}`} className="product-card block h-full group">
      {/* Image Section */}
      <div className="product-image-wrapper aspect-square relative">
        <img 
          src={imageError ? '/placeholder-product.jpg' : (product.imageUrl || '/placeholder-product.jpg')} 
          alt={product.name}
          onError={() => setImageError(true)}
          className="product-image group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {product.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            )}
            
            {!product.verified && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-orange-600 shadow-soft">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Pending
              </span>
            )}
          </div>
          
          {/* Eco Rating Badge */}
          <div className={`${ecoConfig.bg} ${ecoConfig.text} px-3 py-1.5 rounded-full shadow-medium`}>
            <div className="text-xs font-bold flex items-center gap-1">
              <span>🌱</span>
              <span>{product.ecoRating || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <span className="text-white font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details →
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 flex-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price and Carbon */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gradient-eco">
              ${product.price}
            </div>
            <div className="text-xs text-gray-500">per unit</div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
              <svg className="w-4 h-4 text-eco-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{product.carbonFootprint}kg</span>
            </div>
            <div className="text-xs text-gray-500">CO₂</div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {product.category}
          </span>
        </div>
        
        {/* Add to Cart Button */}
        {user?.role === 'USER' && (
          <button 
            onClick={handleAddToCart}
            disabled={adding || !product.verified}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              product.verified
                ? 'bg-gradient-to-r from-primary-600 to-eco-600 hover:from-primary-700 hover:to-eco-700 text-white shadow-soft hover:shadow-medium transform hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {adding ? (
              <>
                <div className="spinner !w-4 !h-4 !border-2 !border-white/30 !border-t-white"></div>
                Adding...
              </>
            ) : product.verified ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Pending Verification
              </>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;