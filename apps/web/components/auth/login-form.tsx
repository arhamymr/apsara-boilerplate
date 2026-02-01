"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export interface LoginFormProps {
  onSubmit?: (
    email: string,
    password: string,
    remember: boolean,
  ) => Promise<void>;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showSocialLogin?: boolean;
  className?: string;
}

export function LoginForm({
  onSubmit,
  showRememberMe = true,
  showForgotPassword = true,
  showSocialLogin = true,
  className,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [remember, setRemember] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (onSubmit) {
        await onSubmit(email, password, remember);
      } else {
        await authClient.signIn.email(
          {
            email,
            password,
            rememberMe: remember,
          },
          {
            onRequest: () => {
              setIsLoading(true);
            },
            onSuccess: () => {
              router.push("/dashboard");
            },
            onError: (ctx) => {
              setError(ctx.error.message);
              setIsLoading(false);
            },
          },
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className={className}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      {showSocialLogin && (
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {showForgotPassword && (
              <Link
                href="/forgot-password"
                className="text-sm text-accent hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
        </div>

        {showRememberMe && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me for 30 days
            </Label>
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?
        </span>{" "}
        <Link href="/register" className="text-sm font-semibold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
