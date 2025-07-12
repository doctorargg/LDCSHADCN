import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Database,
  RefreshCw,
  FileText,
  Settings
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const actionIcons: Record<string, any> = {
  query_run: Search,
  source_crawl: RefreshCw,
  result_saved: Database,
  result_used: FileText,
  config_change: Settings,
};

const actionColors: Record<string, string> = {
  query_run: 'bg-blue-100 text-blue-800',
  source_crawl: 'bg-green-100 text-green-800',
  result_saved: 'bg-purple-100 text-purple-800',
  result_used: 'bg-orange-100 text-orange-800',
  config_change: 'bg-gray-100 text-gray-800',
};

async function getHistory(filters: { action_type?: string; days?: string }) {
  const supabase = createAdminClient();
  
  let query = supabase
    .from('research_history')
    .select(`
      *,
      research_queries(name),
      research_sources(name, domain),
      research_results(title)
    `)
    .order('created_at', { ascending: false })
    .limit(100);

  if (filters.action_type && filters.action_type !== 'all') {
    query = query.eq('action_type', filters.action_type);
  }

  if (filters.days && filters.days !== 'all') {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(filters.days));
    query = query.gte('created_at', cutoffDate.toISOString());
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching history:', error);
    return [];
  }
  
  return data || [];
}

export default async function ResearchHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ action_type?: string; days?: string }>;
}) {
  const params = await searchParams;
  const history = await getHistory(params);

  const formatDuration = (ms: number | null) => {
    if (!ms) return '-';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getActionDescription = (entry: any) => {
    switch (entry.action_type) {
      case 'query_run':
        return `Research query "${entry.research_queries?.name || 'Unknown'}" executed`;
      case 'source_crawl':
        return `Source "${entry.research_sources?.name || 'Unknown'}" crawled`;
      case 'result_saved':
        return `Result saved: "${entry.research_results?.title || 'Unknown'}"`;
      case 'result_used':
        return `Result used for content generation`;
      case 'config_change':
        return `Configuration updated`;
      default:
        return entry.action_type.replace('_', ' ');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Research History</h1>
        <p className="mt-2 text-gray-600">
          Track all research activities and their outcomes
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="action_type" className="block text-sm font-medium mb-1">
                Action Type
              </label>
              <Select name="action_type" defaultValue={params.action_type || 'all'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="query_run">Query Runs</SelectItem>
                  <SelectItem value="source_crawl">Source Crawls</SelectItem>
                  <SelectItem value="result_saved">Results Saved</SelectItem>
                  <SelectItem value="result_used">Results Used</SelectItem>
                  <SelectItem value="config_change">Config Changes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="days" className="block text-sm font-medium mb-1">
                Time Period
              </label>
              <Select name="days" defaultValue={params.days || '7'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit">Apply Filters</Button>
          </form>
        </CardContent>
      </Card>

      {/* History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            {history.length} activities found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No history found for the selected filters</p>
              </div>
            ) : (
              history.map((entry: any) => {
                const Icon = actionIcons[entry.action_type] || Clock;
                const colorClass = actionColors[entry.action_type] || actionColors.config_change;
                
                return (
                  <div key={entry.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-full ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {getActionDescription(entry)}
                          </p>
                          
                          {entry.details && (
                            <div className="mt-1 text-sm text-gray-600">
                              {entry.details.results_count && (
                                <span className="mr-4">
                                  Results: {entry.details.results_count}
                                </span>
                              )}
                              {entry.details.sources_searched && (
                                <span className="mr-4">
                                  Sources: {entry.details.sources_searched}
                                </span>
                              )}
                              {entry.details.results_found !== undefined && (
                                <span>
                                  Found: {entry.details.results_found}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {entry.error_message && (
                            <p className="mt-1 text-sm text-red-600">
                              Error: {entry.error_message}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {entry.success ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          
                          {entry.duration_ms && (
                            <Badge variant="outline">
                              {formatDuration(entry.duration_ms)}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {new Date(entry.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}