'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Play, Edit, Trash2, Copy, Eye } from 'lucide-react';
import { getAdminHeaders } from '@/lib/admin-auth';

interface ResearchActionsProps {
  query: {
    id: string;
    name: string;
    query_text: string;
    schedule_enabled: boolean;
  };
}

export default function ResearchActions({ query }: ResearchActionsProps) {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/admin/research/query', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify({ queryId: query.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to run query');
      }

      const data = await response.json();
      
      console.log(`Research query completed: Found ${data.results?.length || 0} results`);
      alert(`Research completed! Found ${data.results?.length || 0} results.`);

      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error('Error running research query:', error);
      alert('Failed to run research query. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${query.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/research/queries/${query.id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete query');
      }

      console.log('Research query deleted successfully');
      alert('Research query deleted successfully!');

      router.refresh();
    } catch (error) {
      console.error('Error deleting query:', error);
      alert('Failed to delete query. Please try again.');
    }
  };

  const handleDuplicate = async () => {
    try {
      const response = await fetch(`/api/admin/research/queries/${query.id}/duplicate`, {
        method: 'POST',
        headers: getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to duplicate query');
      }

      console.log('Query duplicated successfully');
      alert('Query duplicated successfully!');

      router.refresh();
    } catch (error) {
      console.error('Error duplicating query:', error);
      alert('Failed to duplicate query. Please try again.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleRun}
        disabled={isRunning}
      >
        <Play className="h-3 w-3 mr-1" />
        {isRunning ? 'Running...' : 'Run'}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/admin/ai/research/queries/${query.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Results
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/ai/research/queries/${query.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Query
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}