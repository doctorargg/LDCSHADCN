'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  preferred_contact?: string;
  reason_for_visit?: string;
  status: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Use development endpoint that doesn't require authentication
      // TODO: Switch to /api/admin/leads with proper auth in production
      const response = await fetch('/api/admin/leads-dev');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      // The API returns data in a wrapper object
      setLeads(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Leads Management</h1>
        <p>Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Leads Management</h1>
        <Alert className="mb-4">
          <AlertDescription className="text-red-600">
            Error: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Leads Management</h1>
      
      <Card className="p-6">
        <div className="mb-4">
          <p className="text-gray-600">Total leads: {leads.length}</p>
        </div>
        
        {leads.length === 0 ? (
          <p className="text-gray-500">No leads found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone || '-'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {lead.reason_for_visit || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}