"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { authClient } from " @/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export interface ResetPasswordFormProps {
  onSubmit?: (password: string) => Promise<void>;
  className?: string;
}

export function ResetPasswordForm({
  onSubmit,
  className,
}: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(password);
      } else {
        // Use Better Auth reset password
        if (!token) {
          throw new Error("Invalid reset token");
        }

        await authClient.resetPassword({
          newPassword: password,
          token,
        });
      }
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className={className}>
        <div className="mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10  mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Password reset</h1>
          <p className="text-muted-foreground mt-2">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>
        </div>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/login">Go to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Reset password</h1>
        <p className="text-muted-foreground mt-2">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              name="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset password
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
