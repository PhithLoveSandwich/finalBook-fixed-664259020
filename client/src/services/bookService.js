import api from "./api";

const BOOK_API = import.meta.env.VITE_BOOK_API || "/books";

const BookService = {
  getAll: (params) => api.get(`${BOOK_API}`, { params }),
  create: (data) => api.post(`${BOOK_API}`, data),
  search: (query) => api.get(`${BOOK_API}/search`, { params: { q: query } }),
  getStatistics: () => api.get(`${BOOK_API}/statistics`),
  filter: (filters) => api.get(`${BOOK_API}/filter`, { params: filters }),
  getById: (id) => api.get(`${BOOK_API}/${id}`),
  update: (id, data) => api.put(`${BOOK_API}/${id}`, data),
  remove: (id) => api.delete(`${BOOK_API}/${id}`),
};

export default BookService;
