import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowLeft, Edit, Calendar, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

async function getBlogPost(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_posts_ai')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    notFound();
  }
  
  return data;
}

export default async function BlogPostViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/ai/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog Posts
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/admin/ai/blog/${id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          {post.status === 'published' && (
            <Link href={`/resources/blog/${post.slug}`} target="_blank">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Live
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <div className="flex gap-2 items-center text-sm text-gray-500">
                <Badge variant={
                  post.status === 'published' ? 'default' :
                  post.status === 'scheduled' ? 'secondary' :
                  'outline'
                }>
                  {post.status}
                </Badge>
                <span>•</span>
                <span>{post.category}</span>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Excerpt */}
          <div>
            <h3 className="font-semibold mb-2">Excerpt</h3>
            <p className="text-gray-600">{post.excerpt}</p>
          </div>

          <Separator />

          {/* SEO Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">SEO Information</h3>
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">SEO Title</p>
                <p>{post.seo_title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Meta Description</p>
                <p>{post.seo_description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Keywords</p>
                <div className="flex gap-2 mt-1">
                  {post.seo_keywords?.map((keyword: string) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex gap-2">
              {post.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Content */}
          <div>
            <h3 className="font-semibold mb-4">Content</h3>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>

          {/* AI Generation Info */}
          {post.ai_model && (
            <>
              <Separator />
              <div className="space-y-2 text-sm text-gray-500">
                <p><strong>AI Model:</strong> {post.ai_model}</p>
                <p><strong>Author:</strong> {post.author_name || 'Dr. Aaron Rosenberg'}</p>
                {post.scheduled_for && (
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <strong>Scheduled for:</strong> {new Date(post.scheduled_for).toLocaleString()}
                  </p>
                )}
                {post.published_at && (
                  <p><strong>Published:</strong> {new Date(post.published_at).toLocaleString()}</p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}