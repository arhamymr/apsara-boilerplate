"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginData, redirectTo?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: session, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (error) {
        setError(error.message || "Failed to sign in");
        return { success: false, error };
      }

      toast.success("Signed in successfully");
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/dashboard");
      }
      return { success: true, data: session };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, clearError: () => setError(null) };
}
