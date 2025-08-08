// Role-based permissions system
export const ROLES = {
  ADMIN: 'admin',
  PUBLISHER: 'publisher',
  BUYER: 'buyer',
  MODERATOR: 'moderator'
};

export const PERMISSIONS = {
  // User Management
  VIEW_ALL_USERS: 'view_all_users',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',
  CHANGE_USER_ROLE: 'change_user_role',
  SUSPEND_USER: 'suspend_user',
  
  // Listing Management
  CREATE_LISTING: 'create_listing',
  EDIT_LISTING: 'edit_listing',
  DELETE_LISTING: 'delete_listing',
  APPROVE_LISTING: 'approve_listing',
  REJECT_LISTING: 'reject_listing',
  VIEW_ALL_LISTINGS: 'view_all_listings',
  
  // Order Management
  CREATE_ORDER: 'create_order',
  VIEW_ORDER: 'view_order',
  CANCEL_ORDER: 'cancel_order',
  APPROVE_ORDER: 'approve_order',
  VIEW_ALL_ORDERS: 'view_all_orders',
  
  // Transaction Management
  VIEW_TRANSACTIONS: 'view_transactions',
  VIEW_ALL_TRANSACTIONS: 'view_all_transactions',
  PROCESS_PAYOUT: 'process_payout',
  REFUND_PAYMENT: 'refund_payment',
  
  // Platform Management
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_DISPUTES: 'manage_disputes',
  SEND_NOTIFICATIONS: 'send_notifications',
  
  // Content Management
  MODERATE_CONTENT: 'moderate_content',
  MANAGE_REVIEWS: 'manage_reviews',
  MANAGE_CONTENT: 'manage_content',
  PUBLISH_BLOG: 'publish_blog',
  EDIT_BLOG: 'edit_blog',
  DELETE_BLOG: 'delete_blog',
};

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Full access to everything
    ...Object.values(PERMISSIONS)
  ],
  
  [ROLES.MODERATOR]: [
    PERMISSIONS.VIEW_ALL_USERS,
    PERMISSIONS.SUSPEND_USER,
    PERMISSIONS.VIEW_ALL_LISTINGS,
    PERMISSIONS.APPROVE_LISTING,
    PERMISSIONS.REJECT_LISTING,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.MODERATE_CONTENT,
    PERMISSIONS.MANAGE_REVIEWS,
    PERMISSIONS.MANAGE_DISPUTES,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.PUBLISH_BLOG,
    PERMISSIONS.EDIT_BLOG,
  ],
  
  [ROLES.PUBLISHER]: [
    PERMISSIONS.CREATE_LISTING,
    PERMISSIONS.EDIT_LISTING,
    PERMISSIONS.DELETE_LISTING,
    PERMISSIONS.VIEW_ORDER,
    PERMISSIONS.APPROVE_ORDER,
    PERMISSIONS.VIEW_TRANSACTIONS,
  ],
  
  [ROLES.BUYER]: [
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.VIEW_ORDER,
    PERMISSIONS.CANCEL_ORDER,
    PERMISSIONS.VIEW_TRANSACTIONS,
  ]
};

// Permission checking utilities
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions?.length) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions?.length) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

// Role hierarchy for comparison
export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 4,
  [ROLES.MODERATOR]: 3,
  [ROLES.PUBLISHER]: 2,
  [ROLES.BUYER]: 1
};

export const canManageUser = (currentUserRole, targetUserRole) => {
  return ROLE_HIERARCHY[currentUserRole] > ROLE_HIERARCHY[targetUserRole];
};

export const getRoleDisplayName = (role) => {
  const displayNames = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.MODERATOR]: 'Moderator',
    [ROLES.PUBLISHER]: 'Publisher',
    [ROLES.BUYER]: 'Buyer'
  };
  return displayNames[role] || role;
};

export const getRoleColor = (role) => {
  const colors = {
    [ROLES.ADMIN]: 'bg-red-100 text-red-800',
    [ROLES.MODERATOR]: 'bg-orange-100 text-orange-800',
    [ROLES.PUBLISHER]: 'bg-purple-100 text-purple-800',
    [ROLES.BUYER]: 'bg-blue-100 text-blue-800'
  };
  return colors[role] || 'bg-gray-100 text-gray-800';
};