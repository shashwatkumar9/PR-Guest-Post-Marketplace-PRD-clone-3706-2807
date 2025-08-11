import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiDollarSign, FiMail, FiShield, FiGlobe } = FiIcons;

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('platform');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      platformCommission: 20,
      minimumPayout: 50,
      payoutSchedule: 'monthly',
      smtpHost: '',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'noreply@prguest.com',
      twoFactorRequired: false,
      emailVerificationRequired: true,
      platformName: 'PR GuestPost',
      platformUrl: 'https://prguest.com',
      supportEmail: 'support@prguest.com',
      maintenanceMode: false
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'platform', label: 'Platform Settings', icon: FiGlobe },
    { id: 'payment', label: 'Payment Settings', icon: FiDollarSign },
    { id: 'email', label: 'Email Settings', icon: FiMail },
    { id: 'security', label: 'Security Settings', icon: FiShield }
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
        <p className="text-gray-600">Configure platform-wide settings and preferences</p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <SafeIcon icon={tab.icon} className="mr-2 h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {activeTab === 'platform' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    {...register('platformName', { required: 'Platform name is required' })}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.platformName && (
                    <p className="mt-1 text-sm text-red-600">{errors.platformName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform URL
                  </label>
                  <input
                    {...register('platformUrl', { required: 'Platform URL is required' })}
                    type="url"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.platformUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.platformUrl.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <input
                    {...register('supportEmail', { required: 'Support email is required' })}
                    type="email"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.supportEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.supportEmail.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    {...register('maintenanceMode')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Maintenance Mode
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'payment' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Commission (%)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">%</span>
                    </div>
                    <input
                      {...register('platformCommission', {
                        required: 'Commission is required',
                        min: { value: 1, message: 'Minimum 1%' },
                        max: { value: 50, message: 'Maximum 50%' }
                      })}
                      type="number"
                      min="1"
                      max="50"
                      className="block w-full pr-8 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  {errors.platformCommission && (
                    <p className="mt-1 text-sm text-red-600">{errors.platformCommission.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Current: 25% (hidden from users)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Payout Amount ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('minimumPayout', {
                        required: 'Minimum payout is required',
                        min: { value: 10, message: 'Minimum $10' }
                      })}
                      type="number"
                      min="10"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  {errors.minimumPayout && (
                    <p className="mt-1 text-sm text-red-600">{errors.minimumPayout.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payout Schedule
                  </label>
                  <select
                    {...register('payoutSchedule', { required: 'Payout schedule is required' })}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  {errors.payoutSchedule && (
                    <p className="mt-1 text-sm text-red-600">{errors.payoutSchedule.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'email' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    {...register('smtpHost')}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    {...register('smtpPort')}
                    type="number"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="587"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Username
                  </label>
                  <input
                    {...register('smtpUsername')}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Password
                  </label>
                  <input
                    {...register('smtpPassword')}
                    type="password"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Email Address
                  </label>
                  <input
                    {...register('fromEmail', { required: 'From email is required' })}
                    type="email"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {errors.fromEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.fromEmail.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Configuration</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    {...register('twoFactorRequired')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Require Two-Factor Authentication for all users
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    {...register('emailVerificationRequired')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Require Email Verification for new accounts
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <SafeIcon icon={FiShield} className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                    <div className="text-sm text-yellow-700">
                      <p className="font-medium">Security Notice</p>
                      <p>Enabling two-factor authentication will require all existing users to set up 2FA on their next login.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <SafeIcon icon={FiSave} className="h-5 w-5 mr-2" />
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;