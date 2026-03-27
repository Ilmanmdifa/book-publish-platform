"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}
