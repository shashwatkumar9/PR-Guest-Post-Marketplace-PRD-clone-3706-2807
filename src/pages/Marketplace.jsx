import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { SEO, SchemaMarkup } from '../utils/seoUtils';
import { NICHES } from '../data/niches';
import { LANGUAGE_OPTIONS } from '../data/languages';
import { MOCK_LISTINGS } from '../data/mockListings';
import { useAuth } from '../contexts/AuthContext';
import Select from 'react-select';

const { FiSearch, FiFilter, FiStar, FiTrendingUp, FiUsers, FiDollarSign, FiGlobe, FiSliders } = FiIcons;

const Marketplace = () => {
  const { user } = useAuth();
  
  // Redirect publishers to My Websites
  if (user?.role === 'publisher') {
    return <Navigate to="/my-websites" replace />;
  }
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [minDA, setMinDA] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Filter listings based on all criteria
  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const matchesSearch = !searchTerm || 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiche = !selectedNiche || listing.nicheId === selectedNiche;
    
    const matchesPrice = !priceRange || 
      (priceRange === 'under-100' && listing.price < 100) || 
      (priceRange === '100-200' && listing.price >= 100 && listing.price <= 200) || 
      (priceRange === '200-500' && listing.price > 200 && listing.price <= 500) ||
      (priceRange === 'over-500' && listing.price > 500);
    
    const matchesLanguages = selectedLanguages.length === 0 || 
      selectedLanguages.some(lang => 
        listing.languages.some(listingLang => listingLang.code === lang.value)
      );
    
    const matchesDA = !minDA || listing.da >= parseInt(minDA);
    
    return matchesSearch && matchesNiche && matchesPrice && matchesLanguages && matchesDA;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b.featured - a.featured;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'da-high':
        return b.da - a.da;
      default:
        return b.featured - a.featured;
    }
  });

  // Get current listings for pagination
  const indexOfLastListing = currentPage * postsPerPage;
  const indexOfFirstListing = indexOfLastListing - postsPerPage;
  const currentListings = sortedListings.slice(indexOfFirstListing, indexOfLastListing);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(sortedListings.length / postsPerPage);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedNiche, priceRange, selectedLanguages, minDA, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO
        title="Guest Post Marketplace | Find High-Quality Websites for Guest Posting"
        description="Browse our curated marketplace of high-authority websites for guest posting. Find the perfect sites to publish your content and build quality backlinks."
        keywords="guest posting, marketplace, backlinks, content marketing, SEO, domain authority, publishers"
        canonical="https://prguest.com/marketplace"
      />
      
      <SchemaMarkup
        type="ItemList"
        data={{
          itemListElement: currentListings.map((listing, index) => ({
            "@type": "ListItem",
            "position": indexOfFirstListing + index + 1,
            "url": `https://prguest.com/listing/${listing.id}`,
            "name": listing.title
          }))
        }}
      />
      
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

        {/* Search and Basic Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              {NICHES.map(niche => (
                <option key={niche.id} value={niche.id}>{niche.name}</option>
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
              <option value="100-200">$100 - $200</option>
              <option value="200-500">$200 - $500</option>
              <option value="over-500">Over $500</option>
            </select>

            {/* Advanced Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSliders} className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide Filters' : 'Advanced Filters'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200"
            >
              {/* Min Domain Authority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Domain Authority
                </label>
                <select
                  value={minDA}
                  onChange={(e) => setMinDA(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any DA</option>
                  <option value="30">DA 30+</option>
                  <option value="40">DA 40+</option>
                  <option value="50">DA 50+</option>
                  <option value="60">DA 60+</option>
                  <option value="70">DA 70+</option>
                </select>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages
                </label>
                <Select
                  isMulti
                  name="languages"
                  options={LANGUAGE_OPTIONS}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select languages..."
                  value={selectedLanguages}
                  onChange={setSelectedLanguages}
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="da-high">Highest DA</option>
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {indexOfFirstListing + 1}-{Math.min(indexOfLastListing, sortedListings.length)} of {sortedListings.length} listings
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentListings.map((listing, index) => (
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
                
                {/* Languages */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {listing.languages.map(lang => (
                    <span key={lang.code} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
                      {lang.code === 'en' ? '🇬🇧' : lang.code === 'es' ? '🇪🇸' : lang.code === 'fr' ? '🇫🇷' : '🌐'} {lang.name}
                    </span>
                  ))}
                </div>

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
                      Guest post price
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

        {currentListings.length === 0 && (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => paginate(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex mx-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;