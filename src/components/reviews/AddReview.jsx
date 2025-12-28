// src/components/reviews/AddReview.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/api';

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
      alert('Review added successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-review">
      <h3>Add Your Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            <option value={5}>5 ⭐ - Excellent</option>
            <option value={4}>4 ⭐ - Very Good</option>
            <option value={3}>3 ⭐ - Good</option>
            <option value={2}>2 ⭐ - Fair</option>
            <option value={1}>1 ⭐ - Poor</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Comment (optional):</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={3}
          />
        </div>
        
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
