import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: process.env.TRUSTED_ORIGINS?.split(",") || "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (c) =>
  c.json({
    name: "Apsara Backend API",
    version: "1.0.0",
    status: "ok",
  }),
);

app.get("/health", (c) => c.json({ status: "healthy" }));

export default app;
