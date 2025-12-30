// src/components/reviews/ReviewList.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/api';
import { motion } from 'framer-motion';
import { FiStar, FiCheckCircle, FiTrash2, FiUser, FiCalendar } from 'react-icons/fi';

const ReviewList = ({ reviews }) => {
  const { user } = useAuth();

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await reviewService.deleteReview(reviewId, user.id);
      // You might want to refresh reviews here
      window.location.reload(); // Simple refresh to update the list
    } catch (error) {
      alert('Failed to delete review');
    }
  };

  if (reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
          <FiStar className="text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-700">Be the first to review this product!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Product Reviews</h3>
        <span className="text-sm text-gray-600">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <FiUser className="text-lg" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <strong className="text-gray-900 font-medium">{review.userName}</strong>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        <FiCheckCircle className="text-xs" />
                        Verified Purchase
                      </span>
                    )}
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={i < review.rating ? 'fill-current' : 'text-gray-300'} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-700">{review.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <FiCalendar className="text-gray-500" />
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {review.comment && (
                    <p className="text-gray-800 mt-2">{review.comment}</p>
                  )}
                </div>
              </div>
              
              {user && user.id === review.userId && (
                <button 
                  onClick={() => handleDeleteReview(review.id)}
                  className="p-2 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
