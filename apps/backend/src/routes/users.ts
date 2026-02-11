import { Hono } from "hono";
import { attributeService } from "@/lib/attributes/attribute-service";
import { APIResponse } from "@/types";

const app = new Hono();

// Get all users with their attributes
app.get("/with-attributes", async (c) => {
  try {
    // For now, we'll need to fetch all users and their attributes separately
    // In a real implementation, you might want to optimize this with proper joins
    const { db } = await import("@/db/database");
    const { user } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");

    const users = await db.select().from(user);

    const usersWithAttributes = await Promise.all(
      users.map(async (user) => {
        const attributes = await attributeService.getUserAttributes(user.id);
        return {
          ...user,
          attributes,
        };
      }),
    );

    return c.json<APIResponse>({
      status: "success",
      data: usersWithAttributes,
    });
  } catch (error) {
    console.error("Error fetching users with attributes:", error);
    return c.json<APIResponse>(
      {
        status: "error",
        message: "Failed to fetch users with attributes",
      },
      500,
    );
  }
});

export default app;
