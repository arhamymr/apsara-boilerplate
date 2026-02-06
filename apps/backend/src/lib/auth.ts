import { betterAuth } from "better-auth"
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/database';
import { sendEmail } from '@/lib/email/email';

const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

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
    
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            void sendEmail({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },
    },


    // plugins
    plugins: [
        openAPI(),
    ]
})  

export { auth}