import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

async function checkSchema() {
  console.log("Checking users table structure...\n");

  const result = await db.execute(sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'users'
    ORDER BY ordinal_position
  `);

  console.log("Users table columns:");
  console.log(JSON.stringify(result, null, 2));

  console.log("\nChecking accounts table structure...\n");

  const accountsResult = await db.execute(sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'accounts'
    ORDER BY ordinal_position
  `);

  console.log("Accounts table columns:");
  console.log(JSON.stringify(accountsResult, null, 2));
}

checkSchema()
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
