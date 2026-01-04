// src/pages/admin/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { productService, dashboardService } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import { motion } from "framer-motion";

/* ---------- React‑Icons ---------- */
import {
  FiBarChart2,
  FiClock,
  FiRefreshCw,
  FiCheck,
  FiX,
  FiUserCheck,
  FiAlertCircle,
  FiPackage,
  FiGlobe,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiBell,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiMail,
  FiMessageSquare,
  FiFileText,
  FiCalendar,
  FiTrash2,
  FiFolder
} from "react-icons/fi";

/* ---------- Modern Tab Component ---------- */
const TabButton = ({ active, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`
      relative flex-1 py-4 px-4 text-center font-medium transition-all duration-300 flex items-center justify-center space-x-2
      ${active
        ? "text-emerald-600"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
    `}
  >
    <span>{children}</span>
    {count !== undefined && count > 0 && (
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
        active ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-700"
      }`}>
        {count}
      </span>
    )}
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
      />
    )}
  </button>
);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingProducts, setPendingProducts] = useState([]);
  const [adminDashboardData, setAdminDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Updated tabs array - removed categories since we have separate page
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
    { id: 'verifications', label: 'Verifications', icon: <FiClock />, count: pendingProducts.length },
    { id: 'users', label: 'Users', icon: <FiUsers /> },
    { id: 'reports', label: 'Reports', icon: <FiFileText /> },
  ];

  /* ---------- Load data when tab changes ---------- */
  useEffect(() => {
    if (activeTab === "verifications") loadPendingProducts();
    else if (activeTab === "dashboard") loadAdminDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadPendingProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productService.getPendingProducts();
      setPendingProducts(data);
    } catch (err) {
      console.error("Failed to load pending products:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadAdminDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await dashboardService.getAdminDashboard();
      setAdminDashboardData(data);
    } catch (err) {
      console.error("Failed to load admin dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProduct = async (productId) => {
    if (!user) return;
    try {
      await productService.verifyProduct(productId, user.id);
      await loadPendingProducts();
    } catch (err) {
      alert(
        "Failed to verify product: " +
          (err.response?.data?.error || err.message)
      );
    }
  };

  const handleRejectProduct = async (productId) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to reject this product?"))
      return;
    try {
      // Reject endpoint implementation
      await loadPendingProducts();
    } catch {
      alert("Failed to reject product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await productService.delete(productId, user.id);
      await loadPendingProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-2xl">
            {/* Search bar can be added here if needed */}
          </div>
          <div className="flex items-center space-x-3">
            {/* Additional buttons can be added here */}
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden"
      >
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              count={tab.count}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabButton>
          ))}
        </div>
      </motion.div>

      {/* Tab content */}
      <div className="space-y-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading dashboard data...</p>
                </div>
              </div>
            ) : adminDashboardData ? (
              <AdminDashboard 
                data={adminDashboardData} 
                onRefresh={loadAdminDashboard}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <FiAlertCircle className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No dashboard data available
                </h3>
                <p className="text-gray-500 mb-6">
                  Unable to load dashboard data from the server.
                </p>
                <button
                  onClick={loadAdminDashboard}
                  className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition font-medium"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Verifications Tab */}
        {activeTab === "verifications" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Product Verifications
                </h2>
                <p className="text-gray-600">
                  Review and approve new product submissions
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading verifications...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 mb-4">
                      <FiCheck className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      All caught up!
                    </h3>
                    <p className="text-gray-500">
                      No pending product verifications at the moment.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid gap-6">
                    {pendingProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 * index }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Product info */}
                            <div className="lg:col-span-2">
                              <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <div className="flex-shrink-0">
                                  {product.imageUrl ? (
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                      className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-lg"
                                    />
                                  ) : (
                                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                                      <FiPackage className="text-emerald-500 text-3xl" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="text-xl font-bold text-gray-900">
                                      {product.name}
                                    </h4>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-bold rounded-full">
                                      Pending
                                    </span>
                                  </div>
                                  <p className="text-gray-600 mb-6 line-clamp-2">
                                    {product.description}
                                  </p>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                                      <p className="text-xs text-gray-500 uppercase mb-1">Seller</p>
                                      <p className="font-semibold text-gray-900">{product.sellerName}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 border border-emerald-100">
                                      <p className="text-xs text-gray-500 uppercase mb-1">Price</p>
                                      <p className="font-bold text-emerald-600">${product.price}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-4 border border-amber-100">
                                      <p className="text-xs text-gray-500 uppercase mb-1">Carbon</p>
                                      <p className="font-bold text-amber-600">{product.carbonFootprint}kg</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                                      <p className="text-xs text-gray-500 uppercase mb-1">Category</p>
                                      <p className="font-semibold text-gray-900">{product.category}</p>
                                    </div>
                                  </div>

                                  <div className="mt-6 flex items-center text-sm text-gray-500">
                                    <FiCalendar className="mr-2" />
                                    Submitted:{" "}
                                    {new Date(product.createdAt).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric',
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col space-y-3 lg:ml-4 pt-4 lg:pt-0">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleVerifyProduct(product.id)}
                                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all font-medium shadow-lg shadow-emerald-500/25"
                              >
                                <FiCheck className="mr-2" />
                                Approve Product
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleRejectProduct(product.id)}
                                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-200 transition-all font-medium"
                              >
                                <FiX className="mr-2" />
                                Request Changes
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDeleteProduct(product.id)}
                                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 border border-rose-200 rounded-xl hover:bg-rose-200 transition-all font-medium"
                              >
                                <FiTrash2 className="mr-2" />
                                Delete Product
                              </motion.button>
                              <button className="text-sm text-gray-500 hover:text-gray-700 text-center pt-2">
                                View full details →
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-6">
              <FiUsers className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">User Management</h3>
            <p className="text-gray-500">
              User management features coming soon...
            </p>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-6">
              <FiFileText className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Reports</h3>
            <p className="text-gray-500">
              Advanced reporting features coming soon...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
