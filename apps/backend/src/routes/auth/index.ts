import { Hono } from "hono";

const app = new Hono();

app.get("/verify", (c) => {
  return c.json({ message: "Auth verification endpoint" });
});

app.post("/refresh", (c) => {
  return c.json({ message: "Token refresh endpoint" });
});

app.post("/logout", (c) => {
  return c.json({ message: "Logout endpoint" });
});

export default app;
