import { Hono } from "hono";
import { HealthController } from "../controllers/health.controller";

const healthController = new HealthController();

export const healthRoutes = new Hono();

healthRoutes.get("/", healthController.root.bind(healthController));
