import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiFileText, FiDollarSign, FiTrendingUp, FiAlertCircle, FiCheckCircle } = FiIcons;

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', icon: FiUsers, color: 'bg-blue-500' },
    { title: 'Active Listings', value: '1,247', change: '+8%', icon: FiFileText, color: 'bg-green-500' },
    { title: 'Total Revenue', value: '$45,231', change: '+23%', icon: FiDollarSign, color: 'bg-purple-500' },
    { title: 'Growth Rate', value: '15.3%', change: '+2.1%', icon: FiTrendingUp, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { type: 'user_registration', message: 'New user registered: john@example.com', time: '2 minutes ago', status: 'info' },
    { type: 'listing_approval', message: 'Listing approved: Tech Blog Guest Post', time: '15 minutes ago', status: 'success' },
    { type: 'payment_processed', message: 'Payment processed: $125.00', time: '1 hour ago', status: 'success' },
    { type: 'dispute_raised', message: 'Dispute raised for order #ORD-123', time: '2 hours ago', status: 'warning' },
    { type: 'listing_rejected', message: 'Listing rejected: Low quality content', time: '3 hours ago', status: 'error' }
  ];

  const pendingActions = [
    { title: 'Listings Pending Review', count: 12, action: 'Review Now' },
    { title: 'User Verifications', count: 8, action: 'Verify' },
    { title: 'Disputes to Resolve', count: 3, action: 'Resolve' },
    { title: 'Payout Requests', count: 15, action: 'Process' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return FiCheckCircle;
      case 'warning':
        return FiAlertCircle;
      case 'error':
        return FiAlertCircle;
      default:
        return FiUsers;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor platform performance and manage operations</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`mt-1 ${getStatusColor(activity.status)}`}>
                  <SafeIcon icon={getStatusIcon(activity.status)} className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h2>
          <div className="space-y-4">
            {pendingActions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-lg font-bold text-primary-600">{item.count}</p>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Active Publishers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">892</div>
            <div className="text-sm text-gray-600">Active Buyers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">3,421</div>
            <div className="text-sm text-gray-600">Orders Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98.5%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;