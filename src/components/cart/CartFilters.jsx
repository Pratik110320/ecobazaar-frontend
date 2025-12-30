// src/components/cart/CartFilters.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFilter, 
  FiX, 
  FiDollarSign, 
  FiPackage, 
  FiTag,
  FiRefreshCw,
  FiChevronDown
} from 'react-icons/fi';

const CartFilters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      minCarbon: '',
      maxCarbon: '',
      sortBy: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
            <FiFilter className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Filter Cart Items</h3>
            <p className="text-sm text-gray-700">Refine your cart selection</p>
          </div>
        </div>
        <button 
          onClick={clearFilters}
          className="px-4 py-2 rounded-lg font-medium text-sm text-gray-700 bg-white border border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 transition-all flex items-center gap-2"
        >
          <FiRefreshCw />
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <FiTag />
            </div>
            <select 
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none cursor-pointer transition"
            >
              <option value="">All Categories</option>
              <option value="Clothing & Apparel">Clothing & Apparel</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Books & Stationery">Books & Stationery</option>
              <option value="Fitness & Sports">Fitness & Sports</option>
              <option value="Toys & Games">Toys & Games</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
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
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiDollarSign className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
            <div className="flex items-center text-gray-500">−</div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiDollarSign className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Carbon Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Carbon Range (kg)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiPackage className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minCarbon || ''}
                onChange={(e) => handleFilterChange('minCarbon', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
            <div className="flex items-center text-gray-500">−</div>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FiPackage className="text-sm" />
              </div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxCarbon || ''}
                onChange={(e) => handleFilterChange('maxCarbon', e.target.value)}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <FiPackage />
            </div>
            <select 
              value={filters.sortBy || ''}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none cursor-pointer transition"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="carbon_asc">Carbon: Low to High</option>
              <option value="carbon_desc">Carbon: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
              <FiChevronDown />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartFilters;
