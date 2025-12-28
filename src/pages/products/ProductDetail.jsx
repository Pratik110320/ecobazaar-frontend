// src/pages/products/ProductDetail.jsx - Updated with Tailwind CSS
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService, reviewService, wishlistService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import ReviewList from '../../components/reviews/ReviewList';
import AddReview from '../../components/reviews/AddReview';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [imageError, setImageError] = useState(false);

  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
    loadReviews();
    checkWishlist();
  }, [id, user]);

  const loadProduct = async () => {
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await reviewService.getProductReviews(id);
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const checkWishlist = async () => {
    if (!user) return;
    try {
      const response = await wishlistService.checkWishlist(user.id, id);
      setInWishlist(response.data.inWishlist);
    } catch (error) {
      console.error('Failed to check wishlist:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) return;
    setAddingToCart(true);
    const result = await addToCart(product.id, 1);
    if (result.success) {
      // Show success message
    } else {
      alert(result.error);
    }
    setAddingToCart(false);
  };

  const handleWishlist = async () => {
    if (!user) return;
    try {
      if (inWishlist) {
        await wishlistService.removeFromWishlist(user.id, product.id);
        setInWishlist(false);
        alert('Removed from wishlist!');
      } else {
        await wishlistService.addToWishlist(user.id, product.id);
        setInWishlist(true);
        alert('Added to wishlist!');
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  const getEcoRatingClass = (rating) => {
    if (!rating) return 'bg-gray-100 text-gray-800';
    switch (rating) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-green-50 text-green-700 border-green-100';
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'D': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Button as="a" href="/products" variant="primary" className="mt-4">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Product Header */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex flex-col">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square mb-4">
                <img 
                  src={imageError ? '/placeholder-product.jpg' : (product.imageUrl || '/placeholder-product.jpg')} 
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {product.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      ⭐ Featured
                    </span>
                  )}
                  {!product.verified && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                      ⏳ Pending Verification
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-eco-600">${product.price}</div>
                    <div className="text-sm text-gray-600">Price</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{product.carbonFootprint}kg</div>
                    <div className="text-sm text-gray-600">Carbon Footprint</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {product.category}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEcoRatingClass(product.ecoRating)}`}>
                    🌱 Eco Rating: {product.ecoRating || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {user?.role === 'USER' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={addingToCart || !product.verified}
                    variant={product.verified ? "success" : "secondary"}
                    size="large"
                    className="flex-1"
                  >
                    {addingToCart ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : product.verified ? (
                      '🛒 Add to Cart'
                    ) : (
                      '⏳ Pending Verification'
                    )}
                  </Button>
                  
                  <Button 
                    onClick={handleWishlist}
                    variant="outline"
                    size="large"
                    className="flex-1"
                  >
                    {inWishlist ? '❤️ Remove from Wishlist' : '♡ Add to Wishlist'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'details' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'reviews' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
            {product.carbonBreakdown && (
              <button
                className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'carbon' 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('carbon')}
              >
                Carbon Breakdown
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'details' && (
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Seller</span>
                    <span className="text-gray-900">{product.sellerName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Category</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Stock Available</span>
                    <span className="text-gray-900">{product.quantity} units</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Views</span>
                    <span className="text-gray-900">{product.viewCount}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Average Rating</span>
                    <span className="text-gray-900">{product.averageRating} ⭐ ({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Verification Status</span>
                    <span className={product.verified ? "text-green-600 font-medium" : "text-orange-600 font-medium"}>
                      {product.verified ? '✅ Verified' : '⏳ Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {user && <AddReview productId={product.id} onReviewAdded={loadReviews} />}
              <ReviewList reviews={reviews} />
            </div>
          )}

          {activeTab === 'carbon' && product.carbonBreakdown && (
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Carbon Footprint Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-eco-50 rounded-lg p-4">
                    <h4 className="font-semibold text-eco-800 mb-2">Manufacturing</h4>
                    <div className="text-2xl font-bold text-eco-600">{product.carbonBreakdown.manufacturing}kg</div>
                    <p className="text-sm text-eco-700 mt-1">Production process emissions</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Transportation</h4>
                    <div className="text-2xl font-bold text-blue-600">{product.carbonBreakdown.transportation}kg</div>
                    <p className="text-sm text-blue-700 mt-1">Shipping and logistics</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Packaging</h4>
                    <div className="text-2xl font-bold text-purple-600">{product.carbonBreakdown.packaging}kg</div>
                    <p className="text-sm text-purple-700 mt-1">Materials and waste</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Usage & Disposal</h4>
                    <div className="text-2xl font-bold text-orange-600">
                      {product.carbonBreakdown.usage + product.carbonBreakdown.disposal}kg
                    </div>
                    <p className="text-sm text-orange-700 mt-1">Product lifecycle impact</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
