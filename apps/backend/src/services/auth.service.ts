import { APIError } from "better-auth";
import { auth } from "../lib/auth";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterData): Promise<void> {
    try {
      await auth.api.signUpEmail({
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        throw new Error(error.message);
      }
      throw new Error("Registration failed");
    }
  }
}
