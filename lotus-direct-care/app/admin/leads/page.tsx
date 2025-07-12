import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LeadActions from './lead-actions';

async function getLeads(status?: string, search?: string) {
  const supabase = await createClient();
  
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
  
  return data || [];
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const leads = await getLeads(params.status, params.search);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-green-100 text-green-800',
    qualified: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-purple-100 text-purple-800',
    lost: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <p className="mt-2 text-gray-600">
          Track and manage patient inquiries and conversions
        </p>
      </div>

      {/* Filters */}
      <form className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium mb-1">
            Search
          </label>
          <Input
            id="search"
            name="search"
            placeholder="Search by name or email..."
            defaultValue={params.search}
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <Select name="status" defaultValue={params.status || 'all'}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" variant="secondary">
          Apply Filters
        </Button>
      </form>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Reason for Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead: any) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    {lead.name}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{lead.email}</p>
                      {lead.phone && <p className="text-gray-500">{lead.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {lead.reason_for_visit && (
                        <p className="text-sm font-medium">{lead.reason_for_visit}</p>
                      )}
                      {lead.message && (
                        <p className="text-xs text-gray-500 truncate">{lead.message}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <LeadActions lead={lead} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {Object.entries(statusColors).map(([status, color]: any) => {
          const count = leads.filter((lead: any) => lead.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{status}</span>
                <Badge className={color}>{count}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}