import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { SEO, SchemaMarkup } from '../../utils/seoUtils';

const { FiChevronDown, FiChevronUp, FiSearch } = FiIcons;

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});

  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'publishers', name: 'For Publishers' },
    { id: 'buyers', name: 'For Buyers' },
    { id: 'payments', name: 'Payments & Pricing' },
    { id: 'content', name: 'Content Guidelines' },
    { id: 'account', name: 'Account Management' }
  ];

  const faqData = {
    general: [
      {
        question: "What is PR GuestPost?",
        answer: "PR GuestPost is a marketplace that connects publishers (website owners) with buyers (businesses, agencies, and individuals) who want to publish guest posts. Our platform makes it easy to find high-quality websites for guest posting, manage the entire process from order to publication, and handle secure payments."
      },
      {
        question: "How does PR GuestPost work?",
        answer: "Publishers list their websites on our marketplace with details like niche, traffic, domain authority, and pricing. Buyers can browse these listings, purchase guest post opportunities, and submit their content. Publishers review the content and publish it according to their guidelines. We handle the secure payment processing and provide a platform for communication between parties."
      },
      {
        question: "Is PR GuestPost safe to use?",
        answer: "Yes, PR GuestPost is designed with safety and security in mind. We verify publisher websites to ensure quality, hold payments in escrow until services are delivered, have a dispute resolution system, and implement strict content guidelines. Our platform uses secure payment processing and data encryption to protect your information."
      },
      {
        question: "What makes PR GuestPost different from other guest posting services?",
        answer: "PR GuestPost stands out with our transparent marketplace model, quality control processes, secure payment system, and comprehensive platform features. We don't operate as an agency but as a direct marketplace connecting publishers and buyers, eliminating middlemen and reducing costs while maintaining high quality."
      },
      {
        question: "Can I use PR GuestPost for link building?",
        answer: "Yes, many users utilize our platform for ethical link building as part of their SEO strategy. However, we enforce strict quality guidelines to ensure all content provides value to readers and meets the publisher's standards. We don't support spammy or black-hat SEO tactics."
      }
    ],
    publishers: [
      {
        question: "How can I list my website on PR GuestPost?",
        answer: "To list your website, create a publisher account, complete your profile, and submit your website for approval. You'll need to provide details like your website URL, niche, traffic statistics, and content guidelines. Our team will review your submission and, if approved, your listing will appear in our marketplace."
      },
      {
        question: "What are the requirements for listing a website?",
        answer: "We have certain quality standards for websites on our platform. Your website should have original content, consistent publishing history, genuine traffic, and follow ethical SEO practices. We don't accept websites with excessive ads, mostly sponsored content, or those that engage in link schemes or other practices that violate search engine guidelines."
      },
      {
        question: "How much can I earn as a publisher?",
        answer: "Your earnings depend on factors like your website's domain authority, niche, traffic, and content quality. Publishers on our platform set their own base prices, and we add a 25% platform fee on top. You receive 100% of your set base price for each published guest post."
      },
      {
        question: "How and when do I get paid?",
        answer: "Publishers receive payments through their preferred payment method (PayPal, bank transfer, or other supported methods) according to our payment schedule. We process payments twice a month, on the 1st and 15th, for all completed orders with a minimum payout threshold of $50."
      },
      {
        question: "Can I reject submitted content?",
        answer: "Yes, you can reject content that doesn't meet your stated guidelines. However, you should clearly communicate your content requirements in your listing to minimize rejections. If you reject content, you'll need to provide specific feedback so the buyer can make necessary revisions."
      }
    ],
    buyers: [
      {
        question: "How do I find the right websites for guest posting?",
        answer: "Our marketplace offers advanced filtering options to help you find websites that match your requirements. You can filter by niche, domain authority, traffic, price range, languages supported, and more. Each listing includes detailed information about the website's metrics, content guidelines, and sample articles."
      },
      {
        question: "What happens after I purchase a guest post?",
        answer: "After purchase, you'll be prompted to submit your content or work with the publisher to develop it. The publisher will review your submission and either approve it for publication or request revisions. Once published, you'll receive confirmation with the live URL, and the payment will be released to the publisher."
      },
      {
        question: "Are there any guarantees for the backlinks?",
        answer: "Publishers on our platform commit to keeping guest posts and their backlinks live for a minimum of 12 months, provided the content complies with their guidelines. If a link is removed before this period without valid reason, you can file a dispute through our system."
      },
      {
        question: "Can I request revisions to my published content?",
        answer: "Most publishers allow a certain number of revisions before publication. After publication, minor changes might be accommodated at the publisher's discretion. Specific revision policies are listed on each publisher's profile."
      },
      {
        question: "What if I'm not satisfied with the service?",
        answer: "If you experience issues with a publisher or the service, first try to resolve it directly through our messaging system. If that doesn't work, you can open a dispute through our platform. Our team will review the case and may offer solutions like revisions, partial refunds, or full refunds depending on the circumstances."
      }
    ],
    payments: [
      {
        question: "How much does it cost to use PR GuestPost?",
        answer: "For buyers, the price shown on each listing is the total cost with no hidden charges. For publishers, listing your website is free, and we handle all payment processing securely."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for larger orders. All payments are processed securely through our payment processors, and we never store your full payment details on our servers."
      },
      {
        question: "Is there a refund policy?",
        answer: "Yes, we have a refund policy to protect buyers. You may be eligible for a refund if: the publisher fails to publish your content within the promised timeframe, the content is published but doesn't meet the agreed specifications, or the publisher removes the content/links before the guaranteed period without valid reason."
      },
      {
        question: "Are there any discounts for bulk orders?",
        answer: "Yes, we offer discounts for bulk orders. If you're planning to purchase multiple guest posts, contact our support team to discuss custom pricing options. Discounts typically start at orders of 5+ guest posts and increase with larger volumes."
      },
      {
        question: "How does the escrow system work?",
        answer: "Our platform uses an escrow system to ensure security for both parties. When a buyer places an order, the payment is held in escrow. The funds are only released to the publisher after the content is successfully published and the buyer confirms satisfaction or after an automatic release period (typically 7 days after publication notification)."
      }
    ],
    content: [
      {
        question: "What types of content are allowed on PR GuestPost?",
        answer: "We allow high-quality, original content that provides value to readers. Content should be relevant to the publisher's niche and follow their specific guidelines. We prohibit content that is spammy, plagiarized, or violates our content policies (such as adult content, illegal activities, gambling without proper licensing, etc.)."
      },
      {
        question: "Are there any link restrictions?",
        answer: "Each publisher sets their own link policies, including the number of links allowed, types of links (dofollow/nofollow), and restricted link categories. Generally, links should be relevant to the content and add value for readers. Links to prohibited categories (adult, gambling without proper licensing, illegal activities, etc.) are not allowed platform-wide."
      },
      {
        question: "Who owns the content after publication?",
        answer: "Unless otherwise specified by the publisher, the publisher retains ownership of the published content. Buyers are granted the right to have their content and links published on the website, but typically cannot republish the same content elsewhere. Specific arrangements can be negotiated directly with publishers."
      },
      {
        question: "What are the quality standards for content?",
        answer: "All content must be original, well-written, and free from grammatical and spelling errors. Content should provide value to readers, be relevant to the publisher's audience, and meet the publisher's specific guidelines. We encourage comprehensive, in-depth content rather than thin, keyword-stuffed articles."
      },
      {
        question: "Can I publish content in languages other than English?",
        answer: "Yes, many publishers on our platform accept content in multiple languages. Each publisher specifies which languages they support in their listing. You can filter listings by supported languages to find publishers that accept content in your preferred language."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click the 'Sign Up' button on our homepage, fill out the registration form with your details, choose your account type (buyer or publisher), and agree to our terms of service. You'll receive a confirmation email to verify your account before you can start using our services."
      },
      {
        question: "Can I have both a buyer and publisher account?",
        answer: "Yes, you can operate as both a buyer and a publisher with the same account. In your dashboard, you can switch between buyer and publisher modes to access the respective features and functions."
      },
      {
        question: "How can I reset my password?",
        answer: "To reset your password, click the 'Forgot Password' link on the login page, enter your email address, and follow the instructions sent to your email. For security reasons, password reset links expire after 24 hours."
      },
      {
        question: "How do I update my account information?",
        answer: "You can update your account information by logging in and navigating to the 'Profile' or 'Account Settings' section in your dashboard. Here you can edit your personal details, contact information, payment methods, and notification preferences."
      },
      {
        question: "How can I delete my account?",
        answer: "To delete your account, go to 'Account Settings' in your dashboard and select the 'Delete Account' option. Please note that account deletion is permanent and will remove all your data from our system. Any outstanding transactions or obligations must be completed before account deletion."
      }
    ]
  };

  const toggleFaq = (id) => {
    setOpenFaqs({
      ...openFaqs,
      [id]: !openFaqs[id]
    });
  };

  // Filter FAQs based on search term
  const filteredFaqs = searchTerm
    ? Object.values(faqData).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqData[activeCategory];

  // Create FAQ schema for SEO
  const faqSchemaItems = Object.values(faqData).flat().map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Frequently Asked Questions | PR GuestPost Marketplace"
        description="Find answers to commonly asked questions about PR GuestPost's guest posting marketplace, including how to use the platform, pricing, content guidelines, and more."
        keywords="FAQ, frequently asked questions, guest posting, PR GuestPost, publishers, buyers, content guidelines, payment"
        canonical="https://prguest.com/faq"
      />
      
      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: faqSchemaItems
        }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our platform, services, and policies.
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </motion.div>
        
        {/* Category Tabs - Only show if not searching */}
        {!searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const faqId = `faq-${searchTerm ? 'search' : activeCategory}-${index}`;
              return (
                <div key={faqId} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleFaq(faqId)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <SafeIcon
                      icon={openFaqs[faqId] ? FiChevronUp : FiChevronDown}
                      className="h-5 w-5 text-gray-500"
                    />
                  </button>
                  {openFaqs[faqId] && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No questions found matching your search term.</p>
            </div>
          )}
        </motion.div>
        
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Contact our support team and we'll get back to you as soon as possible.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;