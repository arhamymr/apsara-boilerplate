import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222",
  plugins: [adminClient()],
});

export const { useSession } = client;

export { client as authClient };

// Custom hook for session with role checking
export function useAuthSessionWithRoles() {
  const { data: session, isPending, error } = useSession();

  return {
    session,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    user: session?.user,
    error,
    isAdmin: session?.user?.role === "admin",
    isUser: session?.user?.role === "user",
    hasRole: (role: string) => session?.user?.role === role,
  };
}

// Custom hooks for role checking
export function useAdmin() {
  const { isAdmin, isLoading } = useAuthSessionWithRoles();
  return { isAdmin, loading: isLoading };
}

export function useCanManageUsers() {
  const { isAdmin, isLoading } = useAuthSessionWithRoles();
  return { canManage: isAdmin, loading: isLoading };
}

export function useCanAccessSettings() {
  const { isAdmin, isLoading } = useAuthSessionWithRoles();
  return { canAccess: isAdmin, loading: isLoading };
}

export function useCanViewAnalytics() {
  const { isAdmin, isUser, isLoading } = useAuthSessionWithRoles();
  const canView = isAdmin || isUser; // Both can view analytics
  return { canView, loading: isLoading };
}

export function useCanManageProjects() {
  const { isAdmin, isUser, isLoading } = useAuthSessionWithRoles();
  const canManage = isAdmin || isUser; // Both can manage projects
  return { canManage, loading: isLoading };
}

// Keep the original useAuthSession for backward compatibility
export function useAuthSession() {
  const { data: session, isPending, error } = useSession();

  return {
    session,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    user: session?.user,
    error,
  };
}
