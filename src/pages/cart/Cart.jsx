// src/pages/cart/Cart.jsx - Updated with Tailwind CSS
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, cartService } from '../../services/api';
import CartItem from '../../components/cart/CartItem';
import CartFilters from '../../components/cart/CartFilters';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

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
    
    // Apply filters locally
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
    
    // Apply sorting
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
      await refreshCart(); // Clear the cart
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <LoadingSpinner text="Loading your cart..." />
      </div>
    );
  }

  if (!cart || !filteredCart || !filteredCart.items || filteredCart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">🛒 Shopping Cart</h1>
            <p className="text-xl text-gray-600">Your eco-friendly shopping journey</p>
          </div>
          
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some sustainable products to get started!</p>
            <Button as="a" href="/products" variant="success" size="large">
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">🛒 Shopping Cart</h1>
          <p className="text-xl text-gray-600">Review your eco-friendly selections</p>
        </div>

        <CartFilters 
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredCart.items.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          <Card className="h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{filteredCart.totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-green-600">${filteredCart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Carbon Footprint:</span>
                <span className="font-semibold text-eco-600">{filteredCart.totalCarbon.toFixed(2)}kg CO₂</span>
              </div>
            </div>
            
            <div className="p-3 bg-eco-50 rounded-lg mb-4">
              <div className="flex items-center text-sm text-eco-800">
                <span className="text-lg mr-2">🌱</span>
                <span>Your cart saves {filteredCart.totalCarbon.toFixed(2)}kg of carbon compared to conventional products!</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              disabled={checkoutLoading}
              variant="success"
              size="large"
              className="w-full"
            >
              {checkoutLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
