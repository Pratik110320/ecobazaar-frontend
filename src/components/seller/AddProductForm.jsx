// src/components/seller/AddProductForm.jsx
import React, { useState } from 'react';
import { productService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AddProductForm = ({ onProductAdded }) => {
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
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageBase64: reader.result.split(',')[1] // Remove data URL prefix
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
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
      
      onProductAdded();
      alert('Product added successfully! It will be available after verification.');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
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
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="carbon-section">
          <h3>Carbon Footprint Data (kg CO₂)</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Manufacturing</label>
              <input
                type="number"
                name="manufacturing"
                value={formData.manufacturing}
                onChange={handleChange}
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Transportation</label>
              <input
                type="number"
                name="transportation"
                value={formData.transportation}
                onChange={handleChange}
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Packaging</label>
              <input
                type="number"
                name="packaging"
                value={formData.packaging}
                onChange={handleChange}
                step="0.1"
                min="0"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Usage</label>
              <input
                type="number"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Disposal</label>
              <input
                type="number"
                name="disposal"
                value={formData.disposal}
                onChange={handleChange}
                step="0.1"
                min="0"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
