import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { auth } from "./lib/auth";

const app = new Hono();

app.use("*", corsMiddleware);
app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Welcome to the Backend API",
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));


const PORT = 2222;

console.log(`✅ Backend configured on port ${PORT}`);
console.log(`📡 Health check: http://localhost:${PORT}/health`);

export default {
  port: PORT,
  fetch: app.fetch,
};
