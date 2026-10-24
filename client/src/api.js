import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({ baseURL: API_URL });

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Content
export const getSolutions = () => api.get('/solutions');
export const getServices = () => api.get('/services');
export const getUpselling = () => api.get('/upselling');

// Admin CRUD
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getMyBookings = () => api.get('/bookings/mine');
export const getAllBookings = () => api.get('/bookings');
export const updateBookingStatus = (id, status) =>
  api.patch(`/bookings/${id}/status`, { status });

export default api;
