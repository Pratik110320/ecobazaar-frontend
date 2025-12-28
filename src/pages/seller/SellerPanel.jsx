// src/pages/seller/SellerPanel.jsx - Updated with Tailwind CSS
import React, { useState, useEffect } from 'react';
import { productService, dashboardService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AddProductForm from '../../components/seller/AddProductForm';
import SellerDashboard from '../../components/dashboard/SellerDashboard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SellerPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [sellerDashboardData, setSellerDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    } else if (activeTab === 'dashboard') {
      loadSellerDashboard();
    }
  }, [activeTab]);

  const loadProducts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await productService.getSellerProducts(user.id);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSellerDashboard = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await dashboardService.getSellerDashboard(user.id);
      setSellerDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load seller dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!user || !window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productService.deleteProduct(productId, user.id);
      await loadProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleProductAdded = () => {
    loadProducts();
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🛍️ Seller Panel
          </h1>
          <p className="text-xl text-gray-600">
            Manage your products and track sales
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
                activeTab === 'products' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('products')}
            >
              📦 My Products ({products.length})
            </button>
            <button 
              className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'add' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('add')}
            >
              ➕ Add Product
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'dashboard' && (
            <div>
              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner text="Loading seller dashboard..." />
                </div>
              ) : sellerDashboardData ? (
                <SellerDashboard data={sellerDashboardData} />
              ) : (
                <Card className="text-center py-16">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">No dashboard data available</h3>
                  <p className="text-gray-500">Unable to load seller dashboard data.</p>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                <Button onClick={() => setActiveTab('add')} variant="success">
                  ➕ Add New Product
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner text="Loading your products..." />
                </div>
              ) : (
                <div className="grid gap-6">
                  {products.length === 0 ? (
                    <Card className="text-center py-16">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
                      <p className="text-gray-500 mb-4">Add your first product to start selling</p>
                      <Button onClick={() => setActiveTab('add')} variant="success">
                        Add Your First Product
                      </Button>
                    </Card>
                  ) : (
                    products.map(product => (
                      <Card key={product.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                          {/* Product Image */}
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                            <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Price:</span>
                                <div className="text-green-600 font-semibold">${product.price}</div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Stock:</span>
                                <div className="text-gray-900">{product.quantity}</div>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Carbon:</span>
                                <div className="text-gray-900">{product.carbonFootprint}kg</div>
                              </div>
                              <div>
                                <span className={`font-medium ${
                                  product.verified ? 'text-green-600' : 'text-orange-600'
                                }`}>
                                  {product.verified ? '✅ Verified' : '⏳ Pending'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Button variant="outline" size="small">
                              ✏️ Edit
                            </Button>
                            <Button 
                              onClick={() => handleDeleteProduct(product.id)}
                              variant="danger"
                              size="small"
                            >
                              🗑️ Delete
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

          {activeTab === 'add' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
              <AddProductForm onProductAdded={handleProductAdded} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPanel;
