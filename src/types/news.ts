export type Category = 'sports' | 'economics' | 'politics' | 'entertainment' | 'all';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  date: string;
  readTime: string;
  imageUrl?: string;
  featured: boolean;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  views: number;
  likes: number;
  comments: number;
  shareCount: number;
  url: string;
  publishedAt: string;
  updatedAt: string;
  isBreaking: boolean;
  isTrending: boolean;
  relatedStories?: string[];
  source?: string;
  location?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  media?: {
    type: 'image' | 'video' | 'gallery';
    url: string;
    caption?: string;
  }[];
}

export interface NewsCategory {
  id: Category;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface NewsResponse {
  items: NewsItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  categories: NewsCategory[];
}
