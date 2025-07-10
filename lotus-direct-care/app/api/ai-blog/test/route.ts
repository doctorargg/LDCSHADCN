import { NextRequest, NextResponse } from 'next/server';
import { BlogGenerator } from '@/lib/ai/blog-generator';

export const dynamic = 'force-dynamic';

// Test endpoint for blog generation (development only)
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const generator = BlogGenerator.getInstance();
    
    // Generate a test blog post (not saved to database)
    const blogPost = await generator.generatePost({
      topic: 'The Benefits of Functional Medicine for Chronic Fatigue',
      targetAudience: 'Adults experiencing persistent fatigue',
      wordCount: 800,
      tone: 'Professional yet empathetic',
      includeCallToAction: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Test blog post generated successfully',
      blogPost: {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        category: blogPost.category,
        tags: blogPost.tags,
        wordCount: blogPost.content.split(/\s+/).length,
        seo: {
          title: blogPost.seoTitle,
          description: blogPost.seoDescription,
          keywords: blogPost.seoKeywords,
        },
        // Include first 500 chars of content as preview
        contentPreview: blogPost.content.substring(0, 500) + '...',
      },
    });
  } catch (error) {
    console.error('Blog test error:', error);
    return NextResponse.json(
      { error: 'Failed to generate test blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}