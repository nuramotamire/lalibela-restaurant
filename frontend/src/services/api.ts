import axios from 'axios';

// Detect if the app is running in production (built) or development
const isProduction = import.meta.env.PROD; 

// In production, we use a relative path '/api' because the server 
// serves both the frontend and the backend from the same port.
const API_URL = isProduction 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Automatically add JWT token to headers if it exists in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;