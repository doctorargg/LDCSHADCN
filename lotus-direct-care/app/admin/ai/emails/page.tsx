import { createClient } from '@/lib/supabase/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import EmailActions from './email-actions';

async function getAIEmailResponses(status?: string) {
  const supabase = await createClient();
  
  let query = supabase
    .from('ai_email_responses')
    .select(`
      *,
      leads (
        name,
        email,
        reason_for_visit
      )
    `)
    .order('created_at', { ascending: false });
    
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching AI email responses:', error);
    return [];
  }
  
  return data || [];
}

async function getEmailStats() {
  const supabase = await createClient();
  
  const { data: stats } = await supabase
    .from('ai_email_responses')
    .select('status')
    .then(({ data }: any) => {
      const counts = {
        total: data?.length || 0,
        sent: data?.filter((d: any) => d.status === 'sent').length || 0,
        pending: data?.filter((d: any) => d.status === 'pending').length || 0,
        failed: data?.filter((d: any) => d.status === 'failed').length || 0,
      };
      return { data: counts };
    });
    
  return stats || { total: 0, sent: 0, pending: 0, failed: 0 };
}

export default async function AIEmailsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const emails = await getAIEmailResponses(params.status);
  const stats = await getEmailStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Email Responses</h1>
        <p className="mt-2 text-gray-600">
          Review and manage AI-generated email responses to patient inquiries
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Emails</CardDescription>
            <CardTitle className="text-2xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Successfully Sent</CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.sent}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Review</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.failed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filter */}
      <form className="flex gap-4 items-center">
        <label htmlFor="status" className="text-sm font-medium">
          Filter by status:
        </label>
        <select
          name="status"
          id="status"
          defaultValue={params.status || 'all'}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Emails</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <Button type="submit" variant="secondary">Apply Filter</Button>
      </form>

      {/* Email Responses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Inquiry Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AI Model</TableHead>
              <TableHead>Date Sent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No email responses found
                </TableCell>
              </TableRow>
            ) : (
              emails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {email.leads?.name || 'Unknown'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {email.recipient_email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {email.inquiry_type || 'General'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        email.status === 'sent' ? 'default' :
                        email.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                      className="flex items-center gap-1 w-fit"
                    >
                      {email.status === 'sent' && <CheckCircle className="w-3 h-3" />}
                      {email.status === 'pending' && <Clock className="w-3 h-3" />}
                      {email.status === 'failed' && <XCircle className="w-3 h-3" />}
                      {email.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {email.ai_model || 'Claude 3.5'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {email.sent_at 
                      ? new Date(email.sent_at).toLocaleString()
                      : 'Not sent'}
                  </TableCell>
                  <TableCell className="text-right">
                    <EmailActions email={email} />
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