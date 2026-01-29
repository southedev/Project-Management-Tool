import axios from "axios";

// Determine the base URL based on environment
let baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; // Default fallback

if (import.meta.env.VITE_BASE_URL) {
  baseURL = import.meta.env.VITE_BASE_URL;
} else if (typeof window !== 'undefined') {
  // In browser environment - try to detect if we're in production
  const hostname = window.location.hostname;
  if (hostname !== 'localhost' && !hostname.includes('127.0.0.1')) {
    // Production environment - assume backend is at same origin but different port or use environment var
    // Or use a default production backend URL if provided as environment variable
    baseURL = import.meta.env.VITE_BASE_URL;
  }
}

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add token to requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or invalidation
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data if unauthorized
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default instance;
