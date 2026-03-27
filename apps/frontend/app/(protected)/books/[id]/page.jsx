"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookRes = await api.books.getById(bookId);
        const authorRes = await api.authors.getById(bookRes.data.data.authorId); // Fetch author details using the author ID from the book response
        const publisherRes = await api.publishers.getById(
          bookRes.data.data.publisherId,
        ); // Fetch publisher details using the publisher ID from the book response

        setBook({
          ...bookRes.data.data,
          author: authorRes.data.data, // Set the author details in the book object
          publisher: publisherRes.data.data, // Set the publisher details in the book object
        });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.books.delete(bookId);
      router.push("/books");
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || "Book not found"}
        </div>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          ← Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        href="/books"
        className="text-blue-500 hover:text-blue-700 underline mb-6 inline-block"
      >
        ← Back to Books
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover/Icon */}
          <div className="md:w-1/3 flex-shrink-0">
            <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-8xl">📖</span>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {book.title}
            </h1>

            <div className="mb-6 space-y-3 text-gray-700">
              <div>
                <p className="text-sm text-gray-500 font-semibold">AUTHOR</p>
                <p className="text-xl">
                  {book.author?.name || "Unknown Author"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-semibold">PUBLISHER</p>
                <p className="text-xl">
                  {book.publisher?.name || "Unknown Publisher"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-semibold">
                  PUBLICATION YEAR
                </p>
                <p className="text-xl">{book.releaseYear || "N/A"}</p>
              </div>

              {book.description && (
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    DESCRIPTION
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Link
                href={`/books/${book.id}/edit`}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
