"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { logout, user, isInitialized } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/dashboard" className="hover:text-blue-200 transition">
            📚 Publish Platform
          </Link>
        </div>

        <div className="flex gap-8 items-center">
          {isInitialized && user ? (
            <>
              <Link
                href="/books"
                className="hover:text-blue-200 transition font-medium"
              >
                Books
              </Link>
              <Link
                href="/authors"
                className="hover:text-blue-200 transition font-medium"
              >
                Authors
              </Link>
              <Link
                href="/publishers"
                className="hover:text-blue-200 transition font-medium"
              >
                Publishers
              </Link>
              <div className="border-l border-blue-400 pl-8">
                <span className="text-blue-100 text-sm mr-4">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : isInitialized && !user ? (
            <Link
              href="/auth/login"
              className="bg-blue-400 hover:bg-blue-500 px-6 py-2 rounded-lg transition font-medium"
            >
              Login
            </Link>
          ) : (
            <div className="text-blue-100 text-sm">Loading...</div>
          )}
        </div>
      </div>
    </nav>
  );
}
