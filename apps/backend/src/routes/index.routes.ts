import { Hono } from "hono";
import { healthRoutes } from "./health.routes";

// add new routes here 
// import { templateRoutes } from "./template.routes";
import { auth } from "../lib/auth";

export const routes = new Hono();

routes.route("/", healthRoutes);
routes.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
