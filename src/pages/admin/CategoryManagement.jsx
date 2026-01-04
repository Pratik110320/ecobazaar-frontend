// src/pages/admin/CategoryManagement.jsx
import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FiFolder, FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const response = await categoryService.create({ name: newCategory });
      setCategories(prev => [...prev, response.data]);
      setNewCategory('');
    } catch (error) {
      setError('Failed to create category');
    }
  };

  const handleUpdate = async (id, newName) => {
    try {
      await categoryService.update(id, { name: newName });
      setCategories(prev => 
        prev.map(cat => cat.id === id ? { ...cat, name: newName } : cat)
      );
      setEditingId(null);
    } catch (error) {
      setError('Failed to update category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      setError('Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FiFolder className="mr-3 text-emerald-600" />
          Category Management
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Add New Category */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition flex items-center gap-2"
          >
            <FiPlus /> Add
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              {editingId === category.id ? (
                <div className="flex-1 flex gap-3">
                  <input
                    type="text"
                    defaultValue={category.name}
                    ref={(input) => input && input.focus()}
                    onBlur={(e) => handleUpdate(category.id, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdate(category.id, e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(category.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FiFolder className="text-4xl mx-auto mb-3 opacity-50" />
            <p>No categories found. Create your first category!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
