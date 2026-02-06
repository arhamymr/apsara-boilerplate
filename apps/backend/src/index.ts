import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/error-handler";
import { routes } from "./routes";

const app = new Hono<{}>();

app.use("*", corsMiddleware);
app.onError(errorHandler);
app.route("/", routes);

const PORT = 2222;

console.log(`✅ Backend configured on port ${PORT}`);
console.log(`📡 Health check: http://localhost:${PORT}/health`);

export default {
  port: PORT,
  fetch: app.fetch,
};
