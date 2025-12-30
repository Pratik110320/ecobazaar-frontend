// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiShoppingBag, 
  FiUserCheck, 
  FiShoppingCart,
  FiCheck,
  FiTrendingUp,
  FiPackage,
  FiStar
} from 'react-icons/fi';
import { MdEco, MdNature, MdLocalFlorist } from 'react-icons/md';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'USER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    
    if (result.success) {
      navigate('/login', {
        state: { message: 'Registration successful! Please login.' }
      });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const roleInfo = {
    USER: {
      icon: <FiShoppingCart className="w-5 h-5" />,
      title: 'Shopper',
      desc: 'Discover and purchase sustainable products',
      features: ['Access exclusive eco-deals', 'Track carbon footprint', 'Save favorite items']
    },
    SELLER: {
      icon: <FiPackage className="w-5 h-5" />,
      title: 'Seller',
      desc: 'List and manage sustainable products',
      features: ['Analytics dashboard', 'Inventory management', 'Direct customer messaging']
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-xl">
                <MdEco className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                EcoMarket
              </h1>
              <p className="text-sm text-gray-500 font-medium">Sustainable Commerce Platform</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Join the Future of{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Conscious Commerce
                </span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-100/60 -z-0"></span>
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Connect with a community committed to sustainable living. Whether you're shopping mindfully or selling eco-friendly products, make a real impact.
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { 
                icon: <MdNature className="text-emerald-500" />, 
                title: 'Carbon Neutral',
                desc: 'Every purchase contributes to reforestation'
              },
              { 
                icon: <FiTrendingUp className="text-emerald-500" />, 
                title: 'Growth Focused',
                desc: 'Tools to help sustainable businesses thrive'
              },
              { 
                icon: <FiStar className="text-emerald-500" />, 
                title: 'Verified Sellers',
                desc: 'Rigorous sustainability certification process'
              },
              { 
                icon: <MdLocalFlorist className="text-emerald-500" />, 
                title: 'Zero Waste',
                desc: 'Plastic-free packaging for all products'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -2 }}
                className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Background decorative element */}
          <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-emerald-200/20 to-teal-300/10 rounded-full blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            {/* Form header */}
            <div className="relative px-8 pt-8 pb-6 border-b border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h3>
                <p className="text-gray-500">
                  Join thousands making sustainable choices
                </p>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100"
                >
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                      <FiUser />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                      <FiMail />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                      <FiLock />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/50"
                      placeholder="At least 8 characters"
                      required
                    />
                  </div>
                </div>

                {/* Account Type Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['USER', 'SELLER'].map((role) => {
                      const info = roleInfo[role];
                      const isSelected = formData.role === role;
                      return (
                        <motion.label
                          key={role}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-emerald-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={isSelected}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="space-y-3">
                            <div className={`inline-flex p-2 rounded-lg ${
                              isSelected ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {info.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 mb-1">{info.title}</div>
                              <div className="text-xs text-gray-500 mb-3">{info.desc}</div>
                              <ul className="space-y-1">
                                {info.features.map((feature, idx) => (
                                  <li key={idx} className="text-xs text-gray-500 flex items-center gap-1">
                                    <FiCheck className="w-3 h-3 text-emerald-500" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <FiCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </motion.label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FiUserCheck className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1"
                  >
                    Sign in here
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
