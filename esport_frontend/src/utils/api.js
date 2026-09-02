const API_URL = import.meta.env.VITE_API_URL || '';
const getAuthToken = () => {
  try {
    const sessionStr = localStorage.getItem('supabase.auth.token');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      return session?.access_token || null;
    }
  } catch (e) {
    console.warn("Failed to parse token from localStorage", e);
  }
  return null;
};
export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('supabase.auth.token');
    window.location.href = '/';
  }
  return response;
};
