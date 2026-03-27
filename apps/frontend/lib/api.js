const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ============================================================================
// HELPERS
// ============================================================================

const getFetchOptions = (method, body = null) => {
  const headers = { "Content-Type": "application/json" };

  // Add Authorization header if token exists
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return {
    method,
    headers,
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw { response: { status: res.status, data } };
  }
  return { data, status: res.status };
};

const request = async (endpoint, method, body = null) => {
  const res = await fetch(
    `${API_BASE_URL}${endpoint}`,
    getFetchOptions(method, body),
  );
  return handleResponse(res);
};

// ============================================================================
// HTTP METHODS
// ============================================================================

const api = {
  get: (endpoint) => request(endpoint, "GET"),
  post: (endpoint, data) => request(endpoint, "POST", data),
  put: (endpoint, data) => request(endpoint, "PUT", data),
  delete: (endpoint) => request(endpoint, "DELETE"),

  // ========================================================================
  // AUTHENTICATION
  // ========================================================================
  auth: {
    register: (name, email, password) =>
      api.post("/auth/register", { name, email, password }),
    login: (email, password) => api.post("/auth/login", { email, password }),
    logout: () => api.post("/auth/logout"),
  },

  // ========================================================================
  // AUTHORS
  // ========================================================================
  authors: {
    getAll: (page = 1) => api.get(`/authors?page=${page}&limit=5`),
    getById: (id) => api.get(`/authors/${id}`),
    create: (name) => api.post(`/authors`, { name }),
    update: (id, name) => api.put(`/authors/${id}`, { name }),
    delete: (id) => api.delete(`/authors/${id}`),
  },

  // ========================================================================
  // BOOKS
  // ========================================================================
  books: {
    getAll: (page = 1) => api.get(`/books?page=${page}&limit=5`),
    getById: (id) => api.get(`/books/${id}`),
    create: (title, authorId, publisherId, releaseYear) =>
      api.post(`/books`, { title, authorId, publisherId, releaseYear }),
    update: (id, title, authorId, publisherId, releaseYear) =>
      api.put(`/books/${id}`, { title, authorId, publisherId, releaseYear }),
    delete: (id) => api.delete(`/books/${id}`),
  },

  // ========================================================================
  // PUBLISHERS
  // ========================================================================
  publishers: {
    getAll: (page = 1) => api.get(`/publishers?page=${page}&limit=5`),
    getById: (id) => api.get(`/publishers/${id}`),
    create: (name) => api.post(`/publishers`, { name }),
    update: (id, name) => api.put(`/publishers/${id}`, { name }),
    delete: (id) => api.delete(`/publishers/${id}`),
  },
};

export default api;
