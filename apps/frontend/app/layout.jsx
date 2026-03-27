"use client";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="m-0 p-0 bg-gray-100">
        <AuthProvider>
          <main className="min-h-screen bg-gray-100">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
