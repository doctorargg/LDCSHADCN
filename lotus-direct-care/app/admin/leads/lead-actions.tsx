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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoreHorizontal, Eye, Phone, Mail, UserCheck } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  message?: string;
  reason_for_visit?: string;
}

export default function LeadActions({ lead }: { lead: Lead }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(lead.status);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/leads`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('admin-token=')[1]?.split(';')[0] || ''}`,
        },
        body: JSON.stringify({
          id: lead.id,
          status: newStatus,
        }),
      });

      if (response.ok) {
        setIsStatusOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
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
          <DropdownMenuItem onClick={() => setIsDetailsOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsStatusOpen(true)}>
            <UserCheck className="mr-2 h-4 w-4" />
            Update Status
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href={`mailto:${lead.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </a>
          </DropdownMenuItem>
          {lead.phone && (
            <DropdownMenuItem asChild>
              <a href={`tel:${lead.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call
              </a>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Lead Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Full information for {lead.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{lead.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{lead.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p>{lead.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="capitalize">{lead.status}</p>
              </div>
            </div>
            
            {lead.reason_for_visit && (
              <div>
                <p className="text-sm font-medium text-gray-500">Reason for Visit</p>
                <p>{lead.reason_for_visit}</p>
              </div>
            )}
            
            {lead.message && (
              <div>
                <p className="text-sm font-medium text-gray-500">Message</p>
                <p className="whitespace-pre-wrap">{lead.message}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Lead Status</DialogTitle>
            <DialogDescription>
              Change the status for {lead.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} disabled={isLoading || newStatus === lead.status}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}