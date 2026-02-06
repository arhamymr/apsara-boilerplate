import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { routes } from "./routes";

const app = new Hono<{}>();

app.use("*", corsMiddleware);
app.route("/", routes);

const PORT = 2222;

console.log(`✅ Backend configured on port ${PORT}`);
console.log(`📡 Health check: http://localhost:${PORT}/health`);

export default {
  port: PORT,
  fetch: app.fetch,
};
