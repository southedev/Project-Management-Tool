import axios from "axios";
import { debugApiCall, debugApiResponse, debugApiError } from '@/utils/debug-api';

// Determine the base URL based on environment
let baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; // Default fallback

// In production environments served from GitHub Pages, ensure we're pointing to the backend
if (typeof window !== 'undefined') {
  const currentOrigin = window.location.origin;
  
  // If we're on GitHub Pages, make sure we use the backend URL
  if (currentOrigin.includes('github.io')) {
    baseURL = "https://project-mgt-server-silk.vercel.app/";
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
    // Debug request in development
    debugApiCall(config);
    return config;
  },
  (error) => {
    debugApiError(error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or invalidation
instance.interceptors.response.use(
  (response) => {
    // Debug successful response in development
    debugApiResponse(response);
    return response;
  },
  (error) => {
    // Debug error response in development
    debugApiError(error);
    
    if (error.response?.status === 401) {
      // Clear user data if unauthorized
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default instance;
