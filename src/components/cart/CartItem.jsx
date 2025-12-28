// src/components/cart/CartItem.jsx - Updated with Tailwind CSS
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const CartItem = ({ item, onRemove }) => {
  const [removing, setRemoving] = React.useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(item.id);
    setRemoving(false);
  };

  const getEcoRatingClass = (rating) => {
    if (!rating) return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
      <Link to={`/products/${item.productId}`} className="flex-shrink-0">
        <img 
          src={item.imageUrl} 
          alt={item.productName}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.productId}`}>
          <h4 className="font-semibold text-gray-900 truncate hover:text-primary-600 transition-colors">
            {item.productName}
          </h4>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="font-medium text-gray-900">${item.price}</span>
          <span className="text-gray-600">Qty: {item.quantity}</span>
          <span className="text-gray-600">Carbon: {item.carbonFootprint}kg</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEcoRatingClass(item.ecoRating)}`}>
            {item.ecoRating}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button 
          onClick={handleRemove}
          disabled={removing}
          variant="danger"
          size="small"
        >
          {removing ? 'Removing...' : 'Remove'}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
