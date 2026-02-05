import { Context } from "hono";
import { APIResponse } from "../types";

export class HealthController {
  async check(c: Context): Promise<Response> {
    const response: APIResponse = { status: "ok" };
    return c.json(response);
  }

  async root(c: Context): Promise<Response> {
    const response: APIResponse = {
      status: "ok",
      message: "Welcome to the API",
    };
    return c.json(response);
  }
}
