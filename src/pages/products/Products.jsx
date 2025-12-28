// src/pages/products/Products.jsx - Updated with Tailwind CSS
import React, { useState, useEffect } from 'react';
import { productService, categoryService } from '../../services/api';
import ProductCard from '../../components/products/ProductCard';
import ProductFilters from '../../components/products/ProductFilters';
import Button from '../../components/ui/Button';

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🌱 Eco-Friendly Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover sustainable products with carbon footprint tracking. 
            Make eco-conscious choices that benefit both you and the planet.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 animate-slide-up">
          <ProductFilters 
            filters={filters}
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-eco-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading eco-friendly products...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button 
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
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button 
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={!pagination.hasPrevious}
                  variant="outline"
                  size="small"
                >
                  ← Previous
                </Button>
                
                <span className="text-gray-700 font-medium">
                  Page {pagination.currentPage + 1} of {pagination.totalPages}
                </span>
                
                <Button 
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={!pagination.hasNext}
                  variant="outline"
                  size="small"
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
