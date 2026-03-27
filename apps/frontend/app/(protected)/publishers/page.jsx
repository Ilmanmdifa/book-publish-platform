"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

const LIMIT = 5;

export default function PublishersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryPage = parseInt(searchParams.get("page")) || 1;

  const [publishers, setPublishers] = useState([]);
  const [page, setPage] = useState(queryPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPublishers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.publishers.getAll(page);
      setPublishers(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch publishers");
      setPublishers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/publishers?page=${newPage}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this publisher?")) return;

    try {
      await api.publishers.delete(id);
      fetchPublishers();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  const isEmpty = !loading && publishers.length === 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Publishers</h1>
        <Link
          href="/publishers/create"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Create Publisher
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading publishers...</p>
        </div>
      )}

      {isEmpty && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-lg mb-2">No publishers found</p>
          <p className="text-gray-500 text-sm mb-6">
            Get started by creating your first publisher
          </p>
          <Link
            href="/publishers/create"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Your First Publisher
          </Link>
        </div>
      )}

      {!isEmpty && !loading && (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((publisher) => (
                  <tr
                    key={publisher.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {publisher.name}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link
                        href={`/publishers/${publisher.id}/edit`}
                        className="text-blue-500 hover:text-blue-700 font-medium transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(publisher.id)}
                        className="text-red-500 hover:text-red-700 font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`px-3 py-2 rounded-lg transition font-medium ${
                  page === p
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
