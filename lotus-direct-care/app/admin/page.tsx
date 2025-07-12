import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/leads">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Leads Management</h2>
            <p className="text-gray-600">View and manage form submissions</p>
          </Card>
        </Link>
        
        <Link href="/admin/research/diagnostics">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Research Diagnostics</h2>
            <p className="text-gray-600">Check system health and configuration</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}