import type { AuthResponse, Article, CreateArticleInput, Ad, CreateAdInput } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

interface ListArticlesParams {
  breaking?: boolean;
  limit?: number;
  offset?: number;
  sort?: string;
}

interface ListArticlesResponse {
  articles: Article[];
  total: number;
  limit: number;
  offset: number;
}

interface ListAdsParams {
  position?: string;
  active?: boolean;
  limit?: number;
}

export const api = {
  // Auth
  login: (email: string, password: string) => request<AuthResponse>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  register: (email: string, password: string) => request<{ message: string }>(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),

  // Articles
  listArticles: (params?: ListArticlesParams) => {
    const query = new URLSearchParams();
    if (params?.breaking !== undefined) query.set('breaking', params.breaking ? '1' : '0');
    if (params?.limit) query.set('limit', params.limit.toString());
    else query.set('limit', '1000'); // Default to fetching up to 1000 articles
    if (params?.offset) query.set('offset', params.offset.toString());
    if (params?.sort) query.set('sort', params.sort);
    const qs = query.toString();
    return request<ListArticlesResponse>(`/articles${qs ? '?' + qs : ''}`);
  },
  getArticle: (id: number) => request<Article>(`/articles/${id}`),
  createArticle: (data: CreateArticleInput) => request<{ id: number; slug: string }>(`/articles`, { method: 'POST', body: JSON.stringify(data) }),
  updateArticle: (id: number, data: Partial<CreateArticleInput>) => request<{ message: string }>(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteArticle: (id: number) => request<{ message: string }>(`/articles/${id}`, { method: 'DELETE' }),
  toggleBreaking: (id: number, is_breaking: boolean) => request<{ message: string }>(`/articles/${id}/breaking`, { method: 'PATCH', body: JSON.stringify({ is_breaking }) }),

  // Ads
  listAds: (params?: ListAdsParams) => {
    const query = new URLSearchParams();
    if (params?.position) query.set('position', params.position);
    if (params?.active !== undefined) query.set('active', params.active ? '1' : '0');
    if (params?.limit) query.set('limit', params.limit.toString());
    const qs = query.toString();
    return request<Ad[]>(`/ads${qs ? '?' + qs : ''}`);
  },
  getAd: (id: number) => request<Ad>(`/ads/${id}`),
  createAd: (data: CreateAdInput) => request<{ id: number }>(`/ads`, { method: 'POST', body: JSON.stringify(data) }),
  updateAd: (id: number, data: Partial<CreateAdInput>) => request<{ message: string }>(`/ads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAd: (id: number) => request<{ message: string }>(`/ads/${id}`, { method: 'DELETE' }),
};
