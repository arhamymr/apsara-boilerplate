import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222",
});

export const { useSession } = authClient;

export { authClient as client };

// Custom hook for session with loading state
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
