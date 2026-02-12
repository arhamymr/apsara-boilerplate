import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222",
  plugins: [adminClient()],
});

export const { useSession } = client;

export { client as authClient };

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
