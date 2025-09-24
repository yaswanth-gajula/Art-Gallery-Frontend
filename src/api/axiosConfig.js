import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9091/api', // Reverted to localhost
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;