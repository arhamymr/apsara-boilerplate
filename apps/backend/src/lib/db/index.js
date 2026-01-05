"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var node_postgres_1 = require("drizzle-orm/node-postgres");
var connectionString = process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/backend";
exports.db = (0, node_postgres_1.drizzle)(connectionString);
