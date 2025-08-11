import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { SEO, BreadcrumbSchema } from '../utils/seoUtils';
import { NICHES } from '../data/niches';
import { format } from 'date-fns';

const { FiSearch, FiCalendar, FiUser, FiTag, FiArrowRight } = FiIcons;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // State for blog posts
  const [blogPosts, setBlogPosts] = useState([]);
  
  // Load blog posts from localStorage
  useEffect(() => {
    // Get blog posts from localStorage
    const storedBlogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    
    // Filter only published posts
    const publishedPosts = storedBlogPosts.filter(post => post.status === 'published');
    
    // Process dates and add read time if not present
    const processedPosts = publishedPosts.map(post => ({
      ...post,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      readTime: post.readTime || `${Math.ceil(post.content.length / 1000)} min read` // Estimate read time based on content length
    }));
    
    setBlogPosts(processedPosts);
  }, []);

  // Get blog categories from posts
  const categories = [...new Set(blogPosts.map(post => post.nicheName))];

  // Filter posts based on search and category
  const filteredPosts = blogPosts
    .filter(post => 
      (searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (selectedCategory === '' || post.nicheName === selectedCategory)
    );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Featured post (most recent)
  const featuredPost = blogPosts.sort((a, b) => b.publishedAt - a.publishedAt)[0];

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Blog | PR GuestPost Marketplace"
        description="Explore our blog for expert insights on guest posting, content marketing, SEO strategies, and digital PR to enhance your online presence and authority."
        keywords="guest posting, content marketing, SEO, digital PR, blog, marketing strategies"
        canonical="https://prguest.com/blog"
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://prguest.com/' },
          { name: 'Blog', url: 'https://prguest.com/blog' }
        ]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PR GuestPost Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights on guest posting, content marketing, and building your online authority
          </p>
        </motion.div>
        
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Link to={`/blog/${featuredPost.slug}`} className="block">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800">
                      {featuredPost.nicheName}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                      {format(featuredPost.publishedAt, 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 flex items-center">
                        <SafeIcon icon={FiUser} className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                    </div>
                    <span className="text-primary-600 hover:text-primary-700 flex items-center font-medium">
                      Read more
                      <SafeIcon icon={FiArrowRight} className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
        
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Blog Posts Grid */}
        <div className="mb-12">
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center mb-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800">
                            {post.nicheName}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {format(post.publishedAt, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                          <span className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                            Read more
                            <SafeIcon icon={FiArrowRight} className="ml-1 h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <SafeIcon icon={FiSearch} className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or browse different categories</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center space-x-1"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </motion.div>
        )}
        
        {/* Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-primary-50 rounded-xl shadow-sm border border-primary-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Stay updated with the latest insights, tips, and strategies for effective guest posting and content marketing.
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;