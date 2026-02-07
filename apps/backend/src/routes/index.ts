import { Hono } from "hono";

// add new routes here
// import { templateRoutes } from "./template.routes";
import { auth } from "../lib/auth";

export const routes = new Hono();

routes.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Welcome to the Backend API",
  });
});

routes.get("/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

routes.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
