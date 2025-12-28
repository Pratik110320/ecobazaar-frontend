// src/components/layout/Navbar.jsx - Updated with Tailwind CSS
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const getCartItemCount = () => {
    return cart?.items?.length || 0;
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-primary-100 text-primary-700 border-primary-500' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-eco-600">
              <span className="text-3xl">🌱</span>
              <span>EcoBazaar</span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActiveLink('/')}`}
                >
                  Dashboard
                </Link>
                
                {/* Only show Products and Cart to USER role */}
                {user.role === 'USER' && (
                  <>
                    <Link 
                      to="/products" 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActiveLink('/products')}`}
                    >
                      Products
                    </Link>
                    <Link 
                      to="/cart" 
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative ${isActiveLink('/cart')}`}
                    >
                      Cart
                      {getCartItemCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-eco-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartItemCount()}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                
                {/* Show Orders to all authenticated users */}
                <Link 
                  to="/orders" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActiveLink('/orders')}`}
                >
                  Orders
                </Link>
                
                {/* Role-specific panels */}
                {user.role === 'SELLER' && (
                  <Link 
                    to="/seller" 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActiveLink('/seller')}`}
                  >
                    Seller Panel
                  </Link>
                )}
                
                {user.role === 'ADMIN' && (
                  <Link 
                    to="/admin" 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActiveLink('/admin')}`}
                  >
                    Admin Panel
                  </Link>
                )}
                
                {/* User Menu */}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-600">
                    Welcome, <span className="font-semibold">{user.fullName}</span>
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-100 text-eco-800">
                    {user.role}
                  </span>
                  <button 
                    onClick={handleLogout} 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-md text-sm font-medium bg-eco-500 text-white hover:bg-eco-600 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {user ? (
            <>
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
              {user.role === 'USER' && (
                <>
                  <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Products</Link>
                  <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Cart ({getCartItemCount()})</Link>
                </>
              )}
              <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Orders</Link>
              {user.role === 'SELLER' && (
                <Link to="/seller" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Seller Panel</Link>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Admin Panel</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
