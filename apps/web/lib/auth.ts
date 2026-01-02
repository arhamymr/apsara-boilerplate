import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

// Stateless auth configuration - no database required
export const auth = betterAuth({
  // No database configuration - enables stateless mode
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
})
