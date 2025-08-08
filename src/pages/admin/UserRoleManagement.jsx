import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { ROLES, getRoleDisplayName, getRoleColor, canManageUser } from '../../utils/permissions';
import { useAuth } from '../../contexts/AuthContext';

const { FiSearch, FiEdit, FiShield, FiUserCheck, FiUserX, FiMoreVertical } = FiIcons;

const UserRoleManagement = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
      role: 'moderator',
      status: 'active',
      joinDate: new Date('2024-01-18'),
      lastLogin: new Date('2024-01-18'),
      moderatedItems: 45,
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
      role: 'admin',
      status: 'active',
      joinDate: new Date('2024-01-12'),
      lastLogin: new Date('2024-01-20'),
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=8b5cf6&color=fff'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`User role updated to ${getRoleDisplayName(newRole)}`);
      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error('Failed to update user role');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`User ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const canManageThisUser = (targetUser) => {
    return canManageUser(currentUser?.role, targetUser.role);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Role Management</h1>
        <p className="text-gray-600">Manage user roles and permissions across the platform</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Role Stats */}
          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {filteredUsers.length} users found
            </span>
          </div>
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
                    {user.role === 'buyer' && (
                      <div>
                        <div>{user.ordersCount} orders</div>
                        <div className="text-xs text-gray-500">${user.totalSpent} spent</div>
                      </div>
                    )}
                    {user.role === 'publisher' && (
                      <div>
                        <div>{user.listingsCount || 0} listings</div>
                        <div className="text-xs text-gray-500">${user.totalEarnings || 0} earned</div>
                      </div>
                    )}
                    {user.role === 'moderator' && (
                      <div>
                        <div>{user.moderatedItems || 0} items</div>
                        <div className="text-xs text-gray-500">moderated</div>
                      </div>
                    )}
                    {user.role === 'admin' && (
                      <div>
                        <div className="text-xs text-gray-500">Administrator</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(user.joinDate, 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      {canManageThisUser(user) && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowRoleModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Change Role"
                          >
                            <SafeIcon icon={FiShield} className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleStatusToggle(user.id, user.status)}
                            className={user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                            title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                          >
                            <SafeIcon icon={user.status === 'active' ? FiUserX : FiUserCheck} className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      <button className="text-gray-600 hover:text-gray-900">
                        <SafeIcon icon={FiMoreVertical} className="h-4 w-4" />
                      </button>
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

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Change User Role
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Changing role for: <strong>{selectedUser.name}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Current role: {getRoleDisplayName(selectedUser.role)}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {Object.values(ROLES).map(role => (
                <label key={role} className="flex items-center">
                  <input
                    type="radio"
                    name="newRole"
                    value={role}
                    defaultChecked={role === selectedUser.role}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    {getRoleDisplayName(role)}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newRole = document.querySelector('input[name="newRole"]:checked')?.value;
                  if (newRole && newRole !== selectedUser.role) {
                    handleRoleChange(selectedUser.id, newRole);
                  } else {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                  }
                }}
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Role'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserRoleManagement;