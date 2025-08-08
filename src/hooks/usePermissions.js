import { useAuth } from '../contexts/AuthContext';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../utils/permissions';

export const usePermissions = () => {
  const { user } = useAuth();
  
  return {
    hasPermission: (permission) => hasPermission(user?.role, permission),
    hasAnyPermission: (permissions) => hasAnyPermission(user?.role, permissions),
    hasAllPermissions: (permissions) => hasAllPermissions(user?.role, permissions),
    userRole: user?.role,
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator',
    isPublisher: user?.role === 'publisher',
    isBuyer: user?.role === 'buyer'
  };
};