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

  // Mock blog posts data (in a real app, this would come from an API call)
  const blogPosts = [
    {
      id: 1,
      title: "10 Strategies for Effective Guest Posting in 2024",
      slug: "strategies-effective-guest-posting-2024",
      excerpt: "Learn the top strategies for successful guest posting campaigns that drive traffic and build authority in today's competitive digital landscape.",
      content: `
        <h2>Introduction to Guest Posting in 2024</h2>
        <p>Guest posting remains one of the most effective strategies for building backlinks, increasing brand awareness, and establishing authority in your industry. As we move through 2024, the landscape continues to evolve, with search engines becoming smarter and audiences more discerning.</p>
        <p>In this comprehensive guide, we'll explore the most effective guest posting strategies that are working right now, backed by data and real-world examples.</p>
        
        <h2>1. Focus on Relevance Over Domain Authority</h2>
        <p>While domain authority has traditionally been the primary metric for evaluating guest posting opportunities, relevance has become increasingly important. Google's algorithms now prioritize contextual relevance over raw domain metrics.</p>
        <p>A highly relevant site with moderate authority will often provide more value than a high-authority site with minimal topical relevance to your business.</p>
        
        <h2>2. Create Data-Driven, Original Content</h2>
        <p>Publishers are increasingly selective about the content they accept. Generic, rehashed articles no longer make the cut. Instead, focus on creating:</p>
        <ul>
          <li>Original research and surveys</li>
          <li>Data-backed insights and analysis</li>
          <li>Expert interviews and unique perspectives</li>
          <li>Case studies from your own experience</li>
        </ul>
        <p>This approach not only increases your acceptance rate but also maximizes the impact of your published content.</p>
        
        <h2>3. Build Relationships Before Pitching</h2>
        <p>Cold outreach success rates continue to decline as publishers are inundated with guest post requests. Instead of immediate pitching, focus on relationship building:</p>
        <ul>
          <li>Engage with the publisher's content on social media</li>
          <li>Leave thoughtful comments on their existing articles</li>
          <li>Share their content with your audience</li>
          <li>Connect on LinkedIn or Twitter before pitching</li>
        </ul>
        <p>Publishers are much more receptive to contributors they recognize and have interacted with previously.</p>
        
        <h2>4. Leverage Multimedia Content</h2>
        <p>Text-only guest posts are becoming less engaging in today's visual-first internet. Enhance your guest posts with:</p>
        <ul>
          <li>Custom infographics and data visualizations</li>
          <li>Embedded videos or tutorials</li>
          <li>Interactive elements where appropriate</li>
          <li>High-quality, original images</li>
        </ul>
        <p>Publishers value content that keeps visitors engaged longer and reduces bounce rates.</p>
        
        <h2>5. Prioritize User Experience and Readability</h2>
        <p>With Google's Core Web Vitals and user experience signals gaining importance, ensure your guest posts are:</p>
        <ul>
          <li>Well-structured with clear headings</li>
          <li>Written in scannable, concise paragraphs</li>
          <li>Free of excessive jargon</li>
          <li>Mobile-friendly in layout and formatting</li>
        </ul>
        <p>Publishers increasingly favor content that contributes to positive site metrics.</p>
        
        <h2>6. Target Industry-Specific Publications</h2>
        <p>Rather than pursuing general high-authority sites, focus on publications specifically serving your industry. These targeted placements often deliver:</p>
        <ul>
          <li>More qualified referral traffic</li>
          <li>Higher engagement rates</li>
          <li>Better conversion potential</li>
          <li>More valuable industry connections</li>
        </ul>
        <p>A guest post on a niche site with 10,000 targeted monthly visitors often outperforms one on a general site with millions of irrelevant visitors.</p>
        
        <h2>7. Optimize Author Bios for Conversion</h2>
        <p>Your author bio is not just a credential space—it's a mini-conversion opportunity. Effective author bios:</p>
        <ul>
          <li>Establish relevant expertise quickly</li>
          <li>Include a specific call-to-action</li>
          <li>Link to a targeted landing page, not just your homepage</li>
          <li>Offer a specific resource related to the article topic</li>
        </ul>
        <p>Customizing your bio for each guest post can significantly increase click-through rates.</p>
        
        <h2>8. Create Comprehensive Content</h2>
        <p>Superficial, thin content rarely performs well in today's content ecosystem. Instead, create comprehensive resources that:</p>
        <ul>
          <li>Cover topics in substantial depth (1500+ words where appropriate)</li>
          <li>Answer all related questions a reader might have</li>
          <li>Provide actionable takeaways and implementation steps</li>
          <li>Link to high-quality supporting resources</li>
        </ul>
        <p>This approach positions your guest contributions as authoritative resources rather than basic articles.</p>
        
        <h2>9. Leverage Strategic Internal Linking</h2>
        <p>When appropriate and permitted by the publisher, include contextual links to other articles on their site. This practice:</p>
        <ul>
          <li>Demonstrates familiarity with their content</li>
          <li>Increases the value of your contribution</li>
          <li>Improves user experience through relevant resources</li>
          <li>Builds goodwill with the editorial team</li>
        </ul>
        <p>Publishers appreciate contributors who help strengthen their overall site architecture.</p>
        
        <h2>10. Measure and Refine Your Strategy</h2>
        <p>Effective guest posting requires continuous optimization. Track key metrics including:</p>
        <ul>
          <li>Referral traffic quality and quantity</li>
          <li>Conversion rates from guest post traffic</li>
          <li>Engagement metrics (time on page, bounce rate)</li>
          <li>SEO impact over time</li>
          <li>Relationship development with publishers</li>
        </ul>
        <p>Use these insights to refine your approach, doubling down on what works and adjusting what doesn't.</p>
        
        <h2>Conclusion</h2>
        <p>Guest posting remains a powerful strategy when executed with quality and strategic intent. By implementing these ten strategies, you'll maximize the impact of your guest posting campaigns in 2024 and beyond, building valuable backlinks, increasing brand visibility, and establishing industry authority.</p>
        <p>Remember that consistency is key—a sustained guest posting strategy yields compounding benefits over time, while sporadic efforts rarely deliver meaningful results.</p>
      `,
      featuredImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "marketing",
      nicheName: "Marketing & Advertising",
      tags: ["guest posting", "content marketing", "SEO"],
      author: "Jessica Miller",
      authorBio: "Jessica Miller is a Content Marketing Strategist with over 10 years of experience in digital marketing and SEO. She has helped numerous businesses improve their online visibility through effective content strategies.",
      authorAvatar: "https://ui-avatars.com/api/?name=Jessica+Miller&background=0ea5e9&color=fff",
      publishedAt: new Date("2024-01-15"),
      readTime: "8 min read",
      views: 1245
    },
    {
      id: 2,
      title: "How to Choose the Right Websites for Your Guest Posts",
      slug: "choose-right-websites-guest-posts",
      excerpt: "Discover how to identify and select high-quality websites for your guest posting strategy that will maximize your ROI and boost your online presence.",
      content: "<p>Full content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "marketing",
      nicheName: "Marketing & Advertising",
      tags: ["website selection", "domain authority", "guest posting"],
      author: "Michael Thompson",
      authorBio: "Michael Thompson is a Digital Marketing Consultant specializing in SEO and content strategy. He has worked with startups and Fortune 500 companies to improve their digital marketing results.",
      authorAvatar: "https://ui-avatars.com/api/?name=Michael+Thompson&background=10b981&color=fff",
      publishedAt: new Date("2024-02-10"),
      readTime: "6 min read",
      views: 978
    },
    {
      id: 3,
      title: "The Impact of Guest Posting on SEO Performance",
      slug: "impact-guest-posting-seo-performance",
      excerpt: "Analyze how guest posting affects your website's search engine rankings and overall SEO strategy with real-world case studies and data.",
      content: "<p>Full content here...</p>",
      featuredImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      nicheId: "seo",
      nicheName: "SEO",
      tags: ["SEO", "backlinks", "domain authority"],
      author: "Sarah Johnson",
      authorBio: "Sarah Johnson is an SEO Specialist with expertise in link building and technical SEO. She has helped numerous websites achieve top rankings in competitive niches.",
      authorAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=f59e0b&color=fff",
      publishedAt: new Date("2024-03-05"),
      readTime: "10 min read",
      views: 1543
    },
    // Additional posts would be here
  ];

  useEffect(() => {
    // Simulate API fetch with a delay
    setLoading(true);
    setTimeout(() => {
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
    }, 300);
  }, [slug]);

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