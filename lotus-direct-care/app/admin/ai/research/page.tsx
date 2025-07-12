import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { 
  Search, 
  Database, 
  Clock, 
  BarChart3, 
  AlertCircle,
  CheckCircle,
  Plus,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import ResearchActions from './research-actions';

export const dynamic = 'force-dynamic';

async function getResearchStats() {
  const supabase = await createClient();
  
  // Get counts for different entities
  const [
    { count: totalQueries },
    { count: totalSources },
    { count: totalResults },
    { data: recentHistory }
  ] = await Promise.all([
    supabase.from('research_queries').select('*', { count: 'exact', head: true }),
    supabase.from('research_sources').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('research_results').select('*', { count: 'exact', head: true }).eq('is_duplicate', false),
    supabase.from('research_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  return {
    totalQueries: totalQueries || 0,
    totalSources: totalSources || 0,
    totalResults: totalResults || 0,
    recentHistory: recentHistory || []
  };
}

async function getRecentQueries() {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('research_queries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
    
  return data || [];
}

async function getRecentResults() {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('research_results')
    .select(`
      *,
      research_sources(name, domain)
    `)
    .eq('is_duplicate', false)
    .order('created_at', { ascending: false })
    .limit(10);
    
  return data || [];
}

export default async function ResearchDashboardPage() {
  const [stats, queries, results] = await Promise.all([
    getResearchStats(),
    getRecentQueries(),
    getRecentResults()
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Research Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Discover and analyze medical content from trusted sources
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/ai/research/sources">
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Manage Sources
            </Button>
          </Link>
          <Link href="/admin/ai/research/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Research Query
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Queries</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQueries}</div>
            <p className="text-xs text-muted-foreground">Research configurations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSources}</div>
            <p className="text-xs text-muted-foreground">Monitored websites</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cached Results</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResults}</div>
            <p className="text-xs text-muted-foreground">Research findings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentHistory.length}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="queries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queries">Research Queries</TabsTrigger>
          <TabsTrigger value="results">Recent Results</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
        </TabsList>

        {/* Queries Tab */}
        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Research Queries</CardTitle>
              <CardDescription>
                Configure and run research queries across your trusted sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {queries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No research queries configured yet</p>
                    <Link href="/admin/ai/research/new">
                      <Button className="mt-4" variant="outline">
                        Create Your First Query
                      </Button>
                    </Link>
                  </div>
                ) : (
                  queries.map((query: any) => (
                    <div key={query.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{query.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{query.query_text}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{query.query_type}</Badge>
                          <span className="text-xs text-gray-500">
                            Last run: {query.last_run_at 
                              ? new Date(query.last_run_at).toLocaleDateString() 
                              : 'Never'}
                          </span>
                          {query.schedule_enabled && (
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              {query.schedule_frequency}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ResearchActions query={query} />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Research Results</CardTitle>
              <CardDescription>
                Latest findings from your research queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No research results yet</p>
                    <p className="text-sm mt-2">Run a research query to see results here</p>
                  </div>
                ) : (
                  results.map((result: any) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{result.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {result.summary}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">
                              From: {result.research_sources?.name || 'Unknown'}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Relevance: {Math.round((result.relevance_score || 0) * 100)}%
                            </Badge>
                            {result.topics && result.topics.length > 0 && (
                              <div className="flex gap-1">
                                {result.topics.slice(0, 3).map((topic: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-4"
                        >
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Activity History</CardTitle>
              <CardDescription>
                Track all research operations and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.recentHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No activity recorded yet</p>
                  </div>
                ) : (
                  stats.recentHistory.map((entry: any) => (
                    <div key={entry.id} className="flex items-center gap-4 p-3 border rounded">
                      {entry.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {entry.action_type.replace('_', ' ').charAt(0).toUpperCase() + 
                           entry.action_type.replace('_', ' ').slice(1)}
                        </p>
                        {entry.error_message && (
                          <p className="text-xs text-red-600">{entry.error_message}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 text-center">
                <Link href="/admin/ai/research/history">
                  <Button variant="outline" size="sm">
                    View Full History
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}