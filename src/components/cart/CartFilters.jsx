// src/components/cart/CartFilters.jsx - Updated with Tailwind CSS
import React from 'react';
import Button from '../ui/Button';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Cart Items</h3>
        <Button onClick={clearFilters} variant="outline" size="small">
          Clear Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
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
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>

        {/* Carbon Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Carbon Range (kg)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min carbon"
              value={filters.minCarbon || ''}
              onChange={(e) => handleFilterChange('minCarbon', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            <input
              type="number"
              placeholder="Max carbon"
              value={filters.maxCarbon || ''}
              onChange={(e) => handleFilterChange('maxCarbon', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select 
            value={filters.sortBy || ''}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="carbon_asc">Carbon: Low to High</option>
            <option value="carbon_desc">Carbon: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CartFilters;
