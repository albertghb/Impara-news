export interface AuthUser { 
  id: number; 
  email: string;
  name: string;
  role: string;
}
export interface AuthResponse { token: string; user: AuthUser }

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  image_url?: string | null;
  imageUrl?: string | null;
  category?: string | { id: number; name: string; nameRw?: string; slug?: string } | null;
  is_breaking?: 0 | 1 | boolean;
  isBreaking?: boolean;
  published_at?: string | null;
  publishedAt?: string | null;
  created_at?: string;
  createdAt?: string;
  updated_at?: string | null;
  updatedAt?: string | null;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  categoryId: number;
  authorId: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  status?: string;
}

export interface Ad {
  id: number;
  title: string;
  description?: string | null;
  image_url?: string | null;
  imageUrl?: string | null;
  link_url?: string | null;
  linkUrl?: string | null;
  position: 'homepage_top' | 'sidebar' | 'inline';
  active?: 0 | 1 | boolean;
  isActive?: boolean;
  created_at?: string;
  createdAt?: string;
  updated_at?: string | null;
  updatedAt?: string | null;
}

export interface CreateAdInput {
  title: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  position?: 'homepage_top' | 'sidebar' | 'inline';
  active?: boolean;
}
