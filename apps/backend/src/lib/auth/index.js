"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var better_auth_1 = require("better-auth");
var drizzle_1 = require("better-auth/adapters/drizzle");
var db_1 = require("../db");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, drizzle_1.drizzleAdapter)(db_1.db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    trustedOrigins: ((_a = process.env.TRUSTED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) || [
        "http://localhost:1111",
    ],
});
