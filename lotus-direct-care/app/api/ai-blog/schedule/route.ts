import { NextRequest, NextResponse } from 'next/server';
import { BlogGenerator } from '@/lib/ai/blog-generator';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const body = await request.json();
    const { 
      postId,
      scheduledFor,
      action = 'schedule' // 'schedule', 'publish', 'unpublish'
    } = body;

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    let updateData: any = {};

    switch (action) {
      case 'schedule':
        if (!scheduledFor) {
          return NextResponse.json({ error: 'Scheduled date is required' }, { status: 400 });
        }
        updateData = {
          status: 'scheduled',
          scheduled_for: scheduledFor,
        };
        break;

      case 'publish':
        updateData = {
          status: 'published',
          published_at: new Date().toISOString(),
          scheduled_for: null,
        };
        break;

      case 'unpublish':
        updateData = {
          status: 'draft',
          published_at: null,
          scheduled_for: null,
        };
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update the post
    const { data, error } = await supabase
      .from('blog_posts_ai')
      .update(updateData)
      .eq('id', postId)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: data,
      message: `Blog post ${action}ed successfully`,
    });
  } catch (error) {
    console.error('Blog scheduling error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve scheduled posts
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    
    // Get posts scheduled for publication
    const now = new Date().toISOString();
    const { data: scheduledPosts, error } = await supabase
      .from('blog_posts_ai')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', now)
      .order('scheduled_for', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve scheduled posts', details: error.message },
        { status: 500 }
      );
    }

    // Automatically publish posts that are due
    const publishedPosts = [];
    for (const post of scheduledPosts || []) {
      const { data, error: updateError } = await supabase
        .from('blog_posts_ai')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', post.id)
        .select()
        .single();

      if (!updateError && data) {
        publishedPosts.push(data);
      }
    }

    // Get upcoming scheduled posts
    const { data: upcomingPosts, error: upcomingError } = await supabase
      .from('blog_posts_ai')
      .select('*')
      .eq('status', 'scheduled')
      .gt('scheduled_for', now)
      .order('scheduled_for', { ascending: true })
      .limit(10);

    if (upcomingError) {
      console.error('Database error:', upcomingError);
    }

    return NextResponse.json({
      success: true,
      publishedNow: publishedPosts,
      upcoming: upcomingPosts || [],
      message: `Published ${publishedPosts.length} posts`,
    });
  } catch (error) {
    console.error('Error processing scheduled posts:', error);
    return NextResponse.json(
      { error: 'Failed to process scheduled posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}