import { NextRequest, NextResponse } from 'next/server';

// Force recompilation
import { BlogGenerator } from '@/lib/ai/blog-generator';
import { createClient } from '@/lib/supabase/server';
import { BlogContext } from '@/lib/ai/prompts/blog-content';
import { BlogNotificationService } from '@/lib/services/blog-notification';

export async function POST(request: NextRequest) {
  try {
    // Check for API key authentication or admin token
    const apiKey = request.headers.get('x-api-key');
    const adminToken = request.headers.get('x-admin-token');
    
    // Also check cookies directly
    const cookieToken = request.cookies.get('admin-token')?.value;
    
    // Debug logging
    console.log('Blog generation auth check:', {
      hasApiKey: !!apiKey,
      hasAdminToken: !!adminToken,
      hasCookieToken: !!cookieToken,
      adminTokenValue: adminToken ? `${adminToken.substring(0, 5)}...` : 'none',
      cookieTokenValue: cookieToken ? `${cookieToken.substring(0, 5)}...` : 'none',
      envKeyExists: !!process.env.ADMIN_API_KEY,
      envKeyValue: process.env.ADMIN_API_KEY ? `${process.env.ADMIN_API_KEY.substring(0, 5)}...` : 'none',
    });
    
    // Accept either the API key, admin token header, or cookie
    const isAuthorized = 
      apiKey === process.env.ADMIN_API_KEY || 
      adminToken === process.env.ADMIN_API_KEY ||
      cookieToken === process.env.ADMIN_API_KEY;
      
    if (!isAuthorized) {
      console.log('Auth failed:', {
        apiKeyMatch: apiKey === process.env.ADMIN_API_KEY,
        adminTokenMatch: adminToken === process.env.ADMIN_API_KEY,
        cookieTokenMatch: cookieToken === process.env.ADMIN_API_KEY,
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    
    // Get request body
    const body = await request.json();
    const { 
      topic, 
      targetAudience, 
      wordCount, 
      tone, 
      includeCallToAction,
      publish = false,
      scheduledFor
    } = body;

    // Generate blog post
    const generator = BlogGenerator.getInstance();
    const context: Partial<BlogContext> = {
      topic,
      targetAudience,
      wordCount,
      tone,
      includeCallToAction,
    };

    console.log('Generating blog post with context:', context);
    const blogPost = await generator.generatePost(context);

    // Save to database
    const { data, error } = await supabase
      .from('blog_posts_ai')
      .insert({
        title: blogPost.title,
        slug: blogPost.slug,
        content: blogPost.content,
        excerpt: blogPost.excerpt,
        category: blogPost.category,
        tags: blogPost.tags,
        seo_title: blogPost.seoTitle,
        seo_description: blogPost.seoDescription,
        seo_keywords: blogPost.seoKeywords,
        status: publish ? 'published' : 'draft',
        published_at: publish ? new Date().toISOString() : null,
        scheduled_for: scheduledFor || null,
        ai_model: blogPost.aiModel,
        generation_prompt: blogPost.generationPrompt,
        author_name: 'Dr. Aaron Rosenberg',
        author_role: 'Medical Director',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save blog post', details: error.message },
        { status: 500 }
      );
    }

    // Send notification emails
    if (data) {
      if (publish) {
        // If publishing immediately, send to subscribers
        await BlogNotificationService.sendPublishedNotification(data);
      } else {
        // If draft, send approval notification to admin
        await BlogNotificationService.sendApprovalNotification(data);
      }
    }

    return NextResponse.json({
      success: true,
      blogPost: data,
      message: publish ? 'Blog post published successfully' : 'Blog post saved as draft',
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve generated posts
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('blog_posts_ai')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve blog posts', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      posts: data,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve blog posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}