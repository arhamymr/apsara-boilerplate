import { Context } from "hono";

export function errorHandler(error: Error, c: Context) {
  console.error("❌ Error occurred:", error);
  console.error("Stack trace:", error.stack);
  
  return c.json(
    {
      error: "Internal Server Error",
      message: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
    500
  );
}
