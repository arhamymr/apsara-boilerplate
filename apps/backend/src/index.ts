import { Hono } from "hono";
import auth from "./routes/auth";

const app = new Hono();

app.route("/", auth);

export default {
  port: 2222,
  fetch: app.fetch,
};
