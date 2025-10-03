import { useAuth as useAuthContext } from '../context/AuthContext';

// Re-export the useAuth hook for convenience
export const useAuth = useAuthContext;

// Additional custom hooks for common auth operations
export const useRequireAuth = () => {
  const auth = useAuthContext();
  
  if (!auth.isAuthenticated) {
    throw new Error('Authentication required');
  }
  
  return auth;
};

export const useRequireRole = (role: string) => {
  const auth = useRequireAuth();
  
  if (!auth.hasRole(role)) {
    throw new Error(`Role '${role}' required`);
  }
  
  return auth;
};

export const useRequireAnyRole = (roles: string[]) => {
  const auth = useRequireAuth();
  
  if (!auth.hasAnyRole(roles)) {
    throw new Error(`One of roles [${roles.join(', ')}] required`);
  }
  
  return auth;
};