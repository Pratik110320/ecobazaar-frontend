// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  className = '', 
  as = 'button',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-eco-600 hover:from-primary-700 hover:to-eco-700 text-white shadow-soft hover:shadow-medium transform hover:scale-105 focus:ring-primary-500',
    secondary: 'bg-white text-gray-800 border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 focus:ring-primary-500',
    success: 'bg-gradient-to-r from-eco-500 to-leaf-500 hover:from-eco-600 hover:to-leaf-600 text-white shadow-eco hover:shadow-eco-glow transform hover:scale-105 focus:ring-eco-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-soft hover:shadow-medium transform hover:scale-105 focus:ring-red-500',
    outline: 'border-2 border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-primary-500',
    ghost: 'text-gray-800 hover:bg-gray-100 focus:ring-primary-500',
    eco: 'bg-gradient-to-r from-eco-500 to-leaf-500 hover:from-eco-600 hover:to-leaf-600 text-white shadow-eco hover:shadow-eco-glow transform hover:scale-105 focus:ring-eco-500'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-sm',
    large: 'px-8 py-4 text-base',
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size]} ${className} ${disabled ? '!transform-none' : ''}`;

  const Component = as;

  return (
    <Component className={classes} disabled={disabled} {...props}>
      {children}
    </Component>
  );
};

export default Button;
