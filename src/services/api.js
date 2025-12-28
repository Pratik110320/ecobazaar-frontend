// src/services/api.js - CORRECTED VERSION (remove userService)
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Authentication Services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getAllowedRoles: () => api.get('/auth/allowed-roles')
};

// Product Services
export const productService = {
  search: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
  create: (productData) => api.post('/products/add', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id, userId) => api.delete(`/products/${id}`, { params: { userId } }),
  toggleFeatured: (id, adminId) => api.put(`/products/${id}/feature`, null, { params: { adminId } }),
  getSellerProducts: (sellerId) => api.get(`/products/seller/${sellerId}`),
  getPendingProducts: () => api.get('/products/admin/pending'),
  verifyProduct: (id, adminId) => api.put(`/products/admin/verify/${id}`, null, { params: { adminId } })
};

// Cart Services
export const cartService = {
  getCart: (userId) => api.get(`/cart/${userId}`),
  getFilteredCart: (userId, filters) => api.get(`/cart/${userId}/filtered`, { params: filters }),
  addItem: (userId, itemData) => api.post(`/cart/${userId}/items`, itemData),
  removeItem: (userId, itemId) => api.delete(`/cart/${userId}/items/${itemId}`)
};

// Order Services
export const orderService = {
  create: (userId, orderData) => api.post(`/orders/${userId}`, orderData),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getById: (orderId) => api.get(`/orders/${orderId}`),
  getAll: () => api.get('/orders/all'),
  updateStatus: (orderId, status) => api.put(`/orders/${orderId}/status`, null, { params: { status } })
};

// Category Services
export const categoryService = {
  getAll: () => api.get('/categories'),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`)
};

// Wishlist Services
export const wishlistService = {
  getUserWishlist: (userId) => api.get(`/wishlist/${userId}`),
  addToWishlist: (userId, productId) => api.post(`/wishlist/${userId}`, { productId }),
  removeFromWishlist: (userId, productId) => api.delete(`/wishlist/${userId}/${productId}`),
  checkWishlist: (userId, productId) => api.get(`/wishlist/${userId}/check/${productId}`)
};

// Review Services
export const reviewService = {
  addReview: (reviewData) => api.post('/reviews', reviewData),
  getProductReviews: (productId) => api.get(`/reviews/product/${productId}`),
  getUserReviews: (userId) => api.get(`/reviews/user/${userId}`),
  deleteReview: (id, userId) => api.delete(`/reviews/${id}`, { params: { userId } })
};

// Dashboard Services
export const dashboardService = {
  getUserDashboard: (userId) => api.get(`/dashboard/user/${userId}`),
  getUserStats: (userId) => api.get(`/dashboard/user/${userId}/stats`),
  getUserAchievements: (userId) => api.get(`/dashboard/user/${userId}/achievements`),
  getUserCarbonTips: (userId) => api.get(`/dashboard/user/${userId}/tips`),
  getUserCarbonTrend: (userId) => api.get(`/dashboard/user/${userId}/carbon-trend`),
  getUserCategoryBreakdown: (userId) => api.get(`/dashboard/user/${userId}/category-breakdown`),
  getUserEcoRatingDistribution: (userId) => api.get(`/dashboard/user/${userId}/eco-rating-distribution`),
  getUserRecentOrders: (userId, limit = 10) => api.get(`/dashboard/user/${userId}/recent-orders`, { params: { limit } }),
  
  getSellerDashboard: (sellerId) => api.get(`/dashboard/seller/${sellerId}`),
  getSellerStats: (sellerId) => api.get(`/dashboard/seller/${sellerId}/stats`),
  getSellerTopProducts: (sellerId, limit = 5) => api.get(`/dashboard/seller/${sellerId}/top-products`, { params: { limit } }),
  getSalesByCategory: (sellerId) => api.get(`/dashboard/seller/${sellerId}/sales-by-category`),
  getRevenueBreakdown: (sellerId) => api.get(`/dashboard/seller/${sellerId}/revenue-breakdown`),
  
  getAdminDashboard: () => api.get('/dashboard/admin'),
  getPlatformStats: () => api.get('/dashboard/admin/platform-stats'),
  getPendingVerifications: () => api.get('/dashboard/admin/pending-verifications'),
  getTopSellers: (limit = 10) => api.get('/dashboard/admin/top-sellers', { params: { limit } }),
  getRecentActivities: (limit = 10) => api.get('/dashboard/admin/recent-activities', { params: { limit } }),
  getCarbonImpact: () => api.get('/dashboard/admin/carbon-impact'),
  getUserRoleDistribution: () => api.get('/dashboard/admin/user-role-distribution')
};

// Carbon Analytics Services
export const carbonService = {
  getUserCarbonReport: (userId) => api.get(`/carbon/report/${userId}`),
  getPlatformSummary: () => api.get('/carbon/admin/summary')
};

export default api;
