// API Service - Connect Frontend to Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'Request failed');
  }

  return response.json();
};

// ============================================
// AUTHENTICATION
// ============================================
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, name?: string) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// ============================================
// ARTICLES
// ============================================
export const articlesAPI = {
  getAll: (params?: { category?: string; limit?: number; offset?: number }) =>
    apiRequest(`/articles?${new URLSearchParams(params as any)}`),

  getById: (id: number) => apiRequest(`/articles/${id}`),

  getBreaking: () => apiRequest('/articles/breaking/all'),

  getLatest: (limit = 10) => apiRequest(`/articles/latest?limit=${limit}`),

  getFeatured: (limit = 6) => apiRequest(`/articles/featured?limit=${limit}`),

  search: (query: string, limit = 20) =>
    apiRequest(`/articles/search?q=${encodeURIComponent(query)}&limit=${limit}`),

  incrementViews: (id: number) =>
    apiRequest(`/articles/${id}/view`, { method: 'POST' }),

  create: (data: any) =>
    apiRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiRequest(`/articles/${id}`, { method: 'DELETE' }),
};

// ============================================
// ADVERTISEMENTS
// ============================================
export const advertisementsAPI = {
  getAll: (params?: { category?: string; featured?: boolean; limit?: number }) =>
    apiRequest(`/advertisements?${new URLSearchParams(params as any)}`),

  getById: (id: number) => apiRequest(`/advertisements/${id}`),

  getFeatured: (limit = 6) => apiRequest(`/advertisements/featured?limit=${limit}`),

  incrementViews: (id: number) =>
    apiRequest(`/advertisements/${id}/view`, { method: 'POST' }),

  trackApplication: (id: number) =>
    apiRequest(`/advertisements/${id}/apply`, { method: 'POST' }),

  create: (data: any) =>
    apiRequest('/advertisements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiRequest(`/advertisements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiRequest(`/advertisements/${id}`, { method: 'DELETE' }),
};

// ============================================
// AUCTIONS
// ============================================
export const auctionsAPI = {
  getAll: (params?: { status?: string; category?: string; limit?: number }) =>
    apiRequest(`/auctions?${new URLSearchParams(params as any)}`),

  getById: (id: number) => apiRequest(`/auctions/${id}`),

  getFeatured: (limit = 6) => apiRequest(`/auctions/featured?limit=${limit}`),

  getBids: (id: number) => apiRequest(`/auctions/${id}/bids`),

  placeBid: (id: number, amount: number) =>
    apiRequest(`/auctions/${id}/bid`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),

  incrementWatchers: (id: number) =>
    apiRequest(`/auctions/${id}/watch`, { method: 'POST' }),

  create: (data: any) =>
    apiRequest('/auctions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiRequest(`/auctions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiRequest(`/auctions/${id}`, { method: 'DELETE' }),
};

// ============================================
// CATEGORIES
// ============================================
export const categoriesAPI = {
  getAll: () => apiRequest('/categories'),

  getBySlug: (slug: string) => apiRequest(`/categories/${slug}`),

  create: (data: any) =>
    apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ============================================
// ADS (Banner Ads)
// ============================================
export const adsAPI = {
  getAll: (position?: string) =>
    apiRequest(`/ads${position ? `?position=${position}` : ''}`),

  getById: (id: number) => apiRequest(`/ads/${id}`),

  create: (data: any) =>
    apiRequest('/ads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiRequest(`/ads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    apiRequest(`/ads/${id}`, { method: 'DELETE' }),
};

export default {
  auth: authAPI,
  articles: articlesAPI,
  advertisements: advertisementsAPI,
  auctions: auctionsAPI,
  categories: categoriesAPI,
  ads: adsAPI,
};
