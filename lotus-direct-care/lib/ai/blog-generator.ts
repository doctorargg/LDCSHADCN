import { AIServiceFactory } from './services/factory';
import { blogConfig, practiceInfo } from './config';
import {
  BlogContext,
  generateBlogSystemPrompt,
  generateBlogPrompt,
  selectBlogTopic,
  generateSEOMetadata,
} from './prompts/blog-content';

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  aiGenerated: boolean;
  aiModel?: string;
  generationPrompt?: string;
  error?: string;
}

export class BlogGenerator {
  private static instance: BlogGenerator;

  private constructor() {}

  static getInstance(): BlogGenerator {
    if (!this.instance) {
      this.instance = new BlogGenerator();
    }
    return this.instance;
  }

  async generatePost(context?: Partial<BlogContext>): Promise<BlogPost> {
    console.log('BlogGenerator.generatePost called', {
      enabled: blogConfig.enabled,
      provider: blogConfig.provider,
    });
    
    // Check if AI blog generation is enabled
    if (!blogConfig.enabled) {
      console.log('AI blog generation disabled');
      throw new Error('AI blog generation is disabled');
    }

    // Get AI service
    const aiService = AIServiceFactory.getService();
    if (!aiService) {
      console.error('No AI service available for blog generation');
      throw new Error('No AI service available');
    }

    try {
      // Select topic if not provided
      const topic = context?.topic || await selectBlogTopic();
      const fullContext: BlogContext = {
        topic,
        targetAudience: context?.targetAudience || blogConfig.targetAudience,
        wordCount: context?.wordCount || blogConfig.wordCount,
        tone: context?.tone || blogConfig.tone,
        includeCallToAction: context?.includeCallToAction ?? true,
      };

      // Generate blog post content
      const aiResponse = await aiService.generateResponse(
        generateBlogPrompt(fullContext),
        {
          systemPrompt: generateBlogSystemPrompt(),
          temperature: blogConfig.temperature,
          maxTokens: blogConfig.maxTokens,
        }
      );

      if (aiResponse.error) {
        console.error('AI response error:', aiResponse.error);
        throw new Error(aiResponse.error);
      }

      // Parse the AI response (expecting JSON format)
      const parsedContent = this.parseAIResponse(aiResponse.content);
      
      // Generate SEO metadata if not provided by AI
      const seoMetadata = parsedContent.seoTitle 
        ? {
            title: parsedContent.seoTitle,
            description: parsedContent.seoDescription,
            keywords: parsedContent.seoKeywords,
          }
        : await generateSEOMetadata(parsedContent.title, parsedContent.excerpt);

      // Generate slug from title
      const slug = this.generateSlug(parsedContent.title);

      return {
        title: parsedContent.title,
        slug,
        content: parsedContent.content,
        excerpt: parsedContent.excerpt,
        category: parsedContent.category || this.determineCategory(topic),
        tags: parsedContent.tags || this.generateTags(topic, parsedContent.content),
        seoTitle: seoMetadata.title,
        seoDescription: seoMetadata.description,
        seoKeywords: seoMetadata.keywords,
        aiGenerated: true,
        aiModel: blogConfig.provider || undefined,
        generationPrompt: generateBlogPrompt(fullContext),
      };
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw error;
    }
  }

  private parseAIResponse(content: string): any {
    try {
      // First try to parse as JSON
      return JSON.parse(content);
    } catch {
      // If not JSON, extract structured content from markdown
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const excerptMatch = content.match(/^##\s+Excerpt\s*\n+(.+)$/m);
      
      // Remove title and excerpt from content
      let mainContent = content;
      if (titleMatch) {
        mainContent = mainContent.replace(titleMatch[0], '').trim();
      }
      if (excerptMatch) {
        mainContent = mainContent.replace(excerptMatch[0], '').trim();
      }

      return {
        title: titleMatch?.[1] || 'Untitled Post',
        excerpt: excerptMatch?.[1] || this.extractExcerpt(mainContent),
        content: mainContent,
      };
    }
  }

  private extractExcerpt(content: string, maxLength: number = 160): string {
    // Remove markdown formatting
    const plainText = content
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    // Cut at last complete sentence before maxLength
    const truncated = plainText.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    
    if (lastPeriod > maxLength * 0.8) {
      return truncated.substring(0, lastPeriod + 1);
    }
    
    return truncated.trim() + '...';
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
  }

  private determineCategory(topic: string): string {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('functional medicine') || topicLower.includes('root cause')) {
      return 'Functional Medicine';
    } else if (topicLower.includes('weight') || topicLower.includes('metabol')) {
      return 'Weight Management';
    } else if (topicLower.includes('hormone') || topicLower.includes('thyroid')) {
      return 'Hormone Health';
    } else if (topicLower.includes('longevity') || topicLower.includes('aging')) {
      return 'Longevity Medicine';
    } else if (topicLower.includes('chronic') || topicLower.includes('pain')) {
      return 'Chronic Conditions';
    } else if (topicLower.includes('mental') || topicLower.includes('stress')) {
      return 'Mental Wellness';
    } else if (topicLower.includes('nutrition') || topicLower.includes('diet')) {
      return 'Nutrition';
    }
    
    return 'Health & Wellness';
  }

  private generateTags(topic: string, content: string): string[] {
    const tags = new Set<string>();
    const combinedText = `${topic} ${content}`.toLowerCase();

    // Medical condition tags
    const conditions = [
      'diabetes', 'hypertension', 'thyroid', 'autoimmune', 'inflammation',
      'fatigue', 'depression', 'anxiety', 'obesity', 'metabolic syndrome'
    ];
    
    // Treatment approach tags
    const approaches = [
      'functional medicine', 'integrative health', 'prevention', 'holistic',
      'personalized medicine', 'root cause', 'natural treatment'
    ];
    
    // Service tags
    const services = [
      'direct primary care', 'dpc', 'membership medicine', 'concierge',
      'ketamine therapy', 'weight loss', 'hormone optimization'
    ];

    // Add matching tags
    [...conditions, ...approaches, ...services].forEach(tag => {
      if (combinedText.includes(tag)) {
        tags.add(tag.replace(/\s+/g, '-'));
      }
    });

    // Always include practice branding
    tags.add('lotus-direct-care');
    tags.add('dr-rosenberg');

    return Array.from(tags).slice(0, 5); // Limit to 5 tags
  }

  // Method to generate multiple posts
  async generateBulkPosts(count: number): Promise<BlogPost[]> {
    const posts: BlogPost[] = [];
    
    for (let i = 0; i < count; i++) {
      try {
        const post = await this.generatePost();
        posts.push(post);
        
        // Add delay between generations to avoid rate limits
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`Error generating post ${i + 1}:`, error);
      }
    }
    
    return posts;
  }

  // Method to review and enhance existing draft
  async reviewAndEnhance(draft: Partial<BlogPost>): Promise<BlogPost> {
    const context: BlogContext = {
      topic: draft.title || 'Health and Wellness',
      targetAudience: blogConfig.targetAudience,
      wordCount: blogConfig.wordCount,
      tone: blogConfig.tone,
      includeCallToAction: true,
    };

    const enhancedPost = await this.generatePost(context);
    
    // Preserve original content structure if provided
    return {
      ...enhancedPost,
      title: draft.title || enhancedPost.title,
      slug: draft.slug || enhancedPost.slug,
      content: draft.content ? this.enhanceContent(draft.content, enhancedPost.content) : enhancedPost.content,
    };
  }

  private enhanceContent(original: string, enhanced: string): string {
    // Merge original structure with enhanced content
    // This is a simple implementation - could be made more sophisticated
    return enhanced;
  }
}