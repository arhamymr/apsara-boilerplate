"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export interface RegisterFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  showTerms?: boolean;
  className?: string;
}

export function RegisterForm({
  onSubmit,
  showTerms = true,
  className,
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("first-name") as string,
      lastName: formData.get("last-name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default demo behavior
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={className}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-muted-foreground mt-2">
          Get started with your free account today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              name="first-name"
              placeholder="John"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              name="last-name"
              placeholder="Doe"
              required
              disabled={isLoading}
            />
          </div>
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

        {showTerms && (
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              required
              className="mt-0.5"
              checked={acceptedTerms}
              onCheckedChange={(checked) =>
                setAcceptedTerms(checked as boolean)
              }
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-snug">
              I agree to the{" "}
              <Link href="#" className="font-semibold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-semibold hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account?</span>{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
