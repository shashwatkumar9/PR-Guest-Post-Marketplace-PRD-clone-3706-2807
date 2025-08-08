import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import PermissionGate from '../../components/auth/PermissionGate';
import { PERMISSIONS } from '../../utils/permissions';

// Admin Components
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminListings from './AdminListings';
import AdminTransactions from './AdminTransactions';
import AdminSettings from './AdminSettings';
import UserRoleManagement from './UserRoleManagement';
import BlogManagement from './BlogManagement';

const { FiHome, FiUsers, FiFileText, FiCreditCard, FiSettings, FiMenu, FiX, FiShield, FiEdit } = FiIcons;

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: FiHome,
      current: location.pathname === '/admin',
      permission: PERMISSIONS.VIEW_ANALYTICS
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: FiUsers,
      current: location.pathname === '/admin/users',
      permission: PERMISSIONS.VIEW_ALL_USERS
    },
    {
      name: 'Role Management',
      href: '/admin/roles',
      icon: FiShield,
      current: location.pathname === '/admin/roles',
      permission: PERMISSIONS.CHANGE_USER_ROLE
    },
    {
      name: 'Listings',
      href: '/admin/listings',
      icon: FiFileText,
      current: location.pathname === '/admin/listings',
      permission: PERMISSIONS.VIEW_ALL_LISTINGS
    },
    {
      name: 'Transactions',
      href: '/admin/transactions',
      icon: FiCreditCard,
      current: location.pathname === '/admin/transactions',
      permission: PERMISSIONS.VIEW_ALL_TRANSACTIONS
    },
    {
      name: 'Blog',
      href: '/admin/blog',
      icon: FiEdit,
      current: location.pathname === '/admin/blog',
      permission: PERMISSIONS.MANAGE_CONTENT
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: FiSettings,
      current: location.pathname === '/admin/settings',
      permission: PERMISSIONS.MANAGE_SETTINGS
    },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">PR</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
        </div>
      </div>
      
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <PermissionGate key={item.name} permission={item.permission}>
            <Link
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                item.current
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <SafeIcon
                icon={item.icon}
                className={`mr-3 h-6 w-6 ${
                  item.current
                    ? 'text-primary-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </Link>
          </PermissionGate>
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <SafeIcon icon={FiMenu} className="h-6 w-6" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/roles" element={<UserRoleManagement />} />
            <Route path="/listings" element={<AdminListings />} />
            <Route path="/transactions" element={<AdminTransactions />} />
            <Route path="/blog" element={<BlogManagement />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;