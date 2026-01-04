// src/pages/products/Products.jsx
import React, { useState, useEffect } from 'react';
import { productService, categoryService } from '../../services/api';
import ProductCard from '../../components/products/ProductCard';
import ProductFilters from '../../components/products/ProductFilters';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiCheckCircle,
  FiStar,
  FiTag,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minCarbon: '',
    maxCarbon: '',
    featured: '',
    sortBy: 'newest',
    page: 0,
    size: 12,
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const cleanFilters = { ...filters };
      Object.keys(cleanFilters).forEach(key => {
        if (cleanFilters[key] === '' || cleanFilters[key] === null) {
          delete cleanFilters[key];
        }
      });
      if (cleanFilters.category === '') {
        delete cleanFilters.category;
      }

      const response = await productService.search(cleanFilters);
      setProducts(response.data.products || []);
      setPagination({
        currentPage: response.data.currentPage || 0,
        totalPages: response.data.totalPages || 0,
        totalItems: response.data.totalItems || 0,
        hasNext: response.data.hasNext || false,
        hasPrevious: response.data.hasPrevious || false,
      });
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = newFilters => {
    setFilters({ ...newFilters, page: 0 });
  };

  const handlePageChange = newPage => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-4">
            <span className="text-lg">🌱</span>
            <span>Sustainable Products Marketplace</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Eco-Friendly Products
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop sustainable products with transparent carbon footprint tracking. Make
            eco-conscious choices that benefit both you and our planet.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              icon: <FiPackage className="text-xl" />,
              label: 'Products',
              value: pagination.totalItems || 0,
            },
            {
              icon: <FiCheckCircle className="text-xl" />,
              label: 'Verified',
              value: products.filter(p => p.verified).length,
            },
            {
              icon: <FiStar className="text-xl" />,
              label: 'Featured',
              value: products.filter(p => p.featured).length,
            },
            {
              icon: <FiTag className="text-xl" />,
              label: 'Categories',
              value: categories.length,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center hover:shadow-md transition"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ProductFilters
            filters={filters}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
            </div>
            <p className="text-lg text-gray-600 font-medium">
              Discovering eco-friendly products...
            </p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiPackage className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your filters. Try
                    adjusting your search criteria.
                  </p>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        search: '',
                        category: '',
                        minPrice: '',
                        maxPrice: '',
                        minCarbon: '',
                        maxCarbon: '',
                        featured: '',
                        sortBy: 'newest',
                        page: 0,
                        size: 12,
                      })
                    }
                    className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
                  >
                    <FiRefreshCw className="inline mr-2" />
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="text-sm text-gray-600">
                      Showing{' '}
                      <span className="font-semibold text-gray-900">
                        {pagination.currentPage * filters.size + 1}
                      </span>{' '}
                      -{' '}
                      <span className="font-semibold text-gray-900">
                        {Math.min(
                          (pagination.currentPage + 1) * filters.size,
                          pagination.totalItems
                        )}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-gray-900">
                        {pagination.totalItems}
                      </span>{' '}
                      products
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={!pagination.hasPrevious}
                        className="flex items-center px-4 py-2 rounded-lg font-medium text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <FiChevronLeft className="mr-1" />
                        Previous
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(Math.min(pagination.totalPages, 5))].map(
                          (_, i) => {
                            const page =
                              pagination.currentPage > 2
                                ? pagination.currentPage - 2 + i
                                : i;
                            if (page >= pagination.totalPages) return null;
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-lg font-medium text-sm transition ${
                                  pagination.currentPage === page
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {page + 1}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={!pagination.hasNext}
                        className="flex items-center px-4 py-2 rounded-lg font-medium text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Next
                        <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;