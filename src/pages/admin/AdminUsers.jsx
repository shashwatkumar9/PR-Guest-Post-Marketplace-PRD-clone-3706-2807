import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { ROLES, getRoleDisplayName, getRoleColor } from '../../utils/permissions';
import PermissionGate from '../../components/auth/PermissionGate';
import { PERMISSIONS } from '../../utils/permissions';

const { FiSearch, FiFilter, FiEdit, FiTrash2, FiEye, FiUserCheck, FiUserX, FiShield } = FiIcons;

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'buyer',
      status: 'active',
      joinDate: new Date('2024-01-15'),
      lastLogin: new Date('2024-01-20'),
      ordersCount: 12,
      totalSpent: 1450,
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'publisher',
      status: 'active',
      joinDate: new Date('2024-01-10'),
      lastLogin: new Date('2024-01-19'),
      listingsCount: 5,
      totalEarnings: 2340,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      role: 'buyer',
      status: 'pending',
      joinDate: new Date('2024-01-18'),
      lastLogin: new Date('2024-01-18'),
      ordersCount: 0,
      totalSpent: 0,
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=f59e0b&color=fff'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'publisher',
      status: 'suspended',
      joinDate: new Date('2024-01-05'),
      lastLogin: new Date('2024-01-16'),
      listingsCount: 3,
      totalEarnings: 890,
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=ef4444&color=fff'
    },
    {
      id: 5,
      name: 'Alex Chen',
      email: 'alex@example.com',
      role: 'moderator',
      status: 'active',
      joinDate: new Date('2024-01-12'),
      lastLogin: new Date('2024-01-20'),
      moderatedItems: 45,
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=8b5cf6&color=fff'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage and monitor platform users</p>
          </div>
          
          <PermissionGate permission={PERMISSIONS.CHANGE_USER_ROLE}>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiShield} className="h-4 w-4 mr-2 inline" />
              Manage Roles
            </button>
          </PermissionGate>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            {Object.values(ROLES).map(role => (
              <option key={role} value={role}>{getRoleDisplayName(role)}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Actions */}
          <button className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <SafeIcon icon={FiFilter} className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Users Table */}
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
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role === 'buyer' ? (
                      <div>
                        <div>{user.ordersCount} orders</div>
                        <div className="text-xs text-gray-500">${user.totalSpent} spent</div>
                      </div>
                    ) : user.role === 'publisher' ? (
                      <div>
                        <div>{user.listingsCount || 0} listings</div>
                        <div className="text-xs text-gray-500">${user.totalEarnings || 0} earned</div>
                      </div>
                    ) : user.role === 'moderator' ? (
                      <div>
                        <div>{user.moderatedItems || 0} items</div>
                        <div className="text-xs text-gray-500">moderated</div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">Administrator</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(user.joinDate, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <PermissionGate permission={PERMISSIONS.VIEW_ALL_USERS}>
                        <button className="text-blue-600 hover:text-blue-900">
                          <SafeIcon icon={FiEye} className="h-4 w-4" />
                        </button>
                      </PermissionGate>
                      
                      <PermissionGate permission={PERMISSIONS.EDIT_USER}>
                        <button className="text-green-600 hover:text-green-900">
                          <SafeIcon icon={FiEdit} className="h-4 w-4" />
                        </button>
                      </PermissionGate>
                      
                      <PermissionGate permission={PERMISSIONS.SUSPEND_USER}>
                        {user.status === 'active' ? (
                          <button className="text-red-600 hover:text-red-900">
                            <SafeIcon icon={FiUserX} className="h-4 w-4" />
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-900">
                            <SafeIcon icon={FiUserCheck} className="h-4 w-4" />
                          </button>
                        )}
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SafeIcon icon={FiSearch} className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">No users match your current filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUsers;