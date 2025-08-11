import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISSIONS } from '../../utils/permissions';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiMessageSquare, FiCreditCard, FiShield } = FiIcons;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { hasPermission } = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">GuestPost</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user?.role === 'publisher' ? (
              <Link
                to="/my-websites"
                className={`${
                  isActive('/my-websites')
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                } transition-colors duration-200`}
              >
                My Websites
              </Link>
            ) : (
              <Link
                to="/marketplace"
                className={`${
                  isActive('/marketplace')
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                } transition-colors duration-200`}
              >
                Marketplace
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`${
                    isActive('/dashboard')
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } transition-colors duration-200`}
                >
                  Dashboard
                </Link>

                {user.role === 'publisher' && (
                  <Link
                    to="/create-listing"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Create Listing
                  </Link>
                )}

                {hasPermission(PERMISSIONS.VIEW_ANALYTICS) && (
                  <Link
                    to="/admin"
                    className={`${
                      isActive('/admin')
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    } transition-colors duration-200`}
                  >
                    Admin Panel
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <SafeIcon icon={FiUser} className="mr-3 h-4 w-4" />
                          Profile
                        </Link>

                        <Link
                          to="/messages"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <SafeIcon icon={FiMessageSquare} className="mr-3 h-4 w-4" />
                          Messages
                        </Link>

                        <Link
                          to="/transactions"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <SafeIcon icon={FiCreditCard} className="mr-3 h-4 w-4" />
                          Transactions
                        </Link>

                        {hasPermission(PERMISSIONS.CHANGE_USER_ROLE) && (
                          <Link
                            to="/admin/roles"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <SafeIcon icon={FiShield} className="mr-3 h-4 w-4" />
                            Role Management
                          </Link>
                        )}

                        <hr className="my-1" />

                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          <SafeIcon icon={FiLogOut} className="mr-3 h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user?.role === 'publisher' ? (
                <Link
                  to="/my-websites"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  My Websites
                </Link>
              ) : (
                <Link
                  to="/marketplace"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Marketplace
                </Link>
              )}

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>

                  {hasPermission(PERMISSIONS.VIEW_ANALYTICS) && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;