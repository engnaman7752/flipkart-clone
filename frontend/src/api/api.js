import axios from 'axios';

const api = axios.create({
  baseURL: 'https://flipkart-backend-080u.onrender.com/api',
});

api.interceptors.request.use((config) => {
  // Read token directly from local storage where zustand persist saves it
  const authStorageStr = localStorage.getItem('auth-storage');
  if (authStorageStr) {
    try {
      const authData = JSON.parse(authStorageStr);
      const token = authData?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Error parsing auth storage', err);
    }
  }
  return config;
});

export default api;
