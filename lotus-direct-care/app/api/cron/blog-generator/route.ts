import { NextRequest, NextResponse } from 'next/server';
import { BlogGenerator } from '@/lib/ai/blog-generator';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { BlogNotificationService } from '@/lib/services/blog-notification';

// This function runs on a schedule via Vercel Cron
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = (await headers()).get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Blog generator cron job started');
    
    const supabase = await createClient();
    const generator = BlogGenerator.getInstance();

    // Check if we should generate a new post
    // Get the count of draft posts
    const { count: draftCount } = await supabase
      .from('blog_posts_ai')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft');

    // Only generate new posts if we have fewer than 3 drafts
    if (draftCount !== null && draftCount < 3) {
      console.log(`Found ${draftCount} draft posts, generating new one`);
      
      try {
        const blogPost = await generator.generatePost();
        
        // Save to database as draft with retry logic for duplicate slugs
        let data = null;
        let error = null;
        let retries = 0;
        const maxRetries = 3;

        while (!data && retries < maxRetries) {
          const result = await supabase
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
              status: 'draft',
              ai_model: blogPost.aiModel,
              generation_prompt: blogPost.generationPrompt,
              author_name: 'Dr. Aaron Rosenberg',
              author_role: 'Medical Director',
            })
            .select()
            .single();

          data = result.data;
          error = result.error;

          // Check if error is due to duplicate slug
          if (error && error.code === '23505' && error.message?.includes('slug')) {
            console.log(`Duplicate slug detected: ${blogPost.slug}, regenerating...`);
            retries++;
            
            // Regenerate the slug with additional randomness
            const timestamp = Date.now().toString(36);
            const randomSuffix = Math.random().toString(36).substring(2, 7);
            blogPost.slug = `${blogPost.slug.split('-')[0]}-${timestamp}-${randomSuffix}`;
            
            error = null; // Clear error for next iteration
          } else if (error) {
            // Other error, break out of loop
            break;
          }
        }

        if (error) {
          console.error('Failed to save generated blog post:', error);
        } else {
          console.log('Successfully generated blog post:', data.title);
          // Send approval notification to admin
          await BlogNotificationService.sendApprovalNotification(data);
        }
      } catch (error) {
        console.error('Failed to generate blog post:', error);
      }
    } else {
      console.log(`Found ${draftCount} draft posts, skipping generation`);
    }

    // Process scheduled posts
    const now = new Date().toISOString();
    const { data: scheduledPosts, error: scheduledError } = await supabase
      .from('blog_posts_ai')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', now);

    if (scheduledError) {
      console.error('Failed to fetch scheduled posts:', scheduledError);
    } else if (scheduledPosts && scheduledPosts.length > 0) {
      console.log(`Found ${scheduledPosts.length} posts to publish`);
      
      // Publish scheduled posts
      for (const post of scheduledPosts) {
        const { error: updateError } = await supabase
          .from('blog_posts_ai')
          .update({
            status: 'published',
            published_at: now,
          })
          .eq('id', post.id);

        if (updateError) {
          console.error(`Failed to publish post ${post.id}:`, updateError);
        } else {
          console.log(`Published post: ${post.title}`);
          
          // Send notifications to subscribers
          await BlogNotificationService.sendPublishedNotification(post);
        }
      }
    }

    // Clean up old drafts (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { error: cleanupError } = await supabase
      .from('blog_posts_ai')
      .delete()
      .eq('status', 'draft')
      .lt('created_at', thirtyDaysAgo.toISOString());

    if (cleanupError) {
      console.error('Failed to clean up old drafts:', cleanupError);
    }

    return NextResponse.json({
      success: true,
      message: 'Blog generator cron job completed',
      draftCount,
      publishedCount: scheduledPosts?.length || 0,
    });
  } catch (error) {
    console.error('Blog generator cron error:', error);
    return NextResponse.json(
      { error: 'Cron job failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Vercel Cron configuration
// Using Node.js runtime for compatibility with AI services and email functionality
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds max