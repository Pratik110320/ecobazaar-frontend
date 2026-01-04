import React, { useState, useEffect } from 'react';
import { communityService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiBarChart2 
} from 'react-icons/fi';
import { 
  FaCrown, 
  FaMedal, 
  FaSeedling, 
  FaRecycle, 
  FaTree,
  FaTrophy,
  FaLeaf
} from 'react-icons/fa';

const CommunityLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using limit parameter as defined in the service
      const response = await communityService.getCarbonLeaderboard(50);
      
      // Handle different possible response structures
      let leaderboardData = [];
      
      if (Array.isArray(response.data)) {
        // If response.data is already an array
        leaderboardData = response.data;
      } else if (response.data?.leaderboard && Array.isArray(response.data.leaderboard)) {
        // If response.data has a leaderboard property
        leaderboardData = response.data.leaderboard;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        // If response.data has a data property
        leaderboardData = response.data.data;
      } else if (response.data?.users && Array.isArray(response.data.users)) {
        // If response.data has a users property
        leaderboardData = response.data.users;
      }
      
      // Ensure data is sorted by carbon saved (descending)
      leaderboardData = leaderboardData
        .map(item => ({
          ...item,
          // Normalize property names
          userId: item.userId || item.id || item.userId,
          fullName: item.fullName || item.name || item.username || 'Anonymous User',
          totalCarbonSaved: item.totalCarbonSaved || item.carbonSaved || item.carbon_saved || 0,
          ecoScore: item.ecoScore || item.eco_score || item.score || 'A',
          totalOrders: item.totalOrders || item.orders || item.orderCount || 0,
          greenPurchases: item.greenPurchases || item.green_purchases || 0
        }))
        .sort((a, b) => b.totalCarbonSaved - a.totalCarbonSaved);
      
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setError('Failed to load leaderboard data');
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaCrown className="text-yellow-500 text-2xl" />;
      case 2: return <FaMedal className="text-gray-400 text-xl" />;
      case 3: return <FaMedal className="text-amber-600 text-xl" />;
      default: return <FaTrophy className="text-gray-500" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500';
      case 2: return 'from-gray-400 to-gray-500';
      case 3: return 'from-amber-500 to-orange-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getBadgeType = (carbonSaved = 0) => {
    if (carbonSaved > 1000) return { icon: FaTree, label: 'Eco Warrior', color: 'text-emerald-600' };
    if (carbonSaved > 500) return { icon: FaRecycle, label: 'Recycling Champion', color: 'text-green-600' };
    if (carbonSaved > 100) return { icon: FaSeedling, label: 'Green Savvy', color: 'text-lime-600' };
    return { icon: FaLeaf, label: 'Eco Beginner', color: 'text-teal-600' };
  };

  // Find current user's rank
  const currentUserRank = user ? 
    leaderboard.findIndex(item => item.userId === user.id || item.id === user.id) + 1 : 0;

  // Get current user data if they're in the leaderboard
  const currentUserData = user && currentUserRank > 0 ? 
    leaderboard[currentUserRank - 1] : null;

  // Calculate community stats
  const communityStats = {
    totalCarbonSaved: leaderboard.reduce((sum, user) => sum + (user.totalCarbonSaved || 0), 0),
    totalMembers: leaderboard.length,
    totalOrders: leaderboard.reduce((sum, user) => sum + (user.totalOrders || 0), 0),
    avgEcoScore: leaderboard.length > 0 ? 
      (leaderboard.reduce((sum, user) => {
        // Convert letter grades to numbers for average
        const score = user.ecoScore || 'A';
        const scoreMap = { 'A+': 4.3, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0 };
        return sum + (scoreMap[score] || 3.0);
      }, 0) / leaderboard.length).toFixed(1) : 'N/A'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm mb-4">
            <FaTrophy className="text-lg" />
            <span>Community Leaderboard</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eco Champions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrate our community members making the biggest positive environmental impact
          </p>
          
          {/* Refresh button */}
          <button
            onClick={loadLeaderboard}
            className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 mx-auto"
          >
            <FiTrendingUp />
            Refresh Leaderboard
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <p className="text-red-600 text-center">{error}</p>
          </motion.div>
        )}

        {/* Current User Stats */}
        {user && currentUserData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg text-white p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Ranking</h3>
                  <p className="text-emerald-100 mb-2">
                    {currentUserRank === 1 
                      ? '🥇 You are the top eco champion!' 
                      : `You're ranked #${currentUserRank} in the community`}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <FaTree className="text-emerald-200" />
                      {(currentUserData.totalCarbonSaved || 0).toFixed(0)}kg CO₂ saved
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMedal className="text-emerald-200" />
                      Eco Score: {currentUserData.ecoScore || 'A'}
                    </span>
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-5xl font-bold mb-2 flex items-center justify-end gap-2">
                    {getRankIcon(currentUserRank)}
                    <span>{currentUserRank}</span>
                  </div>
                  <div className="text-emerald-200">out of {leaderboard.length} members</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Not Logged In Message */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center"
          >
            <p className="text-blue-700">
              👋 Sign in to see your ranking on the leaderboard!
            </p>
          </motion.div>
        )}

        {/* Leaderboard */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading leaderboard...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {leaderboard.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <FiUsers className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Yet</h3>
                <p className="text-gray-600 mb-6">Be the first to make an impact!</p>
                <button
                  onClick={loadLeaderboard}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Top 3 winners with special styling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {leaderboard.slice(0, 3).map((userData, index) => {
                    const rank = index + 1;
                    const badge = getBadgeType(userData.totalCarbonSaved);
                    const BadgeIcon = badge.icon;
                    
                    return (
                      <motion.div
                        key={userData.userId || index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${getRankColor(rank)} rounded-2xl shadow-lg text-white p-6 transform hover:scale-[1.02] transition-transform ${
                          rank === 1 ? 'md:row-span-1 md:col-span-1' : ''
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4">
                            {getRankIcon(rank)}
                          </div>
                          <div className="text-3xl font-bold mb-2">{rank}</div>
                          <h4 className="text-xl font-bold mb-2">
                            {userData.fullName}
                          </h4>
                          <div className="flex items-center gap-2 mb-4 text-sm">
                            <BadgeIcon className="text-white opacity-90" />
                            <span>{badge.label}</span>
                          </div>
                          <div className="text-2xl font-bold mb-1">
                            {(userData.totalCarbonSaved || 0).toFixed(0)}kg
                          </div>
                          <div className="text-sm opacity-90">CO₂ saved</div>
                          <div className="mt-4 text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                            Eco Score: {userData.ecoScore}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Rest of the leaderboard */}
                <div className="space-y-3">
                  {leaderboard.slice(3).map((userData, index) => {
                    const rank = index + 4;
                    const badge = getBadgeType(userData.totalCarbonSaved);
                    const BadgeIcon = badge.icon;
                    
                    return (
                      <motion.div
                        key={userData.userId || index + 3}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (index + 3) * 0.05 }}
                        className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all ${
                          user && (userData.userId === user.id || userData.id === user.id)
                            ? 'ring-2 ring-emerald-500 ring-opacity-50 border-emerald-200 bg-emerald-50' 
                            : ''
                        }`}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            {/* Left side: Rank and User Info */}
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                                {rank}
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-md font-semibold text-gray-900">
                                    {userData.fullName}
                                  </h4>
                                  {user && (userData.userId === user.id || userData.id === user.id) && (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <BadgeIcon className={badge.color} />
                                  <span>{badge.label}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right side: Stats */}
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <div className="text-lg font-bold text-emerald-600">
                                  {(userData.totalCarbonSaved || 0).toFixed(0)}kg
                                </div>
                                <div className="text-xs text-gray-500">CO₂ saved</div>
                              </div>
                              <div className="text-right">
                                <div className="text-md font-bold text-gray-900">
                                  {userData.ecoScore}
                                </div>
                                <div className="text-xs text-gray-500">Eco Score</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Community Stats */}
        {leaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <FaTree className="text-3xl text-emerald-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {communityStats.totalCarbonSaved.toLocaleString()}kg
              </div>
              <div className="text-gray-600">Total Carbon Saved</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <FiUsers className="text-3xl text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {communityStats.totalMembers}
              </div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <FiBarChart2 className="text-3xl text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {communityStats.totalOrders.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <FaMedal className="text-3xl text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {communityStats.avgEcoScore}
              </div>
              <div className="text-gray-600">Avg Eco Score</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityLeaderboard;