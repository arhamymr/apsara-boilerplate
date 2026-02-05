import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();
const authController = new AuthController(authService);

export const authRoutes = new Hono();

authRoutes.post(
  "/register",
  zValidator("json", authController.getRegisterSchema()),
  authController.register.bind(authController),
);
