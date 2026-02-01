import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowedOrigins = process.env.TRUSTED_ORIGINS?.split(",") || [
        "http://localhost:1111",
      ];
      return allowedOrigins.includes(origin) ? origin : origin;
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  } 
  
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

app.on(["GET", "POST"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => {
  return c.json({
    message: "Welcome to the API",
    endpoints: {
      auth: "/api/auth",
      docs: "/api/docs",
      health: "/health",
    },
  });
});

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/api/protected", (c) => {
  const user = c.get("user");
  const session = c.get("session");

  if (!user || !session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({
    message: "This is a protected route",
    user,
  });
});

export default {
  port: 2222,
  fetch: app.fetch,
};
