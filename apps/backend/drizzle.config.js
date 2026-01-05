"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/lib/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL ||
            "postgres://postgres:postgres@localhost:5432/backend",
    },
});
