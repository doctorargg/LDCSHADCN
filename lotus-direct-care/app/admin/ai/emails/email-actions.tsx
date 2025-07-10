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
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Send, RefreshCw, Copy } from 'lucide-react';

interface AIEmailResponse {
  id: string;
  recipient_email: string;
  inquiry_type: string;
  status: string;
  email_subject?: string;
  email_content?: string;
  error_message?: string;
  sent_at?: string;
  created_at: string;
  ai_model?: string;
  leads?: {
    name: string;
    email: string;
    reason_for_visit?: string;
  };
}

export default function EmailActions({ email }: { email: AIEmailResponse }) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isResendOpen, setIsResendOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, you would have an API endpoint to resend emails
      const response = await fetch(`/api/admin/emails/${email.id}/resend`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('admin-token=')[1]?.split(';')[0] || ''}`,
        },
      });

      if (response.ok) {
        setIsResendOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Error resending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
          <DropdownMenuItem onClick={() => setIsViewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Email
          </DropdownMenuItem>
          {email.status === 'failed' && (
            <DropdownMenuItem onClick={() => setIsResendOpen(true)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Resend
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => copyToClipboard(email.email_content || '')}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Content
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Email Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Email Response</DialogTitle>
            <DialogDescription>
              Generated response for {email.leads?.name || email.recipient_email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Email Metadata */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Recipient</p>
                <p>{email.leads?.name || 'Unknown'} ({email.recipient_email})</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Inquiry Type</p>
                <p className="capitalize">{email.inquiry_type || 'General'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Status</p>
                <Badge
                  variant={
                    email.status === 'sent' ? 'default' :
                    email.status === 'pending' ? 'secondary' :
                    'destructive'
                  }
                >
                  {email.status}
                </Badge>
              </div>
              <div>
                <p className="font-medium text-gray-500">AI Model</p>
                <p>{email.ai_model || 'Claude 3.5 Sonnet'}</p>
              </div>
              {email.sent_at && (
                <div>
                  <p className="font-medium text-gray-500">Sent At</p>
                  <p>{new Date(email.sent_at).toLocaleString()}</p>
                </div>
              )}
              {email.leads?.reason_for_visit && (
                <div className="col-span-2">
                  <p className="font-medium text-gray-500">Reason for Visit</p>
                  <p>{email.leads.reason_for_visit}</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {email.error_message && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-700 mt-1">{email.error_message}</p>
              </div>
            )}

            {/* Email Content */}
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700 mb-1">Subject</p>
                <p className="p-3 bg-gray-50 rounded-md">
                  {email.email_subject || 'No subject'}
                </p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Email Content</p>
                <div className="p-4 bg-gray-50 rounded-md">
                  {email.email_content ? (
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: email.email_content }}
                    />
                  ) : (
                    <p className="text-gray-500">No content available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => copyToClipboard(email.email_content || '')}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resend Confirmation Dialog */}
      <Dialog open={isResendOpen} onOpenChange={setIsResendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resend Email</DialogTitle>
            <DialogDescription>
              Are you sure you want to resend this email to {email.recipient_email}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResendOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResend} disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              Resend Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}