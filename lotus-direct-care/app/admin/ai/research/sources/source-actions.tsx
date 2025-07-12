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
import { MoreHorizontal, RefreshCw, Edit, Trash2, Power, PowerOff } from 'lucide-react';
import { getAdminHeaders } from '@/lib/admin-auth';

interface SourceActionsProps {
  source: {
    id: string;
    name: string;
    is_active: boolean;
  };
}

export default function SourceActions({ source }: SourceActionsProps) {
  const router = useRouter();
  const [isCrawling, setIsCrawling] = useState(false);

  const handleCrawl = async () => {
    setIsCrawling(true);
    try {
      const response = await fetch(`/api/admin/research/sources/${source.id}/crawl`, {
        method: 'POST',
        headers: getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to crawl source');
      }

      console.log(`Crawl started for ${source.name}`);
      alert(`Crawl started for ${source.name}. This may take a few moments.`);

      router.refresh();
    } catch (error) {
      console.error('Error starting crawl:', error);
      alert('Failed to start crawl. Please try again.');
    } finally {
      setIsCrawling(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      const response = await fetch(`/api/admin/research/sources/${source.id}`, {
        method: 'PATCH',
        headers: getAdminHeaders(),
        body: JSON.stringify({ is_active: !source.is_active }),
      });

      if (!response.ok) {
        throw new Error('Failed to update source');
      }

      console.log(`Source ${source.name} ${source.is_active ? 'deactivated' : 'activated'}`);
      alert(`${source.name} is now ${source.is_active ? 'inactive' : 'active'}`);

      router.refresh();
    } catch (error) {
      console.error('Error updating source status:', error);
      alert('Failed to update source status. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${source.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/research/sources/${source.id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete source');
      }

      console.log('Research source deleted successfully');
      alert('Research source deleted successfully!');

      router.refresh();
    } catch (error) {
      console.error('Error deleting source:', error);
      alert('Failed to delete source. Please try again.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCrawl}
        disabled={isCrawling || !source.is_active}
      >
        <RefreshCw className={`h-3 w-3 mr-1 ${isCrawling ? 'animate-spin' : ''}`} />
        {isCrawling ? 'Crawling...' : 'Crawl'}
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
            onClick={() => router.push(`/admin/ai/research/sources/${source.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleActive}>
            {source.is_active ? (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
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