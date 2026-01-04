// src/components/seller/AddProductForm.jsx
import React, { useState, useEffect } from 'react';
import { productService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FiUpload, FiPackage, FiTruck, FiUser, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const AddProductForm = ({ onProductAdded, editingProduct, onUpdateProduct, showEditForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '1',
    category: '',
    imageBase64: '',
    manufacturing: '0',
    transportation: '0',
    packaging: '0',
    usage: '0',
    disposal: '0'
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (editingProduct && showEditForm) {
      const {
        name, description, price, quantity, category, imageUrl,
        manufacturing, transportation, packaging, usage, disposal
      } = editingProduct;
      
      setFormData({
        name: name || '',
        description: description || '',
        price: price || '',
        quantity: quantity || '1',
        category: category || '',
        imageBase64: '',
        manufacturing: manufacturing || '0',
        transportation: transportation || '0',
        packaging: packaging || '0',
        usage: usage || '0',
        disposal: disposal || '0'
      });
      
      setImagePreview(imageUrl || null);
    } else if (!editingProduct) {
      // Reset form when not editing
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '1',
        category: '',
        imageBase64: '',
        manufacturing: '0',
        transportation: '0',
        packaging: '0',
        usage: '0',
        disposal: '0'
      });
      setImagePreview(null);
    }
  }, [editingProduct, showEditForm]);

  const categories = [
    "Clothing & Apparel",
    "Home & Kitchen",
    "Electronics",
    "Beauty & Personal Care",
    "Food & Beverages",
    "Books & Stationery",
    "Fitness & Sports",
    "Toys & Games"
  ];

  const carbonSections = [
    { id: 'manufacturing', label: 'Manufacturing', icon: <FiPackage /> },
    { id: 'transportation', label: 'Transportation', icon: <FiTruck /> },
    { id: 'packaging', label: 'Packaging', icon: <FiPackage /> },
    { id: 'usage', label: 'Usage', icon: <FiUser /> },
    { id: 'disposal', label: 'Disposal', icon: <FiTrash2 /> }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.quantity || parseInt(formData.quantity) <= 0) newErrors.quantity = 'Valid quantity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, image: 'Please upload an image file' }));
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 2MB' }));
        return;
      }
      
      // Clear any previous image errors
      if (errors.image) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          imageBase64: reader.result.split(',')[1] // Remove data URL prefix
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      imageBase64: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (editingProduct) {
        // Update existing product
        await onUpdateProduct({
          ...formData
        });
      } else {
        // Create new product
        await productService.create({
          userId: user.id,
          ...formData
        });
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: '1',
          category: '',
          imageBase64: '',
          manufacturing: '0',
          transportation: '0',
          packaging: '0',
          usage: '0',
          disposal: '0'
        });
        setImagePreview(null);
        
        onProductAdded();
        
        // Show success message
        alert('Product added successfully! It will be available after verification.');
      }
    } catch (error) {
      alert(error.response?.data?.error || (editingProduct ? 'Failed to update product' : 'Failed to add product'));
    } finally {
      setLoading(false);
    }
  };

  const totalCarbon = Object.values(carbonSections).reduce((sum, section) => {
    return sum + parseFloat(formData[section.id] || 0);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="bg-white p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
              <FaLeaf className="text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-gray-700">
                {editingProduct 
                  ? 'Update your product details' 
                  : 'Fill in the details to list your eco-friendly product'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm mr-2">1</span>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your product in detail..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm mr-2">2</span>
                Pricing & Inventory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      errors.quantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1"
                  />
                  {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm mr-2">3</span>
                Product Image
              </h3>
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 transition hover:border-emerald-400">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-60 rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <FiUpload className="mx-auto text-gray-500 text-3xl mb-3" />
                    <p className="text-gray-700 mb-1">Upload a product image</p>
                    <p className="text-sm text-gray-600">PNG, JPG up to 2MB</p>
                  </div>
                )}
                
                <label className="mt-4 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition inline-flex items-center">
                    <FiUpload className="mr-2" /> {imagePreview ? 'Change Image' : 'Upload Image'}
                  </span>
                </label>
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
              </div>
            </div>

            {/* Carbon Footprint */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm mr-2">4</span>
                  Carbon Footprint (kg CO₂)
                </h3>
                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FaLeaf className="mr-1" /> Total: {totalCarbon.toFixed(1)} kg
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {carbonSections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <span className="mr-2 text-emerald-600">{section.icon}</span>
                      {section.label}
                    </label>
                    <input
                      type="number"
                      name={section.id}
                      value={formData[section.id]}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-700">
                <p>Provide estimated carbon footprint for each lifecycle stage of your product.</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingProduct ? 'Updating Product...' : 'Adding Product...'}
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="mr-2" /> 
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
