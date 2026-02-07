import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/database";
import { sendEmail } from "@/lib/email/email";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:2222",
  trustedOrigins: process.env.TRUSTED_ORIGINS?.split(",") || [
    "http://localhost:1111",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      enabled: true,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,

    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },

  // plugins
  plugins: [openAPI()],
});
