"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = exports.accounts = exports.sessions = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    emailVerified: (0, pg_core_1.boolean)("emailVerified").notNull().default(false),
    image: (0, pg_core_1.text)("image"),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("userId").notNull(),
    token: (0, pg_core_1.text)("token").notNull(),
    expiresAt: (0, pg_core_1.timestamp)("expiresAt", { withTimezone: true }).notNull(),
    ipAddress: (0, pg_core_1.text)("ipAddress"),
    userAgent: (0, pg_core_1.text)("userAgent"),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.accounts = (0, pg_core_1.pgTable)("accounts", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("userId").notNull(),
    accountId: (0, pg_core_1.text)("accountId").notNull(),
    providerId: (0, pg_core_1.text)("providerId").notNull(),
    accessToken: (0, pg_core_1.text)("accessToken"),
    refreshToken: (0, pg_core_1.text)("refreshToken"),
    accessTokenExpiresAt: (0, pg_core_1.timestamp)("accessTokenExpiresAt", {
        withTimezone: true,
    }),
    refreshTokenExpiresAt: (0, pg_core_1.timestamp)("refreshTokenExpiresAt", {
        withTimezone: true,
    }),
    password: (0, pg_core_1.text)("password"),
    scope: (0, pg_core_1.text)("scope"),
    idToken: (0, pg_core_1.text)("idToken"),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.verification = (0, pg_core_1.pgTable)("verification", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    value: (0, pg_core_1.text)("value").notNull(),
    expiresAt: (0, pg_core_1.timestamp)("expiresAt", { withTimezone: true }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt", { withTimezone: true })
        .notNull()
        .defaultNow(),
});
