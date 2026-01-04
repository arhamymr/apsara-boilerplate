import { drizzle } from "drizzle-orm/node-postgres";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/backend";
export const db = drizzle(connectionString);
