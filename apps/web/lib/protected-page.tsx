// In a protected page

'use client';

import { useAuthSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthSession();
  const router = useRouter();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
  
  // Render protected content
  return <div>{children}</div>;
}
