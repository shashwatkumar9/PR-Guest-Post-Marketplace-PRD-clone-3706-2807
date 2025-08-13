import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe, FiDollarSign, FiClock, FiFileText, FiInfo } = FiIcons;

const CreateListing = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const basePrice = watch('basePrice');
  const finalPrice = basePrice ? Math.round(basePrice * 1.25) : 0;

  const niches = [
    'Technology', 'Health & Wellness', 'Finance', 'Business', 'Lifestyle',
    'Travel', 'Food & Cooking', 'Fashion', 'Education', 'Sports',
    'Entertainment', 'Science', 'Environment', 'Politics', 'Real Estate'
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Listing created successfully! It will be reviewed by our team.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Listing
          </h1>
          <p className="text-gray-600">
            List your website for guest post opportunities and start earning revenue
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Website Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Website Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiGlobe} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('websiteUrl', {
                      required: 'Website URL is required',
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL'
                      }
                    })}
                    type="url"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
                {errors.websiteUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.websiteUrl.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Title *
                </label>
                <input
                  {...register('title', {
                    required: 'Website title is required',
                    minLength: {
                      value: 5,
                      message: 'Title must be at least 5 characters'
                    }
                  })}
                  type="text"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="My Awesome Blog"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Niche *
                </label>
                <select
                  {...register('niche', { required: 'Please select a niche' })}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a niche</option>
                  {niches.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
                {errors.niche && (
                  <p className="mt-1 text-sm text-red-600">{errors.niche.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Authority (DA)
                </label>
                <input
                  {...register('domainAuthority', {
                    min: { value: 1, message: 'DA must be at least 1' },
                    max: { value: 100, message: 'DA cannot exceed 100' }
                  })}
                  type="number"
                  min="1"
                  max="100"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="65"
                />
                {errors.domainAuthority && (
                  <p className="mt-1 text-sm text-red-600">{errors.domainAuthority.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Traffic
                </label>
                <input
                  {...register('monthlyTraffic')}
                  type="text"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="50K"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turnaround Time *
                </label>
                <select
                  {...register('turnaround', { required: 'Please select turnaround time' })}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select turnaround time</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="2-3 days">2-3 days</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="5-7 days">5-7 days</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                </select>
                {errors.turnaround && (
                  <p className="mt-1 text-sm text-red-600">{errors.turnaround.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Description *
              </label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 50,
                    message: 'Description must be at least 50 characters'
                  }
                })}
                rows={4}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe your website, audience, and what makes it valuable for guest posts..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Base Price (USD) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('basePrice', {
                      required: 'Base price is required',
                      min: { value: 10, message: 'Minimum price is $10' },
                      max: { value: 5000, message: 'Maximum price is $5000' }
                    })}
                    type="number"
                    min="10"
                    max="5000"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
                {errors.basePrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.basePrice.message}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">Amount you'll receive</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Fee (25%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={basePrice ? (basePrice * 0.25).toFixed(0) : '0'}
                    disabled
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Automatic calculation</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Price for Buyers
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiDollarSign} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={finalPrice}
                    disabled
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-semibold"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">What buyers will pay</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex">
                <SafeIcon icon={FiInfo} className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Pricing Information</p>
                  <p>Our platform charges a 25% commission on all transactions. This fee covers payment processing, platform maintenance, and customer support.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Guidelines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Guidelines</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Word Count
                </label>
                <input
                  {...register('minWordCount', {
                    min: { value: 300, message: 'Minimum word count should be at least 300' }
                  })}
                  type="number"
                  min="300"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="1000"
                />
                {errors.minWordCount && (
                  <p className="mt-1 text-sm text-red-600">{errors.minWordCount.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Backlinks Allowed
                </label>
                <input
                  {...register('maxBacklinks', {
                    min: { value: 1, message: 'Must allow at least 1 backlink' },
                    max: { value: 10, message: 'Maximum 10 backlinks allowed' }
                  })}
                  type="number"
                  min="1"
                  max="10"
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="2"
                />
                {errors.maxBacklinks && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxBacklinks.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Guidelines & Requirements
                </label>
                <textarea
                  {...register('contentGuidelines')}
                  rows={4}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Specify your content requirements, style preferences, prohibited topics, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center">
                    <input
                      {...register('allowDoFollow')}
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow do-follow links</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      {...register('requireOriginalContent')}
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require original content only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateListing;