// src/pages/products/Products.jsx - Redesigned
import React, { useState, useEffect } from 'react';
import { productService, categoryService } from '../../services/api';
import ProductCard from '../../components/products/ProductCard';
import ProductFilters from '../../components/products/ProductFilters';

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
    size: 12
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
        hasPrevious: response.data.hasPrevious || false
      });
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, page: 0 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper">
      <div className="container-modern">
        {/* Hero Section */}
        <div className="section-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-100 text-eco-700 font-semibold text-sm mb-4 animate-fade-in">
            <span className="text-lg">🌱</span>
            <span>Sustainable Products Marketplace</span>
          </div>
          
          <h1 className="section-title">
            Discover Eco-Friendly Products
          </h1>
          
          <p className="section-subtitle">
            Shop sustainable products with transparent carbon footprint tracking. 
            Make eco-conscious choices that benefit both you and our planet.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {[
            { icon: '📦', label: 'Products', value: pagination.totalItems || 0 },
            { icon: '✅', label: 'Verified', value: products.filter(p => p.verified).length },
            { icon: '⭐', label: 'Featured', value: products.filter(p => p.featured).length },
            { icon: '🌍', label: 'Categories', value: categories.length },
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-card-modern text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <ProductFilters 
            filters={filters}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-eco-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative spinner !w-16 !h-16 !border-4"></div>
            </div>
            <p className="text-lg text-gray-600 font-medium">
              Discovering eco-friendly products...
            </p>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="card-modern text-center py-20 animate-scale-in">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-eco-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your filters. Try adjusting your search criteria.
                  </p>
                  <button 
                    onClick={() => handleFilterChange({
                      search: '',
                      category: '',
                      minPrice: '',
                      maxPrice: '',
                      minCarbon: '',
                      maxCarbon: '',
                      featured: '',
                      sortBy: 'newest',
                      page: 0,
                      size: 12
                    })}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="card-modern p-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing{' '}
                      <span className="font-semibold text-gray-900">
                        {pagination.currentPage * filters.size + 1}
                      </span>
                      {' '}-{' '}
                      <span className="font-semibold text-gray-900">
                        {Math.min((pagination.currentPage + 1) * filters.size, pagination.totalItems)}
                      </span>
                      {' '}of{' '}
                      <span className="font-semibold text-gray-900">
                        {pagination.totalItems}
                      </span>
                      {' '}products
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={!pagination.hasPrevious}
                        className="px-4 py-2 rounded-xl font-medium text-sm text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        ← Previous
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => {
                          const page = pagination.currentPage > 2 
                            ? pagination.currentPage - 2 + i 
                            : i;
                          
                          if (page >= pagination.totalPages) return null;
                          
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-xl font-medium text-sm transition-all ${
                                pagination.currentPage === page
                                  ? 'bg-gradient-to-r from-primary-600 to-eco-600 text-white shadow-medium'
                                  : 'text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                              }`}
                            >
                              {page + 1}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button 
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 rounded-xl font-medium text-sm text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
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