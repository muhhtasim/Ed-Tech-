import axios from 'axios';
import auth from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Attach token from in-memory auth on each request
api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(e => Promise.reject(e));
      }

      isRefreshing = true;
      try {
        const resp = await api.post('/refresh-token');
        const newToken = resp.data.token;
        auth.setToken(newToken);
        processQueue(null, newToken);
        isRefreshing = false;
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        isRefreshing = false;
        auth.clearToken();
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
