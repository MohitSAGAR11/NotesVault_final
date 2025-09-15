import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
};

export const notesAPI = {
  getNotes: (params = {}) =>
    api.get('/notes', { params }),
  createNote: (note) =>
    api.post('/notes', note),
  updateNote: (id, note) =>
    api.patch(`/notes/${id}`, note),
  deleteNote: (id) =>
    api.delete(`/notes/${id}`),
  getAllTags: () =>
    api.get('/notes/tags/all'),
};

export default api;