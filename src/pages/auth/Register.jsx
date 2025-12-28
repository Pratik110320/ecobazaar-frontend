// src/pages/auth/Register.jsx - Redesigned
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'USER'
  });
  const [allowedRoles, setAllowedRoles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllowedRoles = async () => {
      try {
        const response = await authService.getAllowedRoles();
        setAllowedRoles(response.data.allowedRoles);
      } catch (error) {
        console.error('Failed to fetch allowed roles:', error);
      }
    };
    
    fetchAllowedRoles();
  }, []);

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
      icon: '🛍️',
      title: 'Shopper',
      desc: 'Browse and shop eco-friendly products',
      color: 'from-blue-500 to-cyan-500'
    },
    SELLER: {
      icon: '🏪',
      title: 'Seller',
      desc: 'List and sell sustainable products',
      color: 'from-eco-500 to-leaf-500'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block animate-fade-in">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-eco-500 rounded-2xl blur-xl opacity-50 animate-pulse-eco"></div>
                <div className="relative bg-gradient-to-br from-primary-500 to-eco-600 p-4 rounded-2xl shadow-large">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold text-gradient-eco">
                  EcoBazaar
                </h1>
                <p className="text-sm text-gray-500 font-medium">Sustainable Shopping Platform</p>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Start Your{' '}
              <span className="text-gradient-eco">Eco-Friendly Journey</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Join our community of conscious consumers and sustainable sellers making a difference.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { number: '10K+', label: 'Eco Products' },
                { number: '5K+', label: 'Happy Users' },
                { number: '2M kg', label: 'Carbon Saved' },
                { number: '500+', label: 'Sellers' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/50 border border-primary-100 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl font-bold text-gradient-eco">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="animate-scale-in">
          <div className="bg-white rounded-3xl shadow-large p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                Create Account
              </h3>
              <p className="text-gray-600">
                Join the sustainable shopping revolution
              </p>
            </div>

            {error && (
              <div className="alert-error mb-6 animate-slide-down">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-modern pl-12"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-modern pl-12"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-modern pl-12"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {allowedRoles.map(role => {
                    const info = roleInfo[role];
                    return (
                      <label
                        key={role}
                        className={`relative cursor-pointer ${
                          formData.role === role ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.role === role}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-xl border-2 transition-all ${
                          formData.role === role
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 bg-white hover:border-primary-300'
                        }`}>
                          <div className="text-3xl mb-2">{info.icon}</div>
                          <div className="font-semibold text-gray-900 mb-1">{info.title}</div>
                          <div className="text-xs text-gray-600">{info.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-eco w-full !text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="spinner !w-5 !h-5 !border-2 !border-white/30 !border-t-white"></div>
                    Creating your account...
                  </span>
                ) : (
                  'Create Your Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;