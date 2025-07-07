export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  categories: string[];
  tags: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface BlogCategory {
  slug: string;
  name: string;
  description?: string;
  count?: number;
}

export interface BlogTag {
  slug: string;
  name: string;
  count?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}