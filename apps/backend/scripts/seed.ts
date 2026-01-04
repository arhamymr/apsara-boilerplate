import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";
import { randomUUID } from "crypto";

const passwordHash =
  "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lLT5vC9.Ou";

const dummyUsers = [
  {
    uuid: randomUUID(),
    name: "Test User 1",
    email: "test1@example.com",
    password: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: randomUUID(),
    name: "Test User 2",
    email: "test2@example.com",
    password: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: randomUUID(),
    name: "Demo User",
    email: "demo@example.com",
    password: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  for (const user of dummyUsers) {
    await db.execute(sql`
      INSERT INTO users (uuid, name, email, password, created_at, updated_at)
      VALUES (${user.uuid}, ${user.name}, ${user.email}, ${user.password}, ${user.createdAt}, ${user.updatedAt})
      ON CONFLICT DO NOTHING
    `);
  }

  console.log("✅ Seeded 3 dummy users:");
  dummyUsers.forEach((u) => console.log(`   - ${u.name} (${u.email})`));
  console.log("   Password: password123");
}

seed()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
