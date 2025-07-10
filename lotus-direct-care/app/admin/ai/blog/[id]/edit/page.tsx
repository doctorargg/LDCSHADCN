'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  status: string;
}

export default function BlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadPost() {
      const { id } = await params;
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('blog_posts_ai')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error || !data) {
        setError('Failed to load blog post');
      } else {
        setPost(data);
      }
      setIsLoading(false);
    }
    
    loadPost();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    
    setError('');
    setIsSaving(true);

    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('blog_posts_ai')
        .update({
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags,
          seo_title: post.seo_title,
          seo_description: post.seo_description,
          seo_keywords: post.seo_keywords,
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id);

      if (error) {
        setError('Failed to save changes');
      } else {
        router.push(`/admin/ai/blog/${post.id}`);
      }
    } catch (err) {
      setError('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load blog post</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/admin/ai/blog/${post.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Post
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={post.category}
                    onChange={(e) => setPost({ ...post, category: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={post.tags.join(', ')}
                    onChange={(e) => setPost({ 
                      ...post, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                  />
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">SEO Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={post.seo_title}
                  onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">
                  {post.seo_title.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_description">Meta Description</Label>
                <Textarea
                  id="seo_description"
                  value={post.seo_description}
                  onChange={(e) => setPost({ ...post, seo_description: e.target.value })}
                  rows={2}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500">
                  {post.seo_description.length}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo_keywords">Keywords (comma-separated)</Label>
                <Input
                  id="seo_keywords"
                  value={post.seo_keywords.join(', ')}
                  onChange={(e) => setPost({ 
                    ...post, 
                    seo_keywords: e.target.value.split(',').map(kw => kw.trim()).filter(Boolean)
                  })}
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                rows={20}
                className="font-mono text-sm"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}