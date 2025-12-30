// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiStar,
  FiPackage,
  FiTag,
  FiHeart,
} from 'react-icons/fi';

// ------------------------------------------------------------------
// Local fallback image – placed in the public folder (public/no-image.png)
// ------------------------------------------------------------------
const LOCAL_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Njk2OTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { checkInWishlist, toggleWishlist, loading: wishlistLoading } = useWishlist();

  const [adding, setAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ------------------------------------------------------------------
  // Build the final image URL – fall back to the local placeholder.
  // ------------------------------------------------------------------
  const imageUrl = imageError || !product.imageUrl ? LOCAL_PLACEHOLDER : product.imageUrl;

  // ------------------------------------------------------------------
  // Helper to pick colour based on eco‑rating
  // ------------------------------------------------------------------
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
  const isInWishlist = checkInWishlist(product.id);

  // ------------------------------------------------------------------
  // Cart handling
  // ------------------------------------------------------------------
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || user.role !== 'USER') return;

    setAdding(true);
    try {
      const result = await addToCart(product.id, 1);
      if (!result.success) alert(result.error);
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  // ------------------------------------------------------------------
  // Wishlist handling
  // ------------------------------------------------------------------
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || user.role !== 'USER') return;

    try {
      await toggleWishlist(product.id);
    } catch (error) {
      console.error('Wishlist error:', error);
      alert('Failed to update wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col hover:shadow-md transition-all duration-300"
    >
      {/* --------------------------------------------------------------
          Image + overlay badges
       -------------------------------------------------------------- */}
      <Link
        to={`/products/${product.id}`}
        className="relative overflow-hidden block"
      >
        <img
          src={imageUrl}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Badges (Featured / Pending) */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {product.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
                <FiStar className="text-xs" />
                Featured
              </span>
            )}
            {!product.verified && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-amber-600 shadow-sm">
                <FiClock className="text-xs" />
                Pending
              </span>
            )}
          </div>

          {/* Eco‑rating badge */}
          <div className={`${ecoConfig.bg} ${ecoConfig.text} px-3 py-1.5 rounded-full shadow-md`}>
            <div className="text-xs font-bold flex items-center gap-1">
              <FiPackage className="text-xs" />
              <span>{product.ecoRating || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Wishlist button (only for normal users) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {user?.role === 'USER' && (
            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className={`p-2 rounded-full shadow-md transition ${
                isInWishlist
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wishlistLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : (
                <FiHeart className={isInWishlist ? 'fill-current' : ''} />
              )}
            </button>
          )}
        </div>

        {/* Hover overlay "View Details →" */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <span className="text-white font-semibold text-sm transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
            View Details →
          </span>
        </div>
      </Link>

      {/* --------------------------------------------------------------
          Content (title, description, price, carbon, category, actions)
       -------------------------------------------------------------- */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            to={`/products/${product.id}`}
            className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 hover:text-emerald-600 transition-colors"
          >
            {product.name}
          </Link>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & carbon */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              ${product.price}
            </div>
            <div className="text-xs text-gray-500">per unit</div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
              <FiPackage className="text-emerald-600" />
              <span className="text-sm">{product.carbonFootprint}kg</span>
            </div>
            <div className="text-xs text-gray-500">CO₂</div>
          </div>
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <FiTag className="text-xs" />
            {product.category}
          </span>
        </div>

        {/* Action buttons – only for normal users */}
        {user?.role === 'USER' && (
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={adding || !product.verified}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                product.verified
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {adding ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Adding...
                </>
              ) : product.verified ? (
                <>
                  <FiShoppingBag />
                  Add to Cart
                </>
              ) : (
                <>
                  <FiClock />
                  Pending Verification
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;