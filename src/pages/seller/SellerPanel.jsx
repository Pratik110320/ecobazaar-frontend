// src/pages/seller/SellerPanel.jsx
import React, { useState, useEffect } from 'react';
import { productService, dashboardService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AddProductForm from '../../components/seller/AddProductForm';
import SellerDashboard from '../../components/dashboard/SellerDashboard';
import { FiGrid, FiPackage, FiPlus, FiEdit, FiCheckCircle, FiClock, FiTrendingUp, FiDollarSign, FiShoppingBag, FiUsers, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SellerPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [sellerDashboardData, setSellerDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

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

  const handleProductAdded = () => {
    loadProducts();
    setActiveTab('products');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
    setActiveTab('add');
  };

  const handleUpdateProduct = async (updatedProductData) => {
    if (!user || !editingProduct) return;
    
    try {
      await productService.update(editingProduct.id, {
        userId: user.id,
        ...updatedProductData
      });
      
      await loadProducts();
      setShowEditForm(false);
      setEditingProduct(null);
      setActiveTab('products');
      alert('Product updated successfully!');
    } catch (error) {
      alert('Failed to update product: ' + (error.response?.data?.error || error.message));
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { id: 'products', label: 'Products', icon: <FiPackage />, count: products.length },
    { id: 'add', label: 'Add Product', icon: <FiPlus /> }
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 text-white mb-6 shadow-lg shadow-emerald-200"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FiTrendingUp className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent mb-3">
            Seller Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage your sustainable products and track business performance with real-time analytics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <FiDollarSign className="text-2xl" />
                </div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  +12.5%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">${sellerDashboardData?.stats?.totalRevenue?.toLocaleString() || '0'}</h3>
              <p className="text-gray-500 text-sm">Total Revenue</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <FiShoppingBag className="text-2xl" />
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  +8.2%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{sellerDashboardData?.stats?.totalSales || '0'}</h3>
              <p className="text-gray-500 text-sm">Total Sales</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <FiUsers className="text-2xl" />
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  +5.3%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{products.length}</h3>
              <p className="text-gray-500 text-sm">Active Products</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          {/* Tabs */}
          <div className="border-b border-gray-100">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 py-5 px-6 text-center font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-3 ${
                    activeTab === tab.id
                      ? 'text-emerald-600 border-b-2 border-emerald-500 bg-gradient-to-b from-emerald-50/50 to-transparent'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={`text-lg ${activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {tab.icon}
                  </span>
                  <span className="font-semibold">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && (
                  <div>
                    {loading ? (
                      <div className="flex justify-center py-20">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-emerald-500 border-t-transparent mx-auto mb-4"></div>
                          <p className="text-gray-600 font-medium">Loading dashboard data...</p>
                        </div>
                      </div>
                    ) : sellerDashboardData ? (
                      <SellerDashboard data={sellerDashboardData} />
                    ) : (
                      <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-6">
                          <FiGrid className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-3">Dashboard Unavailable</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Unable to load seller dashboard data at this moment.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'products' && (
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                        <p className="text-gray-600">Manage your sustainable product portfolio</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('add')}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold shadow-md shadow-emerald-200"
                      >
                        <FiPlus className="mr-2" /> Add New Product
                      </motion.button>
                    </div>

                    {loading ? (
                      <div className="flex justify-center py-16">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-emerald-500 border-t-transparent mx-auto mb-4"></div>
                          <p className="text-gray-600 font-medium">Loading products...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {products.length === 0 ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center"
                          >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 mb-6">
                              <FiPackage className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Products Yet</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start your sustainable business by adding your first eco-friendly product</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveTab('add')}
                              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold shadow-md shadow-emerald-200"
                            >
                              Add Your First Product
                            </motion.button>
                          </motion.div>
                        ) : (
                          <div className="grid gap-5">
                            {products.map((product, index) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group overflow-hidden"
                              >
                                <div className="p-6">
                                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                      {product.imageUrl ? (
                                        <div className="relative">
                                          <img 
                                            src={product.imageUrl} 
                                            alt={product.name}
                                            className="w-28 h-28 object-cover rounded-xl border-2 border-gray-100 group-hover:border-emerald-200 transition-colors"
                                          />
                                          <div className={`absolute -top-2 -right-2 flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                            product.verified 
                                              ? 'bg-emerald-100 text-emerald-800' 
                                              : 'bg-amber-100 text-amber-800'
                                          }`}>
                                            {product.verified ? (
                                              <>
                                                <FiCheckCircle className="mr-1.5" /> Verified
                                              </>
                                            ) : (
                                              <>
                                                <FiClock className="mr-1.5" /> Pending
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-100">
                                          <FiPackage className="text-gray-400 text-3xl" />
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="mb-4 md:mb-0">
                                          <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                                            {product.description}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 rounded-xl p-4">
                                          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Price</p>
                                          <p className="font-bold text-2xl text-emerald-700">${product.price}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-4">
                                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Stock</p>
                                          <p className="font-bold text-2xl text-gray-900">{product.quantity}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-50 to-green-50/50 rounded-xl p-4">
                                          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Carbon</p>
                                          <p className="font-bold text-2xl text-gray-900">{product.carbonFootprint}kg</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-4">
                                          <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Category</p>
                                          <p className="font-bold text-gray-900">{product.category}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 pt-4 lg:pt-0">
                                      <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleEditProduct(product)}
                                        className="p-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                      >
                                        <FiEdit className="text-xl" />
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'add' && (
                  <div>
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                          </h2>
                          <p className="text-gray-600">
                            {editingProduct 
                              ? 'Update your product details' 
                              : 'List a new sustainable product to expand your eco-friendly catalog'}
                          </p>
                        </div>
                        {editingProduct && (
                          <button
                            onClick={() => {
                              setEditingProduct(null);
                              setShowEditForm(false);
                            }}
                            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
                          >
                            <FiX className="text-2xl" />
                          </button>
                        )}
                      </div>
                    </div>
                    <AddProductForm 
                      onProductAdded={handleProductAdded}
                      editingProduct={editingProduct}
                      onUpdateProduct={handleUpdateProduct}
                      showEditForm={showEditForm}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>Last updated: {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerPanel;
