import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
})

export { authClient as client }

// Auth hooks for React components
export const useAuth = () => {
  // This would typically use better-auth's React hooks
  // For now, providing a basic structure
  return {
    user: null,
    isLoading: false,
    signIn: authClient.signIn.social,
    signOut: authClient.signOut,
  }
}