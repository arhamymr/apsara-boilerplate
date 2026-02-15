"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

export function ForgotPasswordForm({
  onSubmit,
  className,
}: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Use Better Auth forgot password
        await authClient.requestPasswordReset({
          email,
          redirectTo: "/reset-password",
        });
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("Password reset request failed:", err);
      setIsSubmitted(true); // Still show success message for security
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className={className}>
        <div className="mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10  mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Check your email
          </h1>
          <p className="text-muted-foreground mt-2">
            We&apos;ve sent a password reset link to your email address. Please
            check your inbox.
          </p>
        </div>

        <Button variant="outline" className="w-full bg-transparent" asChild>
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Forgot password?</h1>
        <p className="text-muted-foreground mt-2">
          No worries, we&apos;ll send you reset instructions to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset password
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
