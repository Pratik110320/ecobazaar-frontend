import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productComparisonService } from '../../services/api';
import { motion } from 'framer-motion';
import { 
  FaBalanceScale, 
  FaLeaf, 
  FaDollarSign, 
  FaStar, 
  FaCheck,
  FaTimes,
  FaSeedling,
  FaRecycle,
  FaTree,
  FaArrowRight,
  FaShoppingCart,
  FaHeart
} from 'react-icons/fa';

const ProductComparison = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productId) {
      loadComparison();
    }
  }, [productId]);

  const loadComparison = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await productComparisonService.compareWithAlternatives(productId);
      setComparison(response.data);
    } catch (err) {
      console.error('Failed to load comparison:', err);
      setError('Failed to load product comparison. The product may not exist or there might be no alternatives available.');
    } finally {
      setLoading(false);
    }
  };

  const getEcoRatingColor = (rating) => {
    if (!rating) return 'text-gray-500';
    switch (rating.toUpperCase()) {
      case 'A': return 'text-emerald-600 bg-emerald-100';
      case 'B': return 'text-green-600 bg-green-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'E': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCarbonImpactLevel = (carbon) => {
    if (carbon < 10) return { color: 'text-emerald-600', label: 'Very Low', icon: FaSeedling };
    if (carbon < 50) return { color: 'text-green-600', label: 'Low', icon: FaLeaf };
    if (carbon < 100) return { color: 'text-yellow-600', label: 'Medium', icon: FaRecycle };
    if (carbon < 200) return { color: 'text-orange-600', label: 'High', icon: FaTree };
    return { color: 'text-red-600', label: 'Very High', icon: FaTimes };
  };

  const formatCarbon = (carbon) => {
    return carbon ? `${carbon.toFixed(1)}kg` : 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product comparison...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <FaBalanceScale className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparison Failed</h2>
          <p className="text-gray-600 mb-6 max-w-md">{error}</p>
          <button 
            onClick={loadComparison}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mr-4"
          >
            Try Again
          </button>
          <Link 
            to="/products"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (!comparison || !comparison.currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <FaBalanceScale className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Comparison Data</h2>
          <p className="text-gray-600 mb-6">Unable to load product comparison data</p>
          <Link 
            to="/products"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const { currentProduct, alternatives, carbonSavings } = comparison;
  const allProducts = [currentProduct, ...(alternatives || [])];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm mb-4">
            <FaBalanceScale className="text-lg" />
            <span>Product Comparison</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eco-Friendly Alternatives
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare your selected product with environmentally friendly alternatives in the same category
          </p>
        </motion.div>

        {/* Carbon Savings Banner */}
        {carbonSavings && carbonSavings.bestSavings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg text-white p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">✨ Potential Carbon Savings</h3>
                <p className="text-emerald-100">
                  You could save <strong>{carbonSavings.bestSavings}kg</strong> of CO₂ by choosing{' '}
                  <strong>{carbonSavings.bestAlternativeName}</strong> instead!
                </p>
              </div>
              {carbonSavings.bestAlternativeId && (
                <Link
                  to={`/products/${carbonSavings.bestAlternativeId}`}
                  className="mt-4 md:mt-0 px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition font-semibold flex items-center gap-2"
                >
                  View Alternative <FaArrowRight />
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {allProducts.map((product, index) => {
            const isCurrent = product.id === currentProduct.id;
            const carbonLevel = getCarbonImpactLevel(product.carbonFootprint);
            const CarbonIcon = carbonLevel.icon;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-sm border-2 hover:shadow-md transition-all ${
                  isCurrent 
                    ? 'border-blue-500 ring-2 ring-blue-100' 
                    : 'border-gray-200'
                }`}
              >
                <div className="p-6">
                  {/* Product Image and Name */}
                  <div className="text-center mb-4">
                    <img 
                      src={product.imageUrl || `https://via.placeholder.com/200x200?text=Product+${index + 1}`}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-3"
                    />
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                    {isCurrent && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        Your Selection
                      </span>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaDollarSign className="text-green-500" />
                        Price
                      </span>
                      <span className="font-semibold">${product.price?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <CarbonIcon className={carbonLevel.color} />
                        Carbon
                      </span>
                      <span className={`font-semibold ${carbonLevel.color}`}>
                        {formatCarbon(product.carbonFootprint)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaLeaf className="text-emerald-500" />
                        Eco Rating
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEcoRatingColor(product.ecoRating)}`}>
                        {product.ecoRating || 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        Rating
                      </span>
                      <span className="font-semibold">
                        {product.averageRating ? `${product.averageRating}/5` : 'No ratings'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaStar className="text-blue-500" />
                        Reviews
                      </span>
                      <span className="font-semibold">{product.reviewCount || 0}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-center font-semibold"
                    >
                      View Details
                    </Link>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Environmental Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg text-white p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <FaTree className="text-4xl flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Make an Eco-Friendly Choice</h3>
              <p className="text-emerald-100 mb-4">
                Choosing products with lower carbon footprints helps reduce your environmental impact. 
                Consider the carbon footprint, eco rating, and sustainable materials when making your decision.
              </p>
              
              {carbonSavings && carbonSavings.bestSavings > 0 && (
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold">
                    💡 Eco Tip: By switching to the best alternative, you could reduce your carbon footprint by{' '}
                    <strong>{carbonSavings.bestSavings}kg</strong> of CO₂ per purchase!
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            to={`/products/${productId}`}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition font-semibold text-center"
          >
            Back to Product
          </Link>
          <Link 
            to="/products"
            className="px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition font-semibold text-center"
          >
            Browse More Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductComparison;
