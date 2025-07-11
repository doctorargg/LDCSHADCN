import { createClient } from '@/lib/supabase/server';
import { BlogPost } from '@/lib/types/blog';

// Default author for AI-generated posts
const DEFAULT_AUTHOR = {
  name: 'Dr. Aaron Rosenberg',
  role: 'Medical Director',
  avatar: '/images/dr-rosenberg.jpg',
  bio: 'Dr. Aaron Rosenberg is the founder and medical director of Lotus Direct Care, specializing in functional medicine and personalized healthcare.',
};

export class BlogDatabaseService {
  /**
   * Get all published blog posts from the database
   */
  static async getAllBlogPosts(): Promise<BlogPost[]> {
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

      // Convert database format to BlogPost interface
      return data.map(post => this.convertToBlogPost(post));
    } catch (error) {
      console.error('Error in getAllBlogPosts:', error);
      return [];
    }
  }

  /**
   * Get a single blog post by slug
   */
  static async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      const supabase = await createClient();
      
      const { data, error } = await supabase
        .from('blog_posts_ai')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        return null;
      }

      return this.convertToBlogPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Get blog posts by category
   */
  static async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const supabase = await createClient();
      
      const { data, error } = await supabase
        .from('blog_posts_ai')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (error || !data) {
        return [];
      }

      return data.map(post => this.convertToBlogPost(post));
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  }

  /**
   * Get blog posts by tag
   */
  static async getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    try {
      const supabase = await createClient();
      
      const { data, error } = await supabase
        .from('blog_posts_ai')
        .select('*')
        .eq('status', 'published')
        .contains('tags', [tag])
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (error || !data) {
        return [];
      }

      return data.map(post => this.convertToBlogPost(post));
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      return [];
    }
  }

  /**
   * Convert database post to BlogPost interface
   */
  private static convertToBlogPost(dbPost: any): BlogPost {
    // Convert category to match frontend expectations
    const categoryMap: Record<string, string> = {
      'Functional Medicine': 'functional-medicine',
      'Weight Management': 'weight-management',
      'Hormone Health': 'hormone-health',
      'Longevity Medicine': 'longevity',
      'Chronic Conditions': 'chronic-conditions',
      'Mental Wellness': 'wellness',
      'Nutrition': 'wellness',
      'General Health': 'wellness',
    };

    const categorySlug = categoryMap[dbPost.category] || 'wellness';

    return {
      slug: dbPost.slug,
      title: dbPost.title,
      excerpt: dbPost.excerpt,
      content: dbPost.content,
      publishedAt: dbPost.published_at,
      updatedAt: dbPost.updated_at || dbPost.published_at,
      author: {
        id: 'dr-aaron-rosenberg',
        name: dbPost.author_name || DEFAULT_AUTHOR.name,
        role: dbPost.author_role || DEFAULT_AUTHOR.role,
        bio: DEFAULT_AUTHOR.bio,
        image: DEFAULT_AUTHOR.avatar,
      },
      categories: [dbPost.category], // Convert single category to array
      tags: dbPost.tags || [],
      readingTime: this.calculateReadingTime(dbPost.content),
      seo: {
        metaTitle: dbPost.seo_title || dbPost.title,
        metaDescription: dbPost.seo_description || dbPost.excerpt,
        keywords: dbPost.seo_keywords || [],
      },
      featuredImage: dbPost.featured_image || `/images/blog/${categorySlug}-default.jpg`,
    };
  }

  /**
   * Calculate reading time for content
   */
  private static calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}