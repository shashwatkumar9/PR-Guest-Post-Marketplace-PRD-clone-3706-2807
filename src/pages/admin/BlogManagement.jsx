import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { NICHES } from '../../data/niches';
import { generateSlug } from '../../utils/seoUtils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { FiSearch, FiEdit, FiTrash2, FiEye, FiPlus, FiX, FiImage, FiSave, FiTag, FiCalendar, FiUser } = FiIcons;

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    nicheId: '',
    tags: '',
    metaTitle: '',
    metaDescription: ''
  });

  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "10 Strategies for Effective Guest Posting in 2024",
      slug: "strategies-effective-guest-posting-2024",
      excerpt: "Learn the top strategies for successful guest posting campaigns that drive traffic and build authority.",
      content: "<p>Full content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "marketing",
      nicheName: "Marketing & Advertising",
      tags: ["guest posting", "content marketing", "SEO"],
      author: "Admin",
      publishedAt: new Date("2024-01-15"),
      status: "published",
      views: 1245
    },
    {
      id: 2,
      title: "How to Choose the Right Websites for Your Guest Posts",
      slug: "choose-right-websites-guest-posts",
      excerpt: "Discover how to identify and select high-quality websites for your guest posting strategy.",
      content: "<p>Full content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "marketing",
      nicheName: "Marketing & Advertising",
      tags: ["website selection", "domain authority", "guest posting"],
      author: "Admin",
      publishedAt: new Date("2024-02-10"),
      status: "published",
      views: 978
    },
    {
      id: 3,
      title: "The Impact of Guest Posting on SEO Performance",
      slug: "impact-guest-posting-seo-performance",
      excerpt: "Analyze how guest posting affects your website's search engine rankings and overall SEO strategy.",
      content: "<p>Full content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "seo",
      nicheName: "SEO",
      tags: ["SEO", "backlinks", "domain authority"],
      author: "Admin",
      publishedAt: new Date("2024-03-05"),
      status: "published",
      views: 1543
    },
    {
      id: 4,
      title: "Writing Compelling Guest Post Pitches That Get Accepted",
      slug: "writing-compelling-guest-post-pitches",
      excerpt: "Learn how to craft guest post pitches that stand out and get accepted by top publishers.",
      content: "<p>Draft content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "writing",
      nicheName: "Writing",
      tags: ["pitching", "content writing", "outreach"],
      author: "Admin",
      publishedAt: null,
      status: "draft",
      views: 0
    },
    {
      id: 5,
      title: "Measuring ROI from Your Guest Posting Campaigns",
      slug: "measuring-roi-guest-posting-campaigns",
      excerpt: "Discover effective methods to track and measure the return on investment from your guest posting efforts.",
      content: "<p>Draft content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "business",
      nicheName: "Business",
      tags: ["ROI", "analytics", "marketing metrics"],
      author: "Admin",
      publishedAt: null,
      status: "draft",
      views: 0
    }
  ];

  // Filter blog posts based on search term
  const filteredPosts = searchTerm
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.nicheName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : blogPosts;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If title is changing, also update the slug
    if (name === 'title') {
      setFormData({
        ...formData,
        [name]: value,
        slug: generateSlug(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content
    });
    setEditorState(content);
  };

  const handleCreateNewPost = () => {
    setSelectedBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      nicheId: '',
      tags: '',
      metaTitle: '',
      metaDescription: ''
    });
    setEditorState('');
    setShowModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedBlog(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      nicheId: post.nicheId,
      tags: post.tags.join(', '),
      metaTitle: post.title,
      metaDescription: post.excerpt
    });
    setEditorState(post.content);
    setShowModal(true);
  };

  const handleDeletePost = (postId) => {
    // In a real app, this would be an API call
    toast.success('Blog post deleted successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would be an API call to create/update the post
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(selectedBlog ? 'Blog post updated successfully' : 'Blog post created successfully');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
            <p className="text-gray-600">Create and manage blog posts for your marketplace</p>
          </div>
          <button 
            onClick={handleCreateNewPost}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
          >
            <SafeIcon icon={FiPlus} className="h-5 w-5 mr-2" />
            New Blog Post
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {NICHES.map(niche => (
                <option key={niche.id} value={niche.id}>{niche.name}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Blog Posts Table */}
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
                  Blog Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                      {post.nicheName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.publishedAt 
                      ? format(post.publishedAt, 'MMM dd, yyyy')
                      : 'Not published'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <SafeIcon icon={FiEdit} className="h-5 w-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="View"
                      >
                        <SafeIcon icon={FiEye} className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <SafeIcon icon={FiTrash2} className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SafeIcon icon={FiSearch} className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600">Try adjusting your search or create a new blog post</p>
          </div>
        )}
      </motion.div>

      {/* Blog Post Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Blog post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              {/* Featured Image and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image URL
                  </label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiImage} className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        name="featuredImage"
                        value={formData.featuredImage}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="nicheId"
                    value={formData.nicheId}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {NICHES.map(niche => (
                      <option key={niche.id} value={niche.id}>{niche.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief description of the blog post"
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <div className="border border-gray-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={editorState}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    className="h-64"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiTag} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              {/* SEO Section */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="SEO title (default: post title)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      rows={2}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="SEO description (default: post excerpt)"
                    />
                  </div>
                </div>
              </div>

              {/* Publishing Options */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Options</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="draft"
                      name="status"
                      value="draft"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="draft" className="ml-2 block text-sm text-gray-700">
                      Save as Draft
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="publish"
                      name="status"
                      value="published"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="publish" className="ml-2 block text-sm text-gray-700">
                      Publish Immediately
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  <SafeIcon icon={FiSave} className="mr-2 h-5 w-5" />
                  {loading ? 'Saving...' : (selectedBlog ? 'Update Post' : 'Save Post')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;