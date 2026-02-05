import { Hono } from "hono";
import { authRoutes } from "./auth.routes";
import { healthRoutes } from "./health.routes";
import { templateRoutes } from "./template.routes";
import { auth } from "../lib/auth";

export const routes = new Hono();

routes.route("/", healthRoutes);
routes.route("/", templateRoutes);
routes.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
