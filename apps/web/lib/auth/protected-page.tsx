// In a protected page

"use client";

import { useAuthSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthSession();
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Render protected content
  return <div>{children}</div>;
}
