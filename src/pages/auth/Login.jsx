// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaLock, 
  FaChartLine, 
  FaRecycle, 
  FaUsers,
  FaLeaf,
  FaGem,
  FaExclamationCircle,
  FaSignInAlt
} from 'react-icons/fa';
import { TbShoppingBag } from 'react-icons/tb';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const features = [
    { 
      icon: <FaChartLine className="text-emerald-500" size={24} />, 
      title: 'Carbon Tracking', 
      desc: 'Monitor your environmental impact in real-time' 
    },
    { 
      icon: <FaRecycle className="text-emerald-600" size={24} />, 
      title: 'Sustainable Products', 
      desc: 'Verified eco-friendly items with transparent sourcing' 
    },
    { 
      icon: <FaUsers className="text-emerald-700" size={24} />, 
      title: 'Green Community', 
      desc: 'Connect with environmentally conscious shoppers' 
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Value Proposition */}
        <motion.div 
          className="hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl shadow-2xl">
                  <FaLeaf className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  EcoBazaar
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1">Sustainable Shopping Platform</p>
              </div>
            </motion.div>

            {/* Hero Section */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Welcome Back to{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Sustainable Shopping
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join our community of eco-conscious consumers making a positive impact through every purchase.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              variants={itemVariants}
            >
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">10K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">50K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">100K+</div>
                <div className="text-sm text-gray-600">Trees Saved</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6">
                <TbShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome Back
              </h3>
              <p className="text-gray-500">
                Sign in to continue your sustainable journey
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl"
              >
                <div className="flex items-center gap-3 text-red-700">
                  <FaExclamationCircle className="flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <FaSignInAlt />
                    Sign In to Your Account
                  </span>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Facebook</span>
                </div>
              </button>
              <button className="py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Google</span>
                </div>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                New to EcoBazaar?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                >
                  Create an account
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <motion.div 
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaGem className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Demo Accounts</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white/50 rounded-lg">
                  <div className="font-medium text-gray-700 mb-1">Admin Account</div>
                  <div className="font-mono text-gray-600">admin@ecobazaar.com</div>
                  <div className="font-mono text-gray-600">admin123</div>
                </div>
                <p className="text-xs text-gray-500 italic">
                  Create seller and user accounts through registration
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
