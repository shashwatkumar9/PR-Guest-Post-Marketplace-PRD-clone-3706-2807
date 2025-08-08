import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTwitter, FiLinkedin, FiMail, FiPhone, FiGlobe, FiUsers, FiFileText, FiShield } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PR</span>
              </div>
              <span className="text-xl font-bold">GuestPost</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The premier marketplace connecting PR agencies, marketing firms, and companies with quality publishers for guest post opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SafeIcon icon={FiTwitter} className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SafeIcon icon={FiLinkedin} className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <SafeIcon icon={FiMail} className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Create Listing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/blog/guest-posting-guide" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Guest Posting Guide
                </Link>
              </li>
              <li>
                <Link to="/blog/seo-best-practices" className="text-gray-400 hover:text-white transition-colors duration-200">
                  SEO Best Practices
                </Link>
              </li>
              <li>
                <Link to="/blog/content-marketing-tips" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Content Marketing Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-sm text-gray-400">
              © 2024 PR GuestPost Marketplace. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-start md:justify-end gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <SafeIcon icon={FiGlobe} className="h-4 w-4 mr-1" />
                <span>English (US)</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiUsers} className="h-4 w-4 mr-1" />
                <span>2,500+ Publishers</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiFileText} className="h-4 w-4 mr-1" />
                <span>10,000+ Listings</span>
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiShield} className="h-4 w-4 mr-1" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;