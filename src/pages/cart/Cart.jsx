// src/pages/cart/Cart.jsx - Redesigned
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, cartService } from '../../services/api';
import CartItem from '../../components/cart/CartItem';
import CartFilters from '../../components/cart/CartFilters';

const Cart = () => {
  const { cart, loading, removeFromCart, refreshCart } = useCart();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minCarbon: '',
    maxCarbon: '',
    sortBy: ''
  });
  const [filteredCart, setFilteredCart] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (cart && user) {
      applyFilters();
    }
  }, [cart, filters, user]);

  const applyFilters = async () => {
    if (!cart || !user) return;
    
    try {
      const response = await cartService.getFilteredCart(user.id, filters);
      setFilteredCart(response.data);
    } catch (error) {
      console.error('Failed to filter cart:', error);
      localFilterCart();
    }
  };

  const localFilterCart = () => {
    if (!cart.items) return;
    
    let items = [...cart.items];
    
    if (filters.category) {
      items = items.filter(item => item.category === filters.category);
    }
    
    if (filters.minPrice) {
      items = items.filter(item => item.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      items = items.filter(item => item.price <= parseFloat(filters.maxPrice));
    }
    
    if (filters.minCarbon) {
      items = items.filter(item => item.carbonFootprint >= parseFloat(filters.minCarbon));
    }
    
    if (filters.maxCarbon) {
      items = items.filter(item => item.carbonFootprint <= parseFloat(filters.maxCarbon));
    }
    
    if (filters.sortBy) {
      items = applySorting(items, filters.sortBy);
    }
    
    setFilteredCart({
      ...cart,
      items,
      totalItems: items.length,
      totalAmount: calculateTotalAmount(items),
      totalCarbon: calculateTotalCarbon(items)
    });
  };

  const applySorting = (items, sortBy) => {
    switch (sortBy) {
      case 'price_asc': return [...items].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...items].sort((a, b) => b.price - a.price);
      case 'carbon_asc': return [...items].sort((a, b) => a.carbonFootprint - b.carbonFootprint);
      case 'carbon_desc': return [...items].sort((a, b) => b.carbonFootprint - a.carbonFootprint);
      case 'name_asc': return [...items].sort((a, b) => a.productName.localeCompare(b.productName));
      case 'name_desc': return [...items].sort((a, b) => b.productName.localeCompare(a.productName));
      default: return items;
    }
  };

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalCarbon = (items) => {
    return items.reduce((total, item) => total + (item.carbonFootprint * item.quantity), 0);
  };

  const handleRemoveItem = async (itemId) => {
    const result = await removeFromCart(itemId);
    if (result.success) {
      await refreshCart();
    } else {
      alert(result.error);
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    
    setCheckoutLoading(true);
    try {
      const address = prompt('Enter shipping address:');
      const phone = prompt('Enter contact phone:');
      const paymentMethod = prompt('Enter payment method (Credit Card/COD):', 'Credit Card');
      
      if (!address || !phone) {
        alert('Address and phone are required');
        return;
      }

      await orderService.create(user.id, {
        address,
        phone,
        paymentMethod
      });

      alert('Order created successfully!');
      await refreshCart();
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh-gradient">
        <div className="text-center">
          <div className="spinner !w-16 !h-16 mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || !filteredCart || !filteredCart.items || filteredCart.items.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container-modern">
          <div className="section-header">
            <h1 className="section-title">Shopping Cart</h1>
            <p className="section-subtitle">Your eco-friendly selections</p>
          </div>
          
          <div className="card-modern text-center py-20 animate-scale-in">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-eco-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Your Cart is Empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start adding sustainable products to make an eco-friendly impact!
              </p>
              <a href="/products" className="btn-eco inline-block">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Browse Products
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container-modern">
        <div className="section-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eco-100 text-eco-700 font-semibold text-sm mb-4 animate-fade-in">
            <span className="text-lg">🛒</span>
            <span>{filteredCart.totalItems} {filteredCart.totalItems === 1 ? 'Item' : 'Items'}</span>
          </div>
          
          <h1 className="section-title">Shopping Cart</h1>
          <p className="section-subtitle">Review and manage your eco-friendly selections</p>
        </div>

        <CartFilters 
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredCart.items.map((item, index) => (
              <div
                key={item.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CartItem 
                  item={item}
                  onRemove={handleRemoveItem}
                />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="card-eco p-6 animate-scale-in">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-primary-100">
                  <span className="text-gray-600 font-medium">Items</span>
                  <span className="text-xl font-bold text-gray-900">{filteredCart.totalItems}</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-primary-100">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-gradient-eco">
                    ${filteredCart.totalAmount.toFixed(2)}
                  </span>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-eco-50 to-leaf-50 border border-eco-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-eco-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-bold text-eco-800 text-lg mb-1">
                        {filteredCart.totalCarbon.toFixed(2)}kg CO₂
                      </div>
                      <p className="text-sm text-eco-700 leading-relaxed">
                        Your carbon footprint for this order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="btn-eco w-full !text-base"
                >
                  {checkoutLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="spinner !w-5 !h-5 !border-2 !border-white/30 !border-t-white"></div>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Proceed to Checkout
                    </span>
                  )}
                </button>
                
                <a href="/products" className="btn-secondary w-full text-center !py-3">
                  Continue Shopping
                </a>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-primary-100">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Secure Checkout</div>
                    <p className="leading-relaxed">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;