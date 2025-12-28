// src/components/reviews/ReviewList.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviewService } from '../../services/api';

const ReviewList = ({ reviews }) => {
  const { user } = useAuth();

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await reviewService.deleteReview(reviewId, user.id);
      // You might want to refresh reviews here
      alert('Review deleted successfully');
    } catch (error) {
      alert('Failed to delete review');
    }
  };

  return (
    <div className="review-list">
      <h3>Product Reviews</h3>
      
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <strong>{review.userName}</strong>
              <span className="rating">⭐ {review.rating}/5</span>
              {review.verified && <span className="verified-badge">Verified Purchase</span>}
              <span className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {review.comment && (
              <p className="review-comment">{review.comment}</p>
            )}
            
            {user && user.id === review.userId && (
              <button 
                onClick={() => handleDeleteReview(review.id)}
                className="delete-review-btn"
              >
                Delete Review
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
