import api from './api';

let accessToken = null;

export function setToken(token) {
  accessToken = token;
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export function getToken() {
  return accessToken;
}

export function clearToken() {
  accessToken = null;
  delete api.defaults.headers.common['Authorization'];
}

// Try to obtain an access token from refresh cookie on app start
export async function initAuth() {
  try {
    const res = await api.post('/refresh-token');
    if (res?.data?.token) {
      setToken(res.data.token);
      return true;
    }
  } catch {
    // no valid refresh cookie or failed
  }
  return false;
}

export default { setToken, getToken, clearToken, initAuth };
