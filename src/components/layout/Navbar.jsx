// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiPackage, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHeart // Add this import
} from 'react-icons/fi';

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

  const NavLink = ({ to, children, icon, badge }) => {
    const active = isActiveLink(to);
    return (
      <Link
        to={to}
        className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
          active
            ? 'text-emerald-700 bg-emerald-50'
            : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
        {badge && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-emerald-500 rounded-full">
            {badge}
          </span>
        )}
        {active && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-emerald-500 rounded-full"></span>
        )}
      </Link>
    );
  };

  const navLinks = user ? (
    <>
      {user.role === 'USER' && (
        <>
          <NavLink to="/" icon={<FiHome />}>Dashboard</NavLink>
          <NavLink to="/products" icon={<FiShoppingBag />}>Products</NavLink>
          <NavLink to="/cart" icon={<FiShoppingCart />} badge={getCartItemCount() > 0 ? getCartItemCount() : null}>
            Cart
          </NavLink>
          <NavLink to="/wishlist" icon={<FiHeart />}>Wishlist</NavLink> {/* Add this line */}
        </>
      )}
      <NavLink to="/orders" icon={<FiPackage />}>Orders</NavLink>
      {user.role === 'SELLER' && (
        <NavLink to="/seller" icon={<FiUser />}>Seller Panel</NavLink>
      )}
      {user.role === 'ADMIN' && (
        <NavLink to="/admin" icon={<FiUser />}>Admin Panel</NavLink>
      )}
    </>
  ) : null;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg shadow-md">
                <FiShoppingBag className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                EcoBazaar
              </span>
              <span className="text-[10px] text-gray-500 font-medium -mt-1">Sustainable Shopping</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks}
            </div>
          )}

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <FiChevronDown className="text-gray-500 sm:hidden" />
                </div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FiUser className="text-gray-500" />
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  >
                    <FiLogOut className="text-gray-500" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col gap-2">
                {user ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-4 mb-3 rounded-lg bg-gray-50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </div>
                    </div>

                    {navLinks}
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiUser className="text-gray-500" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-100"
                      >
                        <FiLogOut className="text-gray-500" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 mt-4">
                    <Link
                      to="/login"
                      className="px-4 py-3 rounded-lg font-medium text-center text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-3 rounded-lg font-medium text-center text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
