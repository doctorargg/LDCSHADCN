import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Globe, CheckCircle, XCircle, Clock } from 'lucide-react';
import SourceActions from './source-actions';

export const dynamic = 'force-dynamic';

async function getResearchSources() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('research_sources')
    .select('*')
    .order('reliability_score', { ascending: false });
  
  if (error) {
    console.error('Error fetching research sources:', error);
    return [];
  }
  
  return data || [];
}

const sourceTypeColors: Record<string, string> = {
  website: 'bg-blue-100 text-blue-800',
  blog: 'bg-green-100 text-green-800',
  journal: 'bg-purple-100 text-purple-800',
  news: 'bg-orange-100 text-orange-800',
  social: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800',
};

export default async function ResearchSourcesPage() {
  const sources = await getResearchSources();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Sources</h1>
          <p className="mt-2 text-gray-600">
            Manage trusted sources for medical and health research
          </p>
        </div>
        <Link href="/admin/ai/research/sources/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Source
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sources.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sources.filter((s: any) => s.is_active).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">High Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sources.filter((s: any) => s.reliability_score >= 0.8).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Sources</CardTitle>
          <CardDescription>
            These sources are used for automated research and content discovery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Reliability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Crawled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No research sources configured
                  </TableCell>
                </TableRow>
              ) : (
                sources.map((source: any) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <div>
                          <p>{source.name}</p>
                          <p className="text-xs text-gray-500">{source.domain}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={sourceTypeColors[source.source_type] || sourceTypeColors.other}
                      >
                        {source.source_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {source.categories?.slice(0, 2).map((cat: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                        {source.categories?.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{source.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${source.reliability_score * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">
                          {Math.round(source.reliability_score * 100)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {source.is_active ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-600 border-gray-600">
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {source.last_crawled_at ? (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          {new Date(source.last_crawled_at).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Never</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <SourceActions source={source} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}