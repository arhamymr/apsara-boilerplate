"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: newUser, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
      });

      if (error) {
        setError(error.message || "Failed to create account");
        return { success: false, error };
      }

      toast.success("Account created successfully");
      router.push("/login");
      return { success: true, data: newUser };
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

  return { register, isLoading, error, clearError: () => setError(null) };
}
