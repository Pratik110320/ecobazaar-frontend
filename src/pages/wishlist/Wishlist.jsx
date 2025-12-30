// src/pages/wishlist/Wishlist.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/products/ProductCard';
import { motion } from 'framer-motion';
import { FiHeart, FiX, FiShoppingBag, FiAlertCircle } from 'react-icons/fi';

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlist, removeFromWishlist, loading, error, clearError, getProductFromWishlistEntry } = useWishlist();

  React.useEffect(() => {
    if (wishlist.length > 0) {
      console.log('🎯 Wishlist data structure:', wishlist);
      console.log('📦 First wishlist item:', wishlist[0]);
    }
  }, [wishlist]);

  const handleRemove = async (wishlistEntryId) => {
    try {
      await removeFromWishlist(wishlistEntryId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 text-gray-400 mb-6">
            <FiHeart className="text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Please Log In</h3>
          <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist</p>
          <a href="/login" className="inline-flex items-center px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium">Log In</a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <FiAlertCircle className="text-red-500 mr-3" />
            <span className="text-red-700 flex-1">{error}</span>
            <button onClick={clearError} className="text-red-500 hover:text-red-700"><FiX /></button>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600"><FiHeart className="text-2xl" /></div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
            </div>
          </div>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 text-gray-400 mb-6"><FiHeart className="text-4xl" /></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist</p>
            <a href="/products" className="inline-flex items-center px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"><FiShoppingBag className="mr-2" />Browse Products</a>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item, index) => {
              const product = getProductFromWishlistEntry(item.id) || item.product || item;
              const wishlistEntryId = item.id;

              return (
                <motion.div key={wishlistEntryId} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 * index }} className="relative">
                  <ProductCard product={product} />
                  <button onClick={() => handleRemove(wishlistEntryId)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition" aria-label={`Remove ${product.name} from wishlist`}><FiX className="text-gray-600" /></button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
