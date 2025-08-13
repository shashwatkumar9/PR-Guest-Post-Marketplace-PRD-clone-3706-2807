import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiClock, FiTrendingUp, FiUsers, FiShield, FiMessageSquare, FiCreditCard } = FiIcons;

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Mock listing data (in real app, fetch from API)
  const listing = {
    id: 1,
    title: 'TechCrunch Style Blog',
    description: 'High-authority technology blog with engaged audience of startup founders and tech professionals. We publish in-depth articles about emerging technologies, startup strategies, and industry insights.',
    niche: 'Technology',
    da: 85,
    traffic: '500K',
    price: 125,
    basePrice: 100,
    rating: 4.9,
    reviews: 45,
    turnaround: '2-3 days',
    featured: true,
    website: 'techblog.example.com',
    publisher: {
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff',
      rating: 4.8,
      completedOrders: 156,
      responseTime: '2 hours'
    },
    guidelines: [
      'Articles must be 1000+ words',
      'Original content only (no plagiarism)',
      'Maximum 2 do-follow backlinks',
      'Tech-related topics preferred',
      'Professional writing style required'
    ],
    sampleArticles: [
      'The Future of AI in Startup Development',
      'Blockchain Technology: Beyond Cryptocurrency',
      'How to Scale Your SaaS Business in 2024'
    ],
    analytics: {
      monthlyVisitors: '500,000',
      bounceRate: '32%',
      avgSessionDuration: '3:45',
      topCountries: ['United States', 'United Kingdom', 'Canada']
    }
  };

  const handlePurchase = () => {
    if (!user) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    toast.success('Order placed successfully! Check your dashboard for next steps.');
    setShowPurchaseModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
            >
              {listing.featured && (
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 px-4 rounded-lg mb-4 text-sm font-medium">
                  ⭐ Featured Listing
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {listing.niche}
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{listing.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">DA {listing.da}</div>
                  <div className="text-sm text-gray-500">Domain Authority</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{listing.traffic}</div>
                  <div className="text-sm text-gray-500">Monthly Traffic</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{listing.turnaround}</div>
                  <div className="text-sm text-gray-500">Turnaround</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <SafeIcon icon={FiStar} className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold text-gray-900 ml-1">{listing.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">{listing.reviews} reviews</div>
                </div>
              </div>

              {/* Content Guidelines */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Guidelines</h3>
                <ul className="space-y-2">
                  {listing.guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Articles */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Published Articles</h3>
                <div className="space-y-2">
                  {listing.sampleArticles.map((article, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiTrendingUp} className="h-5 w-5 text-primary-500 mr-3" />
                      <span className="text-gray-700">{article}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Website Analytics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{listing.analytics.monthlyVisitors}</div>
                    <div className="text-sm text-gray-500">Monthly Visitors</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{listing.analytics.bounceRate}</div>
                    <div className="text-sm text-gray-500">Bounce Rate</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{listing.analytics.avgSessionDuration}</div>
                    <div className="text-sm text-gray-500">Avg. Session</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Purchase Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">${listing.price}</div>
                <div className="text-sm text-gray-500">
                  Base: ${listing.basePrice} + 25% commission
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Website:</span>
                  <span className="font-medium text-gray-900">{listing.website}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium text-gray-900">{listing.turnaround}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Revisions:</span>
                  <span className="font-medium text-gray-900">2 free</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium mb-3"
              >
                Purchase Guest Post
              </button>

              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <SafeIcon icon={FiMessageSquare} className="h-5 w-5 inline mr-2" />
                Contact Publisher
              </button>
            </motion.div>

            {/* Publisher Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Publisher</h3>
              
              <div className="flex items-center mb-4">
                <img 
                  src={listing.publisher.avatar} 
                  alt={listing.publisher.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">{listing.publisher.name}</div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{listing.publisher.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Orders Completed:</span>
                  <span className="font-medium text-gray-900">{listing.publisher.completedOrders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-medium text-gray-900">{listing.publisher.responseTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiShield} className="h-4 w-4 mr-2" />
                  Verified Publisher
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Purchase</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Guest Post:</span>
                <span className="font-medium">{listing.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>${listing.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (25%):</span>
                <span>${listing.price - listing.basePrice}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${listing.price}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Confirm Purchase
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;