import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { SEO, SchemaMarkup } from '../../utils/seoUtils';

const { FiMail, FiMessageSquare, FiUser, FiSend, FiHelpCircle, FiMapPin, FiPhone, FiArrowRight } = FiIcons;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Contact Us | PR GuestPost Marketplace"
        description="Get in touch with the PR GuestPost team for any questions, support issues, or business inquiries. We're here to help with your guest posting needs."
        keywords="contact, support, help, PR GuestPost, guest posting, inquiries, customer service"
        canonical="https://prguest.com/contact"
      />
      
      <SchemaMarkup
        type="Organization"
        data={{
          name: "PR GuestPost",
          url: "https://prguest.com",
          logo: "https://prguest.com/images/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-123-4567",
            contactType: "customer service",
            email: "support@prguest.com",
            availableLanguage: ["English"]
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Market Street, Suite 456",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US"
          },
          sameAs: [
            "https://twitter.com/prguest",
            "https://facebook.com/prguest",
            "https://linkedin.com/company/prguest"
          ]
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? Our team is here to help you with any inquiries about our guest posting marketplace.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { 
                        value: /^\S+@\S+$/i, 
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiHelpCircle} className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    {...register('subject', { required: 'Please select a subject' })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="publisher">Publisher Support</option>
                    <option value="buyer">Buyer Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <SafeIcon icon={FiMessageSquare} className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 20,
                        message: 'Message must be at least 20 characters'
                      }
                    })}
                    rows={6}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your message..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  {...register('consent', { required: 'You must consent to our privacy policy' })}
                  type="checkbox"
                  id="consent"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  I agree to the <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link> and consent to being contacted regarding my inquiry.
                </label>
              </div>
              {errors.consent && (
                <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiMail} className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">
                      <a href="mailto:support@prguest.com" className="hover:text-primary-600">support@prguest.com</a>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      For general inquiries and support
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiPhone} className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">
                      <a href="tel:+15551234567" className="hover:text-primary-600">+1 (555) 123-4567</a>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Mon-Fri: 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiMapPin} className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="mt-1 text-gray-600">
                      123 Market Street, Suite 456<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h2>
              <p className="text-gray-600 mb-4">
                Find answers to common questions in our comprehensive FAQ section:
              </p>
              
              <ul className="space-y-3">
                <li>
                  <Link to="/faq?category=publishers" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-primary-600">Publisher Questions</span>
                    <p className="text-sm text-gray-500 mt-1">Listing websites, payments, and publisher policies</p>
                  </Link>
                </li>
                <li>
                  <Link to="/faq?category=buyers" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-primary-600">Buyer Questions</span>
                    <p className="text-sm text-gray-500 mt-1">Ordering posts, content requirements, and refunds</p>
                  </Link>
                </li>
                <li>
                  <Link to="/faq?category=payments" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-primary-600">Payment Questions</span>
                    <p className="text-sm text-gray-500 mt-1">Pricing, payment methods, and billing issues</p>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="flex items-center justify-center mt-4 text-primary-600 hover:text-primary-700">
                    View all FAQs
                    <SafeIcon icon={FiArrowRight} className="ml-1 h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                title="PR GuestPost Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968942083607!2d-122.39971492361061!3d37.79151711631249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858062c2c9e907%3A0x71eca3a5e71adfc3!2s123%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1684268856417!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;