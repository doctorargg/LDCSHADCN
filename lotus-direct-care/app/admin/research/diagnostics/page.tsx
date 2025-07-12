'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface DiagnosticsData {
  environment: {
    supabaseUrl: boolean;
    supabaseAnonKey: boolean;
    supabaseServiceKey: boolean;
    adminApiKey: boolean;
    geminiApiKey: boolean;
    firecrawlApiKey: boolean;
  };
  database: {
    migrationsRun: boolean;
    tables: Record<string, boolean>;
    error: string | null;
  };
  permissions: {
    canWrite: boolean;
    error: string | null;
  };
  error?: string;
}

export default function ResearchDiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiagnostics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = '/api/admin/research/diagnostics';
      console.log('Fetching diagnostics from:', url);
      
      const response = await fetch(url);
      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        // Try to get error details
        let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
        try {
          if (contentType?.includes('application/json')) {
            const errorData = await response.json();
            errorMsg = errorData.error || errorData.message || errorMsg;
          } else {
            // Might be getting HTML error page
            const text = await response.text();
            if (text.includes('<!DOCTYPE') || text.includes('<html')) {
              errorMsg = `Got HTML response instead of JSON (${response.status}). API route may not be deployed.`;
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
        throw new Error(errorMsg);
      }
      
      if (!contentType?.includes('application/json')) {
        throw new Error('Response is not JSON. Got: ' + contentType);
      }
      
      const data = await response.json();
      console.log('Diagnostics data:', data);
      setDiagnostics(data);
    } catch (err) {
      console.error('Diagnostics error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch diagnostics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research System Diagnostics</h1>
          <p className="mt-2 text-gray-600">Check the health of your research infrastructure</p>
        </div>
        <p>Loading diagnostics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research System Diagnostics</h1>
          <p className="mt-2 text-gray-600">Check the health of your research infrastructure</p>
        </div>
        <Alert className="mb-4">
          <AlertDescription className="text-red-600">
            Error: {error}
          </AlertDescription>
        </Alert>
        <Button onClick={fetchDiagnostics}>Retry</Button>
      </div>
    );
  }

  if (!diagnostics) {
    return null;
  }

  const allEnvironmentVarsSet = Object.values(diagnostics.environment).every(v => v);
  const hasIssues = !diagnostics.database.migrationsRun || !diagnostics.permissions.canWrite;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Research System Diagnostics</h1>
        <p className="mt-2 text-gray-600">
          Check the health of your research infrastructure
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Environment Variables */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>ADMIN_API_KEY</span>
              <StatusIndicator status={diagnostics.environment.adminApiKey} />
            </div>
            <div className="flex items-center justify-between">
              <span>SUPABASE_URL</span>
              <StatusIndicator status={diagnostics.environment.supabaseUrl} />
            </div>
            <div className="flex items-center justify-between">
              <span>SUPABASE_ANON_KEY</span>
              <StatusIndicator status={diagnostics.environment.supabaseAnonKey} />
            </div>
            <div className="flex items-center justify-between">
              <span>SUPABASE_SERVICE_ROLE_KEY</span>
              <StatusIndicator status={diagnostics.environment.supabaseServiceKey} />
            </div>
            <div className="flex items-center justify-between">
              <span>GEMINI_API_KEY</span>
              <StatusIndicator status={diagnostics.environment.geminiApiKey} />
            </div>
            <div className="flex items-center justify-between">
              <span>FIRECRAWL_API_KEY</span>
              <StatusIndicator status={diagnostics.environment.firecrawlApiKey} />
            </div>
          </div>
        </Card>

        {/* Database Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Database Tables</h2>
          <div className="space-y-2">
            {Object.keys(diagnostics.database.tables || {}).length === 0 ? (
              <p className="text-gray-500">Checking tables...</p>
            ) : (
              Object.entries(diagnostics.database.tables).map(([table, exists]) => (
                <div key={table} className="flex items-center justify-between">
                  <span>{table}</span>
                  <StatusIndicator status={exists} />
                </div>
              ))
            )}
            {diagnostics.database.error && (
              <Alert className="mt-4">
                <AlertDescription className="text-sm">
                  {diagnostics.database.error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>

        {/* Permissions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Permissions</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Write Permissions</span>
              <StatusIndicator status={diagnostics.permissions.canWrite} />
            </div>
            {diagnostics.permissions.error && (
              <Alert className="mt-2">
                <AlertDescription className="text-sm">
                  {diagnostics.permissions.error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>

        {/* Issues Summary */}
        {hasIssues && (
          <Card className="p-6 border-yellow-500 bg-yellow-50">
            <h2 className="text-xl font-semibold mb-4">Issues Detected</h2>
            <ul className="list-disc list-inside space-y-2">
              {!diagnostics.database.migrationsRun && (
                <li>
                  <strong>Run database migrations:</strong> supabase migration up
                </li>
              )}
              {!diagnostics.permissions.canWrite && (
                <li>
                  <strong>Write Permissions:</strong> {diagnostics.permissions.error || 'Check service role key configuration'}
                </li>
              )}
            </ul>
          </Card>
        )}

        {/* Errors Section */}
        {(diagnostics.database.error || diagnostics.permissions.error) && (
          <Card className="p-6 border-red-500 bg-red-50">
            <h2 className="text-xl font-semibold mb-4">Errors</h2>
            <div className="space-y-2">
              {Object.entries(diagnostics.database.tables || {}).map(([table, exists]) => 
                !exists && (
                  <div key={table} className="text-sm text-red-700">
                    <strong>{table}:</strong> Table not found or inaccessible
                  </div>
                )
              )}
              {diagnostics.database.error && (
                <div className="text-sm text-red-700 mt-2">
                  <strong>Database:</strong> {diagnostics.database.error}
                </div>
              )}
              {diagnostics.permissions.error && (
                <div className="text-sm text-red-700 mt-2">
                  <strong>Permissions:</strong> {diagnostics.permissions.error}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Success Message */}
        {!hasIssues && allEnvironmentVarsSet && (
          <Alert className="bg-green-50 border-green-500">
            <AlertDescription className="text-green-700">
              All systems operational! Research system is ready to use.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2 mt-4">
          <Button onClick={fetchDiagnostics}>
            Refresh Diagnostics
          </Button>
        </div>
        
        {/* Debug Links */}
        <Card className="p-6 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Debug Tools</h2>
          <div className="space-y-2 text-sm">
            <p>If diagnostics are failing, try these debug endpoints:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <a href="/api/admin/research/ping" target="_blank" className="text-blue-600 hover:underline">
                  /api/admin/research/ping
                </a> - Basic connectivity test
              </li>
              <li>
                <a href="/api/admin/research/env-check" target="_blank" className="text-blue-600 hover:underline">
                  /api/admin/research/env-check
                </a> - Environment variables check
              </li>
              <li>
                <a href="/api/admin/research/vercel-debug" target="_blank" className="text-blue-600 hover:underline">
                  /api/admin/research/vercel-debug
                </a> - Detailed debug info
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
      status ? 'bg-green-500' : 'bg-red-500'
    }`}>
      {status ? (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </span>
  );
}