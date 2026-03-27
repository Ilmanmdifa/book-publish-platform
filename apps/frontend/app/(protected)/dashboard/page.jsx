"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import api from "@/lib/api";

const LIMIT = 6;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryPage = parseInt(searchParams.get("page")) || 1;

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(queryPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.books.getAll(page);
      setBooks(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/dashboard?page=${newPage}`);
  };

  const isEmpty = !loading && books.length === 0;

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Featured Books
            </h1>
            <p className="text-gray-600 text-lg">
              Discover amazing books from our collection
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading books...</p>
            </div>
          )}

          {isEmpty && (
            <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-lg mb-2">No books found</p>
              <p className="text-gray-500 text-sm">
                Come back soon for new releases!
              </p>
            </div>
          )}

          {!isEmpty && !loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-6xl">📖</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        By {book.author?.name || "Unknown Author"}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        Published by{" "}
                        {book.publisher?.name || "Unknown Publisher"}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Release Year: {book.releaseYear || "N/A"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mb-12">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 text-black/80 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`px-4 py-2 rounded-lg transition ${
                        p === page
                          ? "bg-blue-500 font-bold"
                          : "border border-gray-300 text-black/80 hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="px-4 py-2 border border-gray-300 text-black/80 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>

              {!isEmpty && (
                <div className="text-center text-gray-600 text-sm">
                  Page {page} of {totalPages}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
