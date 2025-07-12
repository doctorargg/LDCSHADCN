import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { Users, Mail, FileText, TrendingUp, Search } from 'lucide-react';

async function getDashboardData() {
  const supabase = await createClient();
  
  // Get lead statistics
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });
    
  const { count: newLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');
    
  // Get AI email statistics
  const { count: totalEmails } = await supabase
    .from('ai_email_responses')
    .select('*', { count: 'exact', head: true });
    
  const { count: emailsToday } = await supabase
    .from('ai_email_responses')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date().toISOString().split('T')[0]);
    
  // Get blog statistics
  const { count: totalPosts } = await supabase
    .from('blog_posts_ai')
    .select('*', { count: 'exact', head: true });
    
  const { count: draftPosts } = await supabase
    .from('blog_posts_ai')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft');
    
  // Get recent activity
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
    
  const { data: recentEmails } = await supabase
    .from('ai_email_responses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    stats: {
      totalLeads: totalLeads || 0,
      newLeads: newLeads || 0,
      totalEmails: totalEmails || 0,
      emailsToday: emailsToday || 0,
      totalPosts: totalPosts || 0,
      draftPosts: draftPosts || 0,
    },
    recentLeads: recentLeads || [],
    recentEmails: recentEmails || [],
  };
}

export default async function AdminDashboardPage() {
  const { stats, recentLeads, recentEmails } = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">
          Monitor your practice's AI-powered features and patient engagement
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/leads" className="block transition-transform hover:scale-105">
          <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                {stats.newLeads} new leads to review
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ai/emails" className="block transition-transform hover:scale-105">
          <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmails}</div>
              <p className="text-xs text-muted-foreground">
                {stats.emailsToday} sent today
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ai/blog" className="block transition-transform hover:scale-105">
          <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.draftPosts} drafts pending review
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ai/emails" className="block transition-transform hover:scale-105">
          <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalLeads > 0 
                  ? Math.round((stats.totalEmails / stats.totalLeads) * 100) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Email response rate
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ai/research" className="block transition-transform hover:scale-105">
          <Card className="cursor-pointer hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">AI Research</div>
              <p className="text-xs text-muted-foreground">
                Medical research & content discovery
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest patient inquiries</CardDescription>
              </div>
              <Link href="/admin/leads" className="text-sm text-lotus-primary hover:text-lotus-primary/80">
                View all →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.length === 0 ? (
                <p className="text-sm text-gray-500">No recent leads</p>
              ) : (
                recentLeads.map((lead: any) => (
                  <div key={lead.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                        lead.status === 'contacted' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {lead.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent AI Emails</CardTitle>
                <CardDescription>Latest automated responses</CardDescription>
              </div>
              <Link href="/admin/ai/emails" className="text-sm text-lotus-primary hover:text-lotus-primary/80">
                View all →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEmails.length === 0 ? (
                <p className="text-sm text-gray-500">No recent emails</p>
              ) : (
                recentEmails.map((email: any) => (
                  <div key={email.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{email.recipient_email}</p>
                      <p className="text-xs text-gray-500">
                        {email.inquiry_type || 'General Inquiry'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(email.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}