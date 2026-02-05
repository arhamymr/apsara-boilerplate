import { Context } from "hono";
import { z } from "zod";
import { AuthService } from "../services/auth.service";
import { APIResponse } from "../types";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(c: Context): Promise<Response> {
    const { name, email, password } = await c.req.json();

    try {
      await this.authService.register({ name, email, password });
      const response: APIResponse = {
        status: "ok",
        message: "successfully registered",
      };
      return c.json(response);
    } catch (error) {
      if (error instanceof Error) {
        const response: APIResponse = {
          status: "error",
          message: error.message,
        };
        return c.json(response, 400);
      }
      throw error;
    }
  }

  getRegisterSchema() {
    return z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });
  }
}
