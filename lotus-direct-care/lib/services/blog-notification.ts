import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { render } from '@react-email/render';
import BlogNotificationEmail from '@/lib/emails/blog-notification';
import { randomBytes } from 'crypto';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  status: string;
}

export class BlogNotificationService {
  /**
   * Send approval notification to admin when a new blog post is generated
   */
  static async sendApprovalNotification(blogPost: BlogPost) {
    try {
      const adminEmail = process.env.NOTIFICATION_EMAIL;
      if (!adminEmail) {
        console.error('NOTIFICATION_EMAIL not configured');
        return;
      }

      // Generate approval token
      const approvalToken = randomBytes(32).toString('hex');
      
      // Store approval token in database
      const supabase = await createClient();
      await supabase
        .from('blog_posts_ai')
        .update({ 
          approval_token: approvalToken,
          approval_token_expires: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours
        })
        .eq('id', blogPost.id);

      // Render email HTML
      const emailHtml = render(
        BlogNotificationEmail({
          recipientName: 'Dr. Rosenberg',
          blogTitle: blogPost.title,
          blogExcerpt: blogPost.excerpt,
          blogSlug: blogPost.slug,
          blogCategory: blogPost.category,
          approvalToken,
          isApprovalEmail: true,
        })
      );

      // Send email
      await sendEmail({
        to: adminEmail,
        subject: `New Blog Post Ready for Approval: ${blogPost.title}`,
        html: emailHtml,
        text: `A new blog post "${blogPost.title}" is ready for your approval. Please review it in the admin dashboard.`,
      });

      // Record notification in database
      await supabase
        .from('blog_email_notifications')
        .insert({
          blog_post_id: blogPost.id,
          subject: `New Blog Post Ready for Approval: ${blogPost.title}`,
          html_content: emailHtml,
          text_content: `A new blog post "${blogPost.title}" is ready for your approval.`,
          recipient_count: 1,
          sent_at: new Date().toISOString(),
          status: 'sent',
        });

      console.log(`Approval notification sent to ${adminEmail} for blog post: ${blogPost.id}`);
    } catch (error) {
      console.error('Error sending approval notification:', error);
      
      // Record failed notification
      const supabase = await createClient();
      await supabase
        .from('blog_email_notifications')
        .insert({
          blog_post_id: blogPost.id,
          subject: `New Blog Post Ready for Approval: ${blogPost.title}`,
          html_content: '',
          text_content: '',
          recipient_count: 0,
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
  }

  /**
   * Send notification to subscribers when a blog post is published
   */
  static async sendPublishedNotification(blogPost: BlogPost) {
    try {
      const supabase = await createClient();
      
      // Get all subscribers (for now, using leads with newsletter_subscribed = true)
      // In the future, this should use a dedicated subscribers table
      const { data: subscribers, error } = await supabase
        .from('leads')
        .select('email, name')
        .eq('status', 'active')
        .not('email', 'is', null);

      if (error || !subscribers || subscribers.length === 0) {
        console.log('No active subscribers found');
        return;
      }

      let successCount = 0;
      let errorMessages: string[] = [];

      // Send emails to all subscribers
      for (const subscriber of subscribers) {
        try {
          const emailHtml = render(
            BlogNotificationEmail({
              recipientName: subscriber.name?.split(' ')[0] || 'there',
              blogTitle: blogPost.title,
              blogExcerpt: blogPost.excerpt,
              blogSlug: blogPost.slug,
              blogCategory: blogPost.category,
              isApprovalEmail: false,
            })
          );

          await sendEmail({
            to: subscriber.email,
            subject: `New from Dr. Rosenberg: ${blogPost.title}`,
            html: emailHtml,
            text: `Dr. Rosenberg has published a new blog post: ${blogPost.title}. ${blogPost.excerpt}`,
          });

          successCount++;
        } catch (error) {
          console.error(`Error sending to ${subscriber.email}:`, error);
          errorMessages.push(`${subscriber.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Record notification batch in database
      await supabase
        .from('blog_email_notifications')
        .insert({
          blog_post_id: blogPost.id,
          subject: `New from Dr. Rosenberg: ${blogPost.title}`,
          html_content: 'Batch email - content varies per recipient',
          text_content: `Dr. Rosenberg has published a new blog post: ${blogPost.title}`,
          recipient_count: successCount,
          sent_at: new Date().toISOString(),
          status: successCount > 0 ? 'sent' : 'failed',
          error_message: errorMessages.length > 0 ? errorMessages.join('; ') : null,
        });

      console.log(`Blog notification sent to ${successCount}/${subscribers.length} subscribers for post: ${blogPost.id}`);
    } catch (error) {
      console.error('Error sending published notifications:', error);
      
      // Record failed notification
      const supabase = await createClient();
      await supabase
        .from('blog_email_notifications')
        .insert({
          blog_post_id: blogPost.id,
          subject: `New from Dr. Rosenberg: ${blogPost.title}`,
          html_content: '',
          text_content: '',
          recipient_count: 0,
          status: 'failed',
          error_message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
  }

  /**
   * Process blog post approval/rejection via token
   */
  static async processApproval(token: string, action: 'approve' | 'reject') {
    try {
      const supabase = await createClient();
      
      // Find blog post with valid token
      const { data: post, error } = await supabase
        .from('blog_posts_ai')
        .select('*')
        .eq('approval_token', token)
        .gt('approval_token_expires', new Date().toISOString())
        .single();

      if (error || !post) {
        throw new Error('Invalid or expired approval token');
      }

      // Update post status
      const newStatus = action === 'approve' ? 'published' : 'rejected';
      const updateData: any = {
        status: newStatus,
        approval_token: null,
        approval_token_expires: null,
      };

      if (action === 'approve') {
        updateData.published_at = new Date().toISOString();
      }

      await supabase
        .from('blog_posts_ai')
        .update(updateData)
        .eq('id', post.id);

      // If approved, send notifications to subscribers
      if (action === 'approve') {
        await this.sendPublishedNotification(post);
      }

      return { success: true, action, postTitle: post.title };
    } catch (error) {
      console.error('Error processing approval:', error);
      throw error;
    }
  }
}