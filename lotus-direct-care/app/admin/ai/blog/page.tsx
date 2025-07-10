import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Eye, Edit, Calendar, Trash2, Plus } from 'lucide-react';
import BlogActions from './blog-actions';

async function getBlogPosts(status?: string) {
  const supabase = await createClient();
  
  let query = supabase
    .from('blog_posts_ai')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data || [];
}

export default async function BlogManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const posts = await getBlogPosts(params.status);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Blog Management</h1>
          <p className="mt-2 text-gray-600">
            Review, edit, and publish AI-generated blog posts
          </p>
        </div>
        <Link href="/admin/ai/blog/generate">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Generate New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <form className="flex gap-4 items-center">
          <label htmlFor="status" className="text-sm font-medium">
            Filter by status:
          </label>
          <Select name="status" defaultValue={params.status || 'all'}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" variant="secondary">Apply Filter</Button>
        </form>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Scheduled/Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No blog posts found
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post: any) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="line-clamp-1">{post.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                        {post.excerpt}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === 'published' ? 'default' :
                        post.status === 'scheduled' ? 'secondary' :
                        post.status === 'review' ? 'outline' :
                        'secondary'
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(post.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {post.published_at && 
                      new Date(post.published_at).toLocaleDateString()}
                    {post.scheduled_for && 
                      new Date(post.scheduled_for).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <BlogActions post={post} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}