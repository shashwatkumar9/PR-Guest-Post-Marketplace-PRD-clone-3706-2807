import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiFileText, FiTrendingUp, FiUsers, FiPlus, FiEye } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();

  const buyerStats = [
    { title: 'Active Campaigns', value: '12', icon: FiFileText, color: 'bg-blue-500' },
    { title: 'Total Spent', value: '$2,450', icon: FiDollarSign, color: 'bg-green-500' },
    { title: 'Published Posts', value: '28', icon: FiTrendingUp, color: 'bg-purple-500' },
    { title: 'Avg. DA Score', value: '65', icon: FiEye, color: 'bg-orange-500' }
  ];

  const publisherStats = [
    { title: 'Active Listings', value: '5', icon: FiFileText, color: 'bg-blue-500' },
    { title: 'Total Earnings', value: '$1,875', icon: FiDollarSign, color: 'bg-green-500' },
    { title: 'Orders Completed', value: '23', icon: FiTrendingUp, color: 'bg-purple-500' },
    { title: 'Rating', value: '4.8/5', icon: FiUsers, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { action: 'New order received', time: '2 hours ago', status: 'pending' },
    { action: 'Content published', time: '1 day ago', status: 'completed' },
    { action: 'Payment received', time: '2 days ago', status: 'completed' },
    { action: 'New listing approved', time: '3 days ago', status: 'completed' }
  ];

  const stats = user?.role === 'publisher' ? publisherStats : buyerStats;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'publisher' 
              ? 'Manage your website listings and track your performance'
              : 'Track your campaigns and discover new opportunities'
            }
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {user?.role === 'publisher' ? (
                  <>
                    <Link to="/create-listing" className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <SafeIcon icon={FiPlus} className="h-5 w-5 mr-2" />
                      Create New Listing
                    </Link>
                    <Link to="/my-websites" className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <SafeIcon icon={FiEye} className="h-5 w-5 mr-2" />
                      My Websites
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/marketplace" className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <SafeIcon icon={FiEye} className="h-5 w-5 mr-2" />
                      Browse Marketplace
                    </Link>
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <SafeIcon icon={FiTrendingUp} className="h-5 w-5 mr-2" />
                      Campaign Analytics
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;