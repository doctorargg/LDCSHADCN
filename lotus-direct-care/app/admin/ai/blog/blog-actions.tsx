'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MoreHorizontal, Eye, Edit, Calendar, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  status: string;
}

export default function BlogActions({ post }: { post: BlogPost }) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-blog/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': document.cookie.split('admin-token=')[1]?.split(';')[0] || '',
        },
        body: JSON.stringify({
          postId: post.id,
          action: 'publish',
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchedule = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-blog/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': document.cookie.split('admin-token=')[1]?.split(';')[0] || '',
        },
        body: JSON.stringify({
          postId: post.id,
          action: 'schedule',
          scheduledFor: new Date(scheduledDate).toISOString(),
        }),
      });

      if (response.ok) {
        setIsScheduleOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Error scheduling post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // In a real app, you'd create a delete endpoint
      // For now, we'll just archive it
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': document.cookie.split('admin-token=')[1]?.split(';')[0] || '',
        },
      });

      if (response.ok) {
        setIsDeleteOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/admin/ai/blog/${post.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/ai/blog/${post.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          
          {post.status === 'draft' && (
            <>
              <DropdownMenuItem onClick={handlePublish}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Publish Now
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsScheduleOpen(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Blog Post</DialogTitle>
            <DialogDescription>
              Choose when to publish "{post.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="scheduled-date">Publication Date & Time</Label>
              <Input
                id="scheduled-date"
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} disabled={!scheduledDate || isLoading}>
              Schedule Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{post.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}