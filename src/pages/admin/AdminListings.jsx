import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiSearch, FiFilter, FiEye, FiCheck, FiX, FiStar } = FiIcons;

const AdminListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [listings, setListings] = useState([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

  // Sample mock listings for initial display
  const mockListings = [
    {
      id: 1,
      title: 'TechCrunch Style Blog',
      publisher: 'John Smith',
      niche: 'Technology',
      da: 85,
      price: 125,
      status: 'approved',
      submittedDate: new Date('2024-01-15'),
      website: 'techblog.example.com',
      featured: true
    },
    {
      id: 2,
      title: 'Health & Wellness Magazine',
      publisher: 'Sarah Johnson',
      niche: 'Health & Wellness',
      da: 72,
      price: 100,
      status: 'pending',
      submittedDate: new Date('2024-01-18'),
      website: 'healthmag.example.com',
      featured: false
    },
    {
      id: 3,
      title: 'Financial Advisory Blog',
      publisher: 'Mike Wilson',
      niche: 'Finance',
      da: 78,
      price: 150,
      status: 'rejected',
      submittedDate: new Date('2024-01-16'),
      website: 'financeadvice.example.com',
      featured: false,
      rejectionReason: 'Content quality does not meet standards'
    },
    {
      id: 4,
      title: 'Business Growth Hub',
      publisher: 'Emily Davis',
      niche: 'Business',
      da: 65,
      price: 87.5,
      status: 'approved',
      submittedDate: new Date('2024-01-14'),
      website: 'businessgrowth.example.com',
      featured: false
    },
    {
      id: 5,
      title: 'Lifestyle & Travel Blog',
      publisher: 'Alex Chen',
      niche: 'Lifestyle',
      da: 58,
      price: 75,
      status: 'pending',
      submittedDate: new Date('2024-01-19'),
      website: 'lifestyletravel.example.com',
      featured: false
    }
  ];

  // Load listings including pending ones from localStorage
  useEffect(() => {
    // Get pending listings from localStorage
    const pendingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
    
    // Combine with mock listings
    const combinedListings = [...mockListings];
    
    // Add any pending listings that aren't already in the mock listings
    pendingListings.forEach(pendingListing => {
      if (!combinedListings.some(listing => listing.id === pendingListing.id)) {
        combinedListings.push({
          ...pendingListing,
          submittedDate: new Date(pendingListing.createdAt)
        });
      }
    });
    
    setListings(combinedListings);
  }, []);

  const niches = ['Technology', 'Health & Wellness', 'Finance', 'Business', 'Lifestyle'];

  const filteredListings = listings.filter(listing => {
    // Handle both formats of publisher data (string or object with name property)
    const publisherName = typeof listing.publisher === 'string' 
      ? listing.publisher 
      : (listing.publisher?.name || '');
      
    const matchesSearch = listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publisherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.website?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    const matchesNiche = nicheFilter === 'all' || listing.niche === nicheFilter;
    
    return matchesSearch && matchesStatus && matchesNiche;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = async (id) => {
    try {
      // Find the listing to approve
      const listingToApprove = listings.find(listing => listing.id === id);
      if (!listingToApprove) return;
      
      // Update status in our local state
      const updatedListings = listings.map(listing => 
        listing.id === id ? { ...listing, status: 'approved' } : listing
      );
      setListings(updatedListings);
      
      // Update in pendingListings localStorage
      const pendingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
      const updatedPendingListings = pendingListings.filter(listing => listing.id !== id);
      localStorage.setItem('pendingListings', JSON.stringify(updatedPendingListings));
      
      // Add to MOCK_LISTINGS for display in marketplace
      const { MOCK_LISTINGS } = await import('../../data/mockListings');
      MOCK_LISTINGS.unshift(listingToApprove);
      
      toast.success(`Listing "${listingToApprove.title}" has been approved and added to the marketplace.`);
    } catch (error) {
      console.error('Error approving listing:', error);
      toast.error('Failed to approve listing');
    }
  };

  const openRejectModal = (id) => {
    setSelectedListingId(id);
    setRejectionReason('');
    setShowRejectionModal(true);
  };

  const handleReject = async () => {
    try {
      if (!selectedListingId || !rejectionReason.trim()) {
        toast.error('Please provide a reason for rejection');
        return;
      }
      
      // Find the listing to reject
      const listingToReject = listings.find(listing => listing.id === selectedListingId);
      if (!listingToReject) return;
      
      // Update status in our local state
      const updatedListings = listings.map(listing => 
        listing.id === selectedListingId ? 
          { ...listing, status: 'rejected', rejectionReason } : listing
      );
      setListings(updatedListings);
      
      // Update in pendingListings localStorage
      const pendingListings = JSON.parse(localStorage.getItem('pendingListings') || '[]');
      const updatedPendingListings = pendingListings.filter(listing => listing.id !== selectedListingId);
      localStorage.setItem('pendingListings', JSON.stringify(updatedPendingListings));
      
      // Close modal
      setShowRejectionModal(false);
      setSelectedListingId(null);
      
      toast.success(`Listing "${listingToReject.title}" has been rejected.`);
    } catch (error) {
      console.error('Error rejecting listing:', error);
      toast.error('Failed to reject listing');
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Management</h1>
        <p className="text-gray-600">Review and manage publisher listings</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Niche Filter */}
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Niches</option>
            {niches.map(niche => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>

          {/* Actions */}
          <button className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <SafeIcon icon={FiFilter} className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Listings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Publisher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        {listing.featured && (
                          <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400 ml-2" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{listing.website}</div>
                      <div className="text-xs text-gray-400">{listing.niche}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{listing.publisher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>DA: {listing.da}</div>
                      <div className="text-green-600 font-medium">${listing.price}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </span>
                    {listing.rejectionReason && (
                      <div className="text-xs text-red-600 mt-1">{listing.rejectionReason}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(listing.submittedDate, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <SafeIcon icon={FiEye} className="h-4 w-4" />
                      </button>
                      {listing.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(listing.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <SafeIcon icon={FiCheck} className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => openRejectModal(listing.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <SafeIcon icon={FiX} className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SafeIcon icon={FiSearch} className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600">No listings match your current filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminListings;