import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { SEO, BreadcrumbSchema, SchemaMarkup } from '../utils/seoUtils';
import { format } from 'date-fns';

const { FiCalendar, FiUser, FiTag, FiShare2, FiTwitter, FiLinkedin, FiFacebook, FiMail, FiArrowRight } = FiIcons;

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load blog posts from localStorage
  const [blogPosts, setBlogPosts] = useState([]);

  // Load blog posts from localStorage on component mount
  useEffect(() => {
    try {
      // Get blog posts from localStorage
      const storedPosts = localStorage.getItem('blogPosts');
      
      if (storedPosts) {
        // Parse the stored posts and ensure dates are properly converted
        const parsedPosts = JSON.parse(storedPosts).map(post => ({
          ...post,
          publishedAt: new Date(post.publishedAt)
        }));
        setBlogPosts(parsedPosts);
      }
    } catch (error) {
      console.error('Error loading blog posts from localStorage:', error);
      // If there's an error, set an empty array
      setBlogPosts([]);
    }
  }, []);

  useEffect(() => {
    // Only proceed if blogPosts has been loaded and slug is available
    if (blogPosts.length > 0 && slug) {
      setLoading(true);
      
      // Find the post with matching slug
      const foundPost = blogPosts.find(post => post.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Find related posts (same category or tags)
        const related = blogPosts
          .filter(p => 
            p.id !== foundPost.id && 
            (p.nicheId === foundPost.nicheId || 
             p.tags.some(tag => foundPost.tags.includes(tag)))
          )
          .slice(0, 3);
        
        setRelatedPosts(related);
      }
      
      setLoading(false);
      
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [blogPosts, slug]); // Depend on blogPosts and slug

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title={`${post.title} | PR GuestPost Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        canonical={`https://prguest.com/blog/${post.slug}`}
        ogImage={post.featuredImage}
        ogType="article"
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://prguest.com/' },
          { name: 'Blog', url: 'https://prguest.com/blog' },
          { name: post.title, url: `https://prguest.com/blog/${post.slug}` }
        ]}
      />
      
      <SchemaMarkup
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage,
          datePublished: post.publishedAt.toISOString(),
          author: {
            "@type": "Person",
            name: post.author
          },
          publisher: {
            "@type": "Organization",
            name: "PR GuestPost",
            logo: {
              "@type": "ImageObject",
              url: "https://prguest.com/images/logo.png"
            }
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://prguest.com/blog/${post.slug}`
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mb-8"
          >
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{post.title}</span>
          </motion.div>
          
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center mb-4">
              <Link 
                to={`/blog?category=${post.nicheName}`} 
                className="text-sm px-3 py-1 rounded-full bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
              >
                {post.nicheName}
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center mb-2 sm:mb-0">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                    <span>{format(post.publishedAt, 'MMMM dd, yyyy')}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 mr-2">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?url=https://prguest.com/blog/${post.slug}&text=${post.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiTwitter} className="h-4 w-4" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://prguest.com/blog/${post.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiLinkedin} className="h-4 w-4" />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://prguest.com/blog/${post.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiFacebook} className="h-4 w-4" />
                </a>
                <a 
                  href={`mailto:?subject=${post.title}&body=Check out this article: https://prguest.com/blog/${post.slug}`} 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiMail} className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
          
          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center">
              <SafeIcon icon={FiTag} className="h-5 w-5 text-gray-500 mr-3" />
              {post.tags.map(tag => (
                <Link 
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="mr-2 mb-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          
          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-12"
          >
            <div className="flex items-center">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">About {post.author}</h3>
                <p className="text-gray-600">{post.authorBio}</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 inline-block mb-3 w-fit">
                        {relatedPost.nicheName}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">{relatedPost.readTime}</span>
                        <span className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                          Read more
                          <SafeIcon icon={FiArrowRight} className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="bg-primary-50 rounded-xl shadow-sm border border-primary-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enjoyed this article?</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive more insights on guest posting, content marketing, and SEO.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;