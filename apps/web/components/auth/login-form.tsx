"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLoginButton } from "./google-login-button";
import { EmailPasswordLoginForm } from "./email-password-login-form";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isEmailLoading, setIsEmailLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGoogleLoginSuccess = () => {
    router.push(redirectTo);
  };

  const handleGoogleLoginError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleEmailLoadingChange = (isLoading: boolean) => {
    setIsEmailLoading(isLoading);
  };

  const handleGoogleLoadingChange = (isLoading: boolean) => {
    setIsGoogleLoading(isLoading);
  };

  const handleEmailSubmit = async (
    email: string,
    password: string,
    remember: boolean,
  ) => {
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
            setIsEmailLoading(true);
          },
          onSuccess: () => {
            router.push(redirectTo);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsEmailLoading(false);
          },
        },
      );
    }
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
          <GoogleLoginButton
            redirectTo={redirectTo}
            disabled={isEmailLoading}
            onLoadingChange={handleGoogleLoadingChange}
            onError={handleGoogleLoginError}
            onSuccess={handleGoogleLoginSuccess}
          />

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

      <EmailPasswordLoginForm
        onSubmit={handleEmailSubmit}
        redirectTo={redirectTo}
        showRememberMe={showRememberMe}
        showForgotPassword={showForgotPassword}
        disabled={isGoogleLoading}
      />

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?
        </span>{" "}
        <Link
          href="/register"
          className="text-sm font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
