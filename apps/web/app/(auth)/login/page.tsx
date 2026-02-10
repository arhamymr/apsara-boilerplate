"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/form/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm
            showRememberMe={true}
            showForgotPassword={true}
            showSocialLogin={true}
          />
        </Suspense>
      </div>
    </div>
  );
}