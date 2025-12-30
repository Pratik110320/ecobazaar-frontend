// src/components/ui/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = null,
  className = ''
}) => {
  const sizes = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4'
  };

  const colors = {
    primary: 'border-primary-200 border-t-primary-600',
    success: 'border-eco-200 border-t-eco-600',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 border-t-gray-600',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizes[size]} ${colors[color]}`}></div>
      {text && <p className="mt-3 text-sm text-gray-700">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
