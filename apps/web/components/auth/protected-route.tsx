"use client";

import * as React from "react";
import { useAuthSessionWithRoles } from " @/lib/auth-client";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "admin" | "user";
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requireRole = "user",
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  ),
}: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, isLoading } = useAuthSessionWithRoles();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (!hasRole(requireRole)) {
    return fallback;
  }

  return <>{children}</>;
}

// Simplified component for admin-only features
export function AdminOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireRole="admin" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

// Simplified component for authenticated users
export function AuthenticatedOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireRole="user" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}
