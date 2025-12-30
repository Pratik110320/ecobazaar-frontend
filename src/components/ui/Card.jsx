// src/components/ui/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  ...props 
}) => {
  const variants = {
    default: 'bg-white rounded-2xl shadow-soft border border-gray-100',
    eco: 'bg-gradient-to-br from-white to-eco-50/30 rounded-2xl shadow-soft border border-eco-200/50',
    modern: 'bg-white rounded-2xl shadow-soft border border-gray-100/50',
    glass: 'bg-white/70 backdrop-blur-md rounded-2xl border border-white/20',
  };
  
  const hoverClass = hover ? 'hover:shadow-medium transition-all duration-300 hover:-translate-y-1' : '';
  const classes = `${variants[variant]} ${hoverClass} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
