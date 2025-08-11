import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const { FiDollarSign, FiDownload, FiEye, FiFilter, FiCalendar } = FiIcons;

const Transactions = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const { user } = useAuth();

  const transactions = [
    {
      id: 'TXN-001',
      type: 'payment_received',
      amount: 100,
      fee: 25,
      netAmount: 75,
      status: 'completed',
      date: new Date('2024-01-15'),
      description: 'Guest post on TechCrunch Style Blog',
      buyer: 'John Smith',
      orderId: 'ORD-123'
    },
    {
      id: 'TXN-002',
      type: 'payment_sent',
      amount: 150,
      fee: 3.5,
      netAmount: 153.5,
      status: 'completed',
      date: new Date('2024-01-14'),
      description: 'Guest post on Financial Advisory Blog',
      publisher: 'Sarah Johnson',
      orderId: 'ORD-124'
    },
    {
      id: 'TXN-003',
      type: 'payment_received',
      amount: 80,
      fee: 20,
      netAmount: 60,
      status: 'pending',
      date: new Date('2024-01-13'),
      description: 'Guest post on Health & Wellness Magazine',
      buyer: 'Mike Wilson',
      orderId: 'ORD-125'
    },
    {
      id: 'TXN-004',
      type: 'payment_sent',
      amount: 125,
      fee: 3.2,
      netAmount: 128.2,
      status: 'completed',
      date: new Date('2024-01-12'),
      description: 'Guest post on Business Growth Hub',
      publisher: 'Alex Chen',
      orderId: 'ORD-126'
    },
    {
      id: 'TXN-005',
      type: 'payout',
      amount: 235,
      fee: 0,
      netAmount: 235,
      status: 'completed',
      date: new Date('2024-01-10'),
      description: 'Monthly payout to bank account',
      payoutMethod: 'Bank Transfer'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    return transaction.type === selectedFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'payment_received':
        return 'text-green-600';
      case 'payment_sent':
        return 'text-blue-600';
      case 'payout':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'payment_received':
        return '+';
      case 'payment_sent':
        return '-';
      case 'payout':
        return '↗';
      default:
        return '';
    }
  };

  const totalEarnings = transactions
    .filter(t => t.type === 'payment_received' && t.status === 'completed')
    .reduce((sum, t) => sum + t.netAmount, 0);

  const totalSpent = transactions
    .filter(t => t.type === 'payment_sent' && t.status === 'completed')
    .reduce((sum, t) => sum + t.netAmount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + (t.type === 'payment_received' ? t.netAmount : t.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
          <p className="text-gray-600">View and manage your payment history</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-blue-600">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Transactions</option>
                <option value="payment_received">Payments Received</option>
                <option value="payment_sent">Payments Sent</option>
                <option value="payout">Payouts</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.description}
                        </div>
                        {transaction.orderId && (
                          <div className="text-xs text-gray-400">
                            Order: {transaction.orderId}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                        {transaction.type === 'payment_received' && 'Payment Received'}
                        {transaction.type === 'payment_sent' && 'Payment Sent'}
                        {transaction.type === 'payout' && 'Payout'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className={`font-medium ${getTypeColor(transaction.type)}`}>
                          {getTypeIcon(transaction.type)}${transaction.netAmount.toFixed(2)}
                        </div>
                        {transaction.fee > 0 && user?.role === 'admin' && (
                          <div className="text-xs text-gray-500">
                            Fee: ${transaction.fee.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(transaction.date, 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary-600 hover:text-primary-900">
                        <SafeIcon icon={FiEye} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <SafeIcon icon={FiDollarSign} className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">No transactions match your current filters</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Transactions;