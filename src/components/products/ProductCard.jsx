// src/components/products/ProductCard.jsx - Updated with Tailwind CSS
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    if (!user || user.role !== 'USER') return;
    
    setAdding(true);
    try {
      const result = await addToCart(product.id, 1);
      if (result.success) {
        // Success feedback could be added here
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const getEcoRatingClass = (rating) => {
    if (!rating) return 'bg-gray-100 text-gray-800';
    switch (rating) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-green-50 text-green-700 border-green-100';
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'D': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block flex-1">
        <div className="relative h-48 overflow-hidden rounded-t-xl group">
          <img 
            src={imageError ? '/placeholder-product.jpg' : (product.imageUrl || '/placeholder-product.jpg')} 
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            {product.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                ⭐ Featured
              </span>
            )}
            {!product.verified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                ⏳ Pending
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-eco-600">
              ${product.price}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {product.category}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEcoRatingClass(product.ecoRating)}`}>
              🌱 {product.ecoRating || 'N/A'}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {product.carbonFootprint}kg CO₂
            </span>
          </div>
        </div>
      </Link>
      
      {user?.role === 'USER' && (
        <div className="px-4 pb-4">
          <Button 
            onClick={handleAddToCart}
            disabled={adding || !product.verified}
            variant={product.verified ? "success" : "secondary"}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : product.verified ? (
              '🛒 Add to Cart'
            ) : (
              '⏳ Pending Verification'
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
