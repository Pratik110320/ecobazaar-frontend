// src/pages/admin/AdminPanel.jsx - Updated with Tailwind CSS
import React, { useState, useEffect } from 'react';
import { productService, dashboardService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from '../../components/dashboard/AdminDashboard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingProducts, setPendingProducts] = useState([]);
  const [adminDashboardData, setAdminDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (activeTab === 'verifications') {
      loadPendingProducts();
    } else if (activeTab === 'dashboard') {
      loadAdminDashboard();
    }
  }, [activeTab]);

  const loadPendingProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getPendingProducts();
      setPendingProducts(response.data);
    } catch (error) {
      console.error('Failed to load pending products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAdminDashboard = async () => {
    setLoading(true);
    try {
      const response = await dashboardService.getAdminDashboard();
      setAdminDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load admin dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProduct = async (productId) => {
    if (!user) return;
    
    try {
      await productService.verifyProduct(productId, user.id);
      await loadPendingProducts();
      alert('Product verified successfully!');
    } catch (error) {
      alert('Failed to verify product: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleRejectProduct = async (productId) => {
    if (!user || !window.confirm('Are you sure you want to reject this product?')) return;
    
    try {
      // This would typically call a reject endpoint
      alert('Product rejected. (Rejection functionality would be implemented here)');
    } catch (error) {
      alert('Failed to reject product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            👑 Admin Panel
          </h1>
          <p className="text-xl text-gray-600">
            Platform management and oversight
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'dashboard' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'verifications' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('verifications')}
            >
              ⏳ Verifications ({pendingProducts.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'dashboard' && (
            <div>
              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner text="Loading admin dashboard..." />
                </div>
              ) : adminDashboardData ? (
                <AdminDashboard data={adminDashboardData} />
              ) : (
                <Card className="text-center py-16">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No dashboard data available</h3>
                  <p className="text-gray-500">Unable to load admin dashboard data.</p>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'verifications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Pending Product Verifications</h2>
                <Button onClick={loadPendingProducts} variant="outline">
                  🔄 Refresh
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner text="Loading pending verifications..." />
                </div>
              ) : (
                <div className="grid gap-6">
                  {pendingProducts.length === 0 ? (
                    <Card className="text-center py-16">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2">No pending verifications</h3>
                      <p className="text-gray-500">All products are currently verified.</p>
                    </Card>
                  ) : (
                    pendingProducts.map(product => (
                      <Card key={product.id} className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Product Info */}
                          <div className="lg:col-span-2">
                            <div className="flex items-start space-x-4">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                                <p className="text-gray-600 mb-3">{product.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-600">Seller:</span>
                                    <div className="text-gray-900">{product.sellerName}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-600">Price:</span>
                                    <div className="text-green-600 font-semibold">${product.price}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-600">Carbon:</span>
                                    <div className="text-gray-900">{product.carbonFootprint}kg</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-600">Category:</span>
                                    <div className="text-gray-900">{product.category}</div>
                                  </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  Submitted: {new Date(product.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Verification Actions */}
                          <div className="flex flex-col space-y-3">
                            <Button 
                              onClick={() => handleVerifyProduct(product.id)}
                              variant="success"
                              className="w-full"
                            >
                              ✅ Verify Product
                            </Button>
                            <Button 
                              onClick={() => handleRejectProduct(product.id)}
                              variant="danger"
                              className="w-full"
                            >
                              ❌ Request Changes
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
