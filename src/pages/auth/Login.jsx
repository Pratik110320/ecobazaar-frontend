// src/pages/auth/Login.jsx - Redesigned
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
              Welcome Back to a{' '}
              <span className="text-gradient-eco">Greener Future</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of eco-conscious shoppers making sustainable choices every day.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: '🌱', title: 'Carbon Tracking', desc: 'Monitor your environmental impact' },
                { icon: '♻️', title: 'Sustainable Products', desc: 'Verified eco-friendly items' },
                { icon: '💚', title: 'Green Community', desc: 'Connect with like-minded shoppers' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-primary-100 animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="animate-scale-in">
          <div className="bg-white rounded-3xl shadow-large p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
                Sign In
              </h3>
              <p className="text-gray-600">
                Enter your credentials to access your account
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="spinner !w-5 !h-5 !border-2"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In to Your Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-eco-50 border border-primary-100">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🔑</span>
                Demo Accounts
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-700">Admin:</span>
                  <span className="text-gray-600">admin@ecobazaar.com / admin123</span>
                </div>
                <p className="text-xs text-gray-500 italic">
                  Create Seller and User accounts via registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;