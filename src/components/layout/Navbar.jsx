// src/components/layout/Navbar.jsx - Redesigned
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCartItemCount = () => {
    return cart?.items?.length || 0;
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon }) => {
    const active = isActiveLink(to);
    return (
      <Link
        to={to}
        className={`group relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
          active
            ? 'text-primary-700 bg-primary-50'
            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <span className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </span>
        {active && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-eco-500 rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 shadow-soft">
      <div className="container-modern">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-eco-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-eco-600 p-2 rounded-xl shadow-medium">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-display font-bold text-gradient-eco">
                EcoBazaar
              </span>
              <span className="text-[10px] text-gray-500 font-medium -mt-1">Sustainable Shopping</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/" icon="🏠">Dashboard</NavLink>
              
              {user.role === 'USER' && (
                <>
                  <NavLink to="/products" icon="🛍️">Products</NavLink>
                  <NavLink to="/cart" icon="🛒">
                    <span className="flex items-center gap-2">
                      Cart
                      {getCartItemCount() > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-eco-500 to-leaf-500 rounded-full animate-pulse-eco">
                          {getCartItemCount()}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </>
              )}
              
              <NavLink to="/orders" icon="📦">Orders</NavLink>
              
              {user.role === 'SELLER' && (
                <NavLink to="/seller" icon="🏪">Seller Panel</NavLink>
              )}
              
              {user.role === 'ADMIN' && (
                <NavLink to="/admin" icon="👑">Admin Panel</NavLink>
              )}
            </div>
          )}

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-50 to-eco-50 border border-primary-100">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-eco-500 flex items-center justify-center text-white font-bold shadow-medium">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl font-medium text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-secondary !py-2 !px-5 text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-eco !py-2 !px-5 text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down border-t border-white/20">
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-4 mb-3 rounded-xl bg-gradient-to-r from-primary-50 to-eco-50 border border-primary-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-eco-500 flex items-center justify-center text-white font-bold text-lg shadow-medium">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{user.fullName}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                  </div>

                  <NavLink to="/" icon="🏠">Dashboard</NavLink>
                  {user.role === 'USER' && (
                    <>
                      <NavLink to="/products" icon="🛍️">Products</NavLink>
                      <NavLink to="/cart" icon="🛒">
                        Cart {getCartItemCount() > 0 && `(${getCartItemCount()})`}
                      </NavLink>
                    </>
                  )}
                  <NavLink to="/orders" icon="📦">Orders</NavLink>
                  {user.role === 'SELLER' && <NavLink to="/seller" icon="🏪">Seller Panel</NavLink>}
                  {user.role === 'ADMIN' && <NavLink to="/admin" icon="👑">Admin Panel</NavLink>}
                  
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="mt-4 w-full text-left px-4 py-3 rounded-xl font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    to="/login"
                    className="btn-secondary w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-eco w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;