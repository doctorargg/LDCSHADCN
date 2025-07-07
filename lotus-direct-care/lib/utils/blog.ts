import { BlogPost, BlogCategory, BlogTag, PaginationInfo } from '@/lib/types/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_PER_PAGE = 9;
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const posts = files
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        const slug = file.replace(/\.(md|mdx)$/, '');
        const readingTime = calculateReadingTime(content);
        
        return {
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || content.slice(0, 160) + '...',
          content,
          featuredImage: data.featuredImage,
          author: data.author || {
            id: 'dr-aaron-rosenberg',
            name: 'Dr. Aaron Rosenberg',
            role: 'Functional Medicine Physician',
            bio: 'Dr. Aaron Rosenberg is a board-certified family physician specializing in functional medicine and longevity.',
          },
          publishedAt: data.publishedAt || new Date().toISOString(),
          updatedAt: data.updatedAt,
          readingTime,
          categories: data.categories || [],
          tags: data.tags || [],
          seo: data.seo,
        } as BlogPost;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  
  // Score posts based on shared categories and tags
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;
      
      // Score for shared categories
      post.categories.forEach(category => {
        if (currentPost.categories.includes(category)) {
          score += 2;
        }
      });
      
      // Score for shared tags
      post.tags.forEach(tag => {
        if (currentPost.tags.includes(tag)) {
          score += 1;
        }
      });
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
  
  return scoredPosts;
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const posts = await getAllBlogPosts();
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.categories.forEach(category => {
      const count = categoryMap.get(category) || 0;
      categoryMap.set(category, count + 1);
    });
  });
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    slug: generateSlug(name),
    name,
    count,
  }));
}

export async function getAllTags(): Promise<BlogTag[]> {
  const posts = await getAllBlogPosts();
  const tagMap = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });
  
  return Array.from(tagMap.entries()).map(([name, count]) => ({
    slug: generateSlug(name),
    name,
    count,
  }));
}

export function getPaginatedPosts(
  posts: BlogPost[],
  page: number = 1,
  itemsPerPage: number = POSTS_PER_PAGE
): { posts: BlogPost[]; pagination: PaginationInfo } {
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  
  const pagination: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
  
  return { posts: paginatedPosts, pagination };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateBlogJsonLd(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      description: post.author.bio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lotus Direct Care',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lotusdirectcare.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}