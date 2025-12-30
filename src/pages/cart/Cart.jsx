// src/pages/cart/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, cartService } from '../../services/api';
import CartItem from '../../components/cart/CartItem';
import CartFilters from '../../components/cart/CartFilters';
import CheckoutForm from '../../components/cart/CheckoutForm';
import { motion } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiPackage, 
  FiCheckCircle, 
  FiChevronRight,
  FiRefreshCw,
  FiTag,
  FiCreditCard,
  FiMapPin,
  FiPhone
} from 'react-icons/fi';

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
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [orderData, setOrderData] = useState({});

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

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleCheckoutSubmit = async (data) => {
    setOrderData(data);
    setCheckoutStep('confirmation');
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    
    try {
      await orderService.create(user.id, {
        address: orderData.address,
        phone: orderData.phone,
        paymentMethod: orderData.paymentMethod
      });

      alert('Order created successfully!');
      await refreshCart();
      setCheckoutStep('success');
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'checkout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <button 
              onClick={handleBackToCart}
              className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
            >
              <FiChevronRight className="transform rotate-180 mr-1" />
              Back to Cart
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your purchase information</p>
          </motion.div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <CheckoutForm onSubmit={handleCheckoutSubmit} />
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <FiCreditCard className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmation</h1>
            <p className="text-gray-600">Please review your order details</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FiMapPin className="mr-2 text-emerald-600" />
                  Shipping Information
                </h2>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-500 w-32">Address:</span>
                    <span className="text-gray-900">{orderData.address}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Phone:</span>
                    <span className="text-gray-900">{orderData.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-32">Payment Method:</span>
                    <span className="text-gray-900">{orderData.paymentMethod}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {filteredCart?.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">{item.productName}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <div className="text-lg font-bold text-gray-900">Total</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      ${filteredCart?.totalAmount?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiPackage className="text-emerald-600" />
                  Environmental Impact
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-start gap-3">
                      <FiPackage className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-emerald-800 text-lg mb-1">
                          {filteredCart?.totalCarbon?.toFixed(2)}kg CO₂
                        </div>
                        <p className="text-sm text-emerald-700 leading-relaxed">
                          Your carbon footprint for this order
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition font-medium flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle />
                    Place Order
                  </button>
                  
                  <button 
                    onClick={handleBackToCart}
                    className="w-full py-3 px-4 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium"
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <FiCheckCircle className="text-4xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order is being processed.
            </p>
            <a 
              href="/orders" 
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
            >
              View Order Status
              <FiChevronRight className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!cart || !filteredCart || !filteredCart.items || filteredCart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">Your eco-friendly selections</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <FiShoppingCart className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Your Cart is Empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start adding sustainable products to make an eco-friendly impact!
              </p>
              <a 
                href="/products" 
                className="inline-flex items-center px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                <FiPackage className="mr-2" />
                Browse Products
                <FiChevronRight className="ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-4">
            <FiShoppingCart className="text-lg" />
            <span>{filteredCart.totalItems} {filteredCart.totalItems === 1 ? 'Item' : 'Items'}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review and manage your eco-friendly selections</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CartFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {filteredCart.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <CartItem 
                  item={item}
                  onRemove={handleRemoveItem}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiPackage className="text-emerald-600" />
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Items</span>
                  <span className="text-xl font-bold text-gray-900">{filteredCart.totalItems}</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${filteredCart.totalAmount.toFixed(2)}
                  </span>
                </div>
                
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <FiPackage className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-800 text-lg mb-1">
                        {filteredCart.totalCarbon.toFixed(2)}kg CO₂
                      </div>
                      <p className="text-sm text-emerald-700 leading-relaxed">
                        Your carbon footprint for this order
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition font-medium flex items-center justify-center gap-2"
                >
                  <FiCheckCircle />
                  Proceed to Checkout
                </button>
                
                <a 
                  href="/products" 
                  className="w-full py-3 px-4 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium text-center block"
                >
                  Continue Shopping
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <FiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Secure Checkout</div>
                    <p className="leading-relaxed">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
