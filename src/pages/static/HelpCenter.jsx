import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { SEO, SchemaMarkup } from '../../utils/seoUtils';

const { FiSearch, FiBookOpen, FiHelpCircle, FiFileText, FiChevronRight, FiArrowRight, FiUsers, FiDollarSign, FiEdit } = FiIcons;

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: FiBookOpen,
      color: 'bg-blue-100 text-blue-600',
      articles: [
        { id: 'welcome', title: 'Welcome to PR GuestPost', slug: 'welcome-to-pr-guestpost' },
        { id: 'account', title: 'Creating Your Account', slug: 'creating-your-account' },
        { id: 'dashboard', title: 'Navigating Your Dashboard', slug: 'navigating-your-dashboard' },
        { id: 'marketplace', title: 'Using the Marketplace', slug: 'using-the-marketplace' }
      ]
    },
    {
      id: 'for-publishers',
      title: 'For Publishers',
      icon: FiEdit,
      color: 'bg-purple-100 text-purple-600',
      articles: [
        { id: 'listing', title: 'Creating Your First Listing', slug: 'creating-your-first-listing' },
        { id: 'metrics', title: 'Website Metrics and Pricing', slug: 'website-metrics-and-pricing' },
        { id: 'guidelines', title: 'Setting Content Guidelines', slug: 'setting-content-guidelines' },
        { id: 'managing', title: 'Managing Guest Post Orders', slug: 'managing-guest-post-orders' },
        { id: 'payouts', title: 'Publisher Payouts Explained', slug: 'publisher-payouts-explained' }
      ]
    },
    {
      id: 'for-buyers',
      title: 'For Buyers',
      icon: FiUsers,
      color: 'bg-green-100 text-green-600',
      articles: [
        { id: 'finding', title: 'Finding the Right Websites', slug: 'finding-the-right-websites' },
        { id: 'purchasing', title: 'Purchasing a Guest Post', slug: 'purchasing-a-guest-post' },
        { id: 'content', title: 'Content Requirements', slug: 'content-requirements' },
        { id: 'tracking', title: 'Tracking Your Orders', slug: 'tracking-your-orders' },
        { id: 'revisions', title: 'Requesting Revisions', slug: 'requesting-revisions' }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: FiDollarSign,
      color: 'bg-yellow-100 text-yellow-600',
      articles: [
        { id: 'methods', title: 'Payment Methods', slug: 'payment-methods' },
        { id: 'security', title: 'Payment Security', slug: 'payment-security' },
        { id: 'refunds', title: 'Refund Policy', slug: 'refund-policy' },
        { id: 'invoices', title: 'Accessing Invoices', slug: 'accessing-invoices' },
        { id: 'tax', title: 'Tax Information', slug: 'tax-information' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: FiHelpCircle,
      color: 'bg-red-100 text-red-600',
      articles: [
        { id: 'account-issues', title: 'Account Issues', slug: 'account-issues' },
        { id: 'order-problems', title: 'Order Problems', slug: 'order-problems' },
        { id: 'payment-issues', title: 'Payment Issues', slug: 'payment-issues' },
        { id: 'publisher-issues', title: 'Publisher Issues', slug: 'publisher-issues' },
        { id: 'technical-issues', title: 'Technical Issues', slug: 'technical-issues' }
      ]
    },
    {
      id: 'policies',
      title: 'Policies & Guidelines',
      icon: FiFileText,
      color: 'bg-indigo-100 text-indigo-600',
      articles: [
        { id: 'terms', title: 'Terms of Service', slug: 'terms-of-service' },
        { id: 'privacy', title: 'Privacy Policy', slug: 'privacy-policy' },
        { id: 'content-policy', title: 'Content Policy', slug: 'content-policy' },
        { id: 'refund-policy', title: 'Refund Policy', slug: 'refund-policy' },
        { id: 'dispute', title: 'Dispute Resolution', slug: 'dispute-resolution' }
      ]
    }
  ];

  // Popular articles across all categories
  const popularArticles = [
    { id: 'getting-started-welcome', title: 'Welcome to PR GuestPost', category: 'Getting Started', slug: 'welcome-to-pr-guestpost' },
    { id: 'for-publishers-payouts', title: 'Publisher Payouts Explained', category: 'For Publishers', slug: 'publisher-payouts-explained' },
    { id: 'for-buyers-finding', title: 'Finding the Right Websites', category: 'For Buyers', slug: 'finding-the-right-websites' },
    { id: 'payments-refunds', title: 'Refund Policy', category: 'Payments & Billing', slug: 'refund-policy' },
    { id: 'troubleshooting-order-problems', title: 'Order Problems', category: 'Troubleshooting', slug: 'order-problems' }
  ];

  // Filter categories and articles based on search
  const filteredCategories = searchTerm
    ? categories.map(category => ({
        ...category,
        articles: category.articles.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.articles.length > 0)
    : categories;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Help Center | PR GuestPost Marketplace"
        description="Find comprehensive guides, tutorials, and support resources to help you make the most of PR GuestPost's guest posting marketplace."
        keywords="help center, support, tutorials, guides, FAQ, PR GuestPost, guest posting, troubleshooting"
        canonical="https://prguest.com/help-center"
      />
      
      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: categories.flatMap(category => 
            category.articles.map(article => ({
              "@type": "Question",
              "name": article.title,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `You can find detailed information about this topic in our Help Center article: ${article.title}.`
              }
            }))
          )
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers, guides, and resources to help you make the most of PR GuestPost's marketplace.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Popular Articles */}
        {!searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/help-center/article/${article.slug}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {article.category}
                  </p>
                  <div className="flex items-center text-primary-600">
                    <span className="text-sm">Read article</span>
                    <SafeIcon icon={FiArrowRight} className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Help Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mr-3`}>
                  <SafeIcon icon={category.icon} className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {category.articles.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {category.articles.map((article) => (
                      <li key={article.id}>
                        <Link
                          to={`/help-center/article/${article.slug}`}
                          className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">{article.title}</h3>
                            <SafeIcon icon={FiChevronRight} className="h-5 w-5 text-gray-400" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No articles found in this category.
                  </div>
                )}
              </div>
              
              {!searchTerm && (
                <div className="mt-4 text-right">
                  <Link
                    to={`/help-center/category/${category.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    View all {category.title} articles
                    <SafeIcon icon={FiArrowRight} className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <SafeIcon icon={FiSearch} className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse our categories</p>
            </div>
          )}
        </div>
        
        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary-50 rounded-xl shadow-sm border border-primary-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is ready to assist you with any questions or issues you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Visit FAQ
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;