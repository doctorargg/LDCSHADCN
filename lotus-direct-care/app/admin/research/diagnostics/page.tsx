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
  };
  database: {
    migrationsRun: boolean;
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
      const response = await fetch('/api/admin/research/diagnostics');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDiagnostics(data);
    } catch (err) {
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
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Research System Diagnostics</h1>
        <p>Loading diagnostics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Research System Diagnostics</h1>
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Research System Diagnostics</h1>
      
      <div className="space-y-6">
        {/* Environment Variables */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>NEXT_PUBLIC_SUPABASE_URL</span>
              <StatusIndicator status={diagnostics.environment.supabaseUrl} />
            </div>
            <div className="flex items-center justify-between">
              <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              <StatusIndicator status={diagnostics.environment.supabaseAnonKey} />
            </div>
            <div className="flex items-center justify-between">
              <span>SUPABASE_SERVICE_ROLE_KEY</span>
              <StatusIndicator status={diagnostics.environment.supabaseServiceKey} />
            </div>
          </div>
        </Card>

        {/* Database Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Database Status</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Migrations Run</span>
              <StatusIndicator status={diagnostics.database.migrationsRun} />
            </div>
            {diagnostics.database.error && (
              <Alert className="mt-2">
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

        {/* Success Message */}
        {!hasIssues && allEnvironmentVarsSet && (
          <Alert className="bg-green-50 border-green-500">
            <AlertDescription className="text-green-700">
              All systems operational! Research system is ready to use.
            </AlertDescription>
          </Alert>
        )}

        <Button onClick={fetchDiagnostics} className="mt-4">
          Refresh Diagnostics
        </Button>
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