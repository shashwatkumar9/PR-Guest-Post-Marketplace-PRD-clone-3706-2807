import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiStar, FiTrendingUp, FiUsers, FiDollarSign } = FiIcons;

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const niches = [
    'Technology', 'Health & Wellness', 'Finance', 'Business', 'Lifestyle',
    'Travel', 'Food & Cooking', 'Fashion', 'Education', 'Sports'
  ];

  const listings = [
    {
      id: 1,
      title: 'TechCrunch Style Blog',
      description: 'High-authority technology blog with engaged audience of startup founders and tech professionals.',
      niche: 'Technology',
      da: 85,
      traffic: '500K',
      price: 125,
      basePrice: 100,
      rating: 4.9,
      reviews: 45,
      turnaround: '2-3 days',
      featured: true
    },
    {
      id: 2,
      title: 'Health & Wellness Magazine',
      description: 'Popular health and wellness publication reaching health-conscious consumers.',
      niche: 'Health & Wellness',
      da: 72,
      traffic: '250K',
      price: 100,
      basePrice: 80,
      rating: 4.8,
      reviews: 32,
      turnaround: '3-5 days',
      featured: false
    },
    {
      id: 3,
      title: 'Financial Advisory Blog',
      description: 'Trusted financial advice platform for investors and financial professionals.',
      niche: 'Finance',
      da: 78,
      traffic: '180K',
      price: 150,
      basePrice: 120,
      rating: 4.9,
      reviews: 28,
      turnaround: '1-2 days',
      featured: true
    },
    {
      id: 4,
      title: 'Business Growth Hub',
      description: 'Business strategy and growth hacking blog for entrepreneurs and business owners.',
      niche: 'Business',
      da: 65,
      traffic: '120K',
      price: 87.5,
      basePrice: 70,
      rating: 4.7,
      reviews: 19,
      turnaround: '2-4 days',
      featured: false
    },
    {
      id: 5,
      title: 'Lifestyle & Travel Blog',
      description: 'Popular lifestyle blog covering travel, fashion, and modern living.',
      niche: 'Lifestyle',
      da: 58,
      traffic: '300K',
      price: 75,
      basePrice: 60,
      rating: 4.6,
      reviews: 41,
      turnaround: '3-7 days',
      featured: false
    },
    {
      id: 6,
      title: 'Education Innovation Site',
      description: 'EdTech and educational innovation platform for educators and students.',
      niche: 'Education',
      da: 69,
      traffic: '95K',
      price: 112.5,
      basePrice: 90,
      rating: 4.8,
      reviews: 15,
      turnaround: '2-3 days',
      featured: false
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = !selectedNiche || listing.niche === selectedNiche;
    const matchesPrice = !priceRange || 
      (priceRange === 'under-100' && listing.price < 100) ||
      (priceRange === '100-150' && listing.price >= 100 && listing.price <= 150) ||
      (priceRange === 'over-150' && listing.price > 150);
    
    return matchesSearch && matchesNiche && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Guest Post Marketplace
          </h1>
          <p className="text-gray-600">
            Discover high-quality websites for your guest posting campaigns
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Niche Filter */}
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Niches</option>
              {niches.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              <option value="under-100">Under $100</option>
              <option value="100-150">$100 - $150</option>
              <option value="over-150">Over $150</option>
            </select>

            {/* Filter Button */}
            <button className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiFilter} className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredListings.length} of {listings.length} listings
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {listing.featured && (
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-sm font-medium">
                  ⭐ Featured Listing
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {listing.title}
                  </h3>
                  <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                    {listing.niche}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {listing.description}
                </p>

                {/* Stats */}
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
                    <div className="text-lg font-bold text-gray-900">{listing.turnaround}</div>
                    <div className="text-xs text-gray-500">Delivery</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{listing.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({listing.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">${listing.price}</div>
                    <div className="text-xs text-gray-500">
                      Base: ${listing.basePrice} + 25% commission
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/listing/${listing.id}`}
                  className="w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium block"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <SafeIcon icon={FiSearch} className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;