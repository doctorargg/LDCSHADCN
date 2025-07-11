import { createClient } from '@/lib/supabase/server';
import { BlogPost, BlogCategory, BlogTag } from '@/lib/types/blog';
import { calculateReadingTime } from '@/lib/utils/blog-client';

// Default author for AI-generated posts
const DEFAULT_AUTHOR = {
  id: 'dr-aaron-rosenberg',
  name: 'Dr. Aaron Rosenberg',
  role: 'Functional Medicine Physician',
  bio: 'Dr. Aaron Rosenberg is a board-certified family physician specializing in functional medicine and longevity.',
};

export async function getAllBlogPostsFromDB(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('blog_posts_ai')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts from database:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    return data.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || post.content.substring(0, 160) + '...',
      content: post.content,
      featuredImage: post.featured_image_url,
      author: DEFAULT_AUTHOR,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      readingTime: post.reading_time_minutes || calculateReadingTime(post.content),
      categories: post.category ? [post.category] : [],
      tags: post.tags || [],
      seo: {
        metaTitle: post.seo_title,
        metaDescription: post.seo_description,
        keywords: post.seo_keywords || [],
      },
    }));
  } catch (error) {
    console.error('Error in getAllBlogPostsFromDB:', error);
    return [];
  }
}

export async function getBlogPostFromDB(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('blog_posts_ai')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || data.content.substring(0, 160) + '...',
      content: data.content,
      featuredImage: data.featured_image_url,
      author: DEFAULT_AUTHOR,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      readingTime: data.reading_time_minutes || calculateReadingTime(data.content),
      categories: data.category ? [data.category] : [],
      tags: data.tags || [],
      seo: {
        metaTitle: data.seo_title,
        metaDescription: data.seo_description,
        keywords: data.seo_keywords || [],
      },
    };
  } catch (error) {
    console.error('Error in getBlogPostFromDB:', error);
    return null;
  }
}

export async function getAllCategoriesFromDB(): Promise<BlogCategory[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('blog_posts_ai')
      .select('category')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .not('category', 'is', null);
    
    if (error || !data) {
      return [];
    }
    
    // Count categories
    const categoryMap = new Map<string, number>();
    data.forEach(post => {
      if (post.category) {
        const count = categoryMap.get(post.category) || 0;
        categoryMap.set(post.category, count + 1);
      }
    });
    
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    }));
  } catch (error) {
    console.error('Error in getAllCategoriesFromDB:', error);
    return [];
  }
}

export async function getAllTagsFromDB(): Promise<BlogTag[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('blog_posts_ai')
      .select('tags')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString());
    
    if (error || !data) {
      return [];
    }
    
    // Count tags
    const tagMap = new Map<string, number>();
    data.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          const count = tagMap.get(tag) || 0;
          tagMap.set(tag, count + 1);
        });
      }
    });
    
    return Array.from(tagMap.entries()).map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    }));
  } catch (error) {
    console.error('Error in getAllTagsFromDB:', error);
    return [];
  }
}