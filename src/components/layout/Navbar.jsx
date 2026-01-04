// src/components/layout/Navbar.jsx - FIXED IMPORT
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
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
  FiHeart,
  FiAward, // ADDED MISSING IMPORT
  FiBarChart2 // ADDED MISSING IMPORT FOR CARBON REPORT
} from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getCartItemCount = () => cart?.items?.length || 0;
  const isActiveLink = (path) => location.pathname === path;

  const NavLink = ({ to, icon, children, badge }) => {
    const active = isActiveLink(to);
    return (
      <motion.div whileHover={{ scale: 1.03 }} className="relative">
        <Link
          to={to}
          onClick={() => {
            setMobileMenuOpen(false);
            setProfileMenuOpen(false);
          }}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            active
              ? "text-emerald-700 bg-white shadow-sm"
              : "text-slate-600 hover:text-emerald-700 hover:bg-white/70"
          }`}
        >
          <span className="text-lg">{icon}</span>
          {children}
          {badge && (
            <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {badge}
            </span>
          )}
        </Link>
      </motion.div>
    );
  };

  const renderNavLinks = () => {
    if (!user) return null;

    switch (user.role) {
      case "USER":
        return (
          <>
            <NavLink to="/dashboard" icon={<FiHome />}>
              Dashboard
            </NavLink>
            <NavLink to="/products" icon={<FiShoppingBag />}>
              Products
            </NavLink>
            <NavLink
              to="/cart"
              icon={<FiShoppingCart />}
              badge={getCartItemCount() > 0 ? getCartItemCount() : null}
            >
              Cart
            </NavLink>
            <NavLink to="/wishlist" icon={<FiHeart />}>
              Wishlist
            </NavLink>
            <NavLink to="/orders" icon={<FiPackage />}>
              Orders
            </NavLink>
            <NavLink to="/community/leaderboard" icon={<FiAward />}>
              Leaderboard
            </NavLink>
            <NavLink to="/carbon-report" icon={<FiBarChart2 />}>
              Carbon Report
            </NavLink>
          </>
        );
      case "SELLER":
        return (
          <>
            <NavLink to="/orders" icon={<FiPackage />}>
              Orders
            </NavLink>
            <NavLink to="/seller" icon={<FiShoppingBag />}>
              Seller Panel
            </NavLink>
          </>
        );
      case "ADMIN":
        return (
          <>
            <NavLink to="/orders" icon={<FiPackage />}>
              Orders
            </NavLink>
            <NavLink to="/admin" icon={<FiUser />}>
              Admin Panel
            </NavLink>
            <NavLink to="/admin/categories" icon={<FiShoppingBag />}>
              Categories
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-emerald-100 shadow-[0_2px_30px_rgba(0,0,0,0.04)]"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#A8E6CF22,#56CFE122)]" />

      <div className="relative max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-cyan-300 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition" />
            <div className="relative w-12 h-12 bg-white border border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
              <FiShoppingBag className="text-emerald-600 text-2xl" />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
              EcoBazaar
            </span>
            <span className="text-[11px] text-slate-500 -mt-1">
              Sustainable Future
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-2">{renderNavLinks()}</div>
        )}

        {/* Auth/Profile Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white border border-emerald-100 rounded-xl text-slate-700 shadow-sm transition-all"
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{user.fullName}</span>
                  <span className="text-xs text-emerald-500">{user.role}</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <FiChevronDown
                  className={`transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-lg border border-emerald-100 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 transition"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-slate-700 hover:bg-rose-50 transition"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-emerald-100 rounded-xl transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-semibold rounded-xl hover:brightness-110 shadow-md transition-all"
              >
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-emerald-50 border border-emerald-100"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/80 backdrop-blur-2xl border-t border-emerald-100 shadow-inner"
          >
            <div className="px-4 py-6 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-100 shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium">{user.fullName}</p>
                      <p className="text-emerald-500 text-sm">{user.role}</p>
                    </div>
                  </div>

                  {renderNavLinks()}

                  <div className="pt-3 border-t border-emerald-100 space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-slate-700 rounded-xl hover:bg-emerald-50 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 w-full text-slate-700 rounded-xl hover:bg-rose-50 transition"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-5 py-3 text-center text-slate-700 border border-emerald-100 rounded-xl hover:bg-emerald-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-5 py-3 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-semibold rounded-xl shadow-md hover:brightness-110"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
