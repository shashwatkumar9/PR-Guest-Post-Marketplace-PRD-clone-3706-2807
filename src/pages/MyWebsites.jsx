import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const { FiPlus, FiEdit, FiEye, FiTrash2, FiGlobe, FiTrendingUp, FiDollarSign, FiClock } = FiIcons;

const MyWebsites = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Load user's listings from localStorage (in a real app, this would be an API call)
    const userListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    const myListings = userListings.filter(listing => listing.publisher.name === user?.name);
    setListings(myListings);
  }, [user]);

  const handleDeleteListing = (listingId) => {
    const userListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    const updatedListings = userListings.filter(listing => listing.id !== listingId);
    localStorage.setItem('userListings', JSON.stringify(updatedListings));
    setListings(listings.filter(listing => listing.id !== listingId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Websites</h1>
              <p className="text-gray-600">Manage your website listings and track performance</p>
            </div>
            <Link
              to="/create-listing"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiPlus} className="h-5 w-5 mr-2" />
              Add New Website
            </Link>
          </div>
        </motion.div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {listing.title}
                    </h3>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {listing.niche}
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <SafeIcon icon={FiGlobe} className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{listing.website}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">DA {listing.da}</div>
                      <div className="text-xs text-gray-500">Authority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{listing.traffic}</div>
                      <div className="text-xs text-gray-500">Monthly</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">${listing.price}</div>
                      <div className="text-xs text-gray-500">Price</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{listing.turnaround}</span>
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiTrendingUp} className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{listing.reviews} orders</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/listing/${listing.id}`}
                      className="flex-1 bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <SafeIcon icon={FiEye} className="h-4 w-4 inline mr-1" />
                      View
                    </Link>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <SafeIcon icon={FiEdit} className="h-4 w-4 inline mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteListing(listing.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <SafeIcon icon={FiGlobe} className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No websites listed yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first website to accept guest posts</p>
            <Link
              to="/create-listing"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="h-5 w-5 mr-2" />
              Add Your First Website
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyWebsites;