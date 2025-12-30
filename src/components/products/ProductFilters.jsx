// src/components/products/ProductFilters.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFilter, 
  FiX, 
  FiSearch, 
  FiTag, 
  FiDollarSign, 
  FiPackage, 
  FiStar, 
  FiRefreshCw,
  FiChevronDown
} from 'react-icons/fi';

const ProductFilters = ({ filters, categories, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
            <FiFilter className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Filter Products</h3>
            <p className="text-sm text-gray-600">Refine your search</p>
          </div>
        </div>
        <button 
          onClick={clearFilters}
          className="px-4 py-2 rounded-lg font-medium text-sm text-gray-700 bg-white border border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-2"
        >
          <FiRefreshCw />
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiTag />
            </div>
            <select 
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
              <FiChevronDown />
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiPackage />
            </div>
            <select 
              value={filters.sortBy || 'newest'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="carbon_asc">Carbon: Low to High</option>
              <option value="carbon_desc">Carbon: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
              <FiChevronDown />
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range ($)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiDollarSign className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div className="flex items-center text-gray-400">−</div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiDollarSign className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Carbon Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Carbon Footprint (kg)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiPackage className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minCarbon || ''}
                onChange={(e) => handleFilterChange('minCarbon', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div className="flex items-center text-gray-400">−</div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiPackage className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxCarbon || ''}
                onChange={(e) => handleFilterChange('maxCarbon', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Featured Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Featured Products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FiStar />
            </div>
            <select 
              value={filters.featured || ''}
              onChange={(e) => handleFilterChange('featured', e.target.value === 'true' ? true : e.target.value === 'false' ? false : '')}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition"
            >
              <option value="">All Products</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
              <FiChevronDown />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.minCarbon || filters.maxCarbon || filters.featured) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                Search: "{filters.search}"
                <button 
                  onClick={() => handleFilterChange('search', '')} 
                  className="hover:text-indigo-900"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                {filters.category}
                <button 
                  onClick={() => handleFilterChange('category', '')} 
                  className="hover:text-emerald-900"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                <button 
                  onClick={() => { 
                    handleFilterChange('minPrice', ''); 
                    handleFilterChange('maxPrice', ''); 
                  }} 
                  className="hover:text-blue-900"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {(filters.minCarbon || filters.maxCarbon) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                {filters.minCarbon || '0'}kg - {filters.maxCarbon || '∞'}kg
                <button 
                  onClick={() => { 
                    handleFilterChange('minCarbon', ''); 
                    handleFilterChange('maxCarbon', ''); 
                  }} 
                  className="hover:text-amber-900"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
            {filters.featured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                {filters.featured === 'true' ? 'Featured' : 'Non-Featured'}
                <button 
                  onClick={() => handleFilterChange('featured', '')} 
                  className="hover:text-purple-900"
                >
                  <FiX className="text-xs" />
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductFilters;