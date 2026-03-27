// components/ProtectedRoute.jsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/auth/login");
    }
  }, [user, isInitialized, router]);

  // Wait for AuthContext to initialize before checking auth
  if (!isInitialized) return <p>Loading...</p>;

  // Redirect if not authenticated
  if (!user) return null;

  return children;
}
