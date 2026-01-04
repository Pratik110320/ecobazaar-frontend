// src/components/reviews/AddReview.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/api';
import { motion } from 'framer-motion';
import { FiStar, FiSend } from 'react-icons/fi';

const AddReview = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    try {
      await reviewService.addReview({
        userId: user.id,
        productId,
        rating,
        comment
      });
      
      setComment('');
      setRating(5);
      onReviewAdded(); // Refresh reviews
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Add Your Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <FiStar 
                  className={star <= rating ? 'text-amber-500 fill-current' : 'text-gray-300'} 
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-700">{rating} Star{rating !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Comment <span className="text-gray-600">(optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition font-medium disabled:opacity-70"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <FiSend />
              Submit Review
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddReview;
