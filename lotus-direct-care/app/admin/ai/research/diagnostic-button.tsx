'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { getAdminHeaders } from '@/lib/admin-auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DiagnosticButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const runDiagnostics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/research/diagnostic', {
        headers: getAdminHeaders(),
      });
      
      const data = await response.json();
      setDiagnostics(data);
    } catch (error) {
      console.error('Diagnostic check failed:', error);
      setDiagnostics({
        status: 'error',
        error: 'Failed to run diagnostics'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setIsOpen(true);
            if (!diagnostics) runDiagnostics();
          }}
        >
          <Activity className="w-4 h-4 mr-2" />
          System Check
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Research System Diagnostics</DialogTitle>
          <DialogDescription>
            Check the health of your research infrastructure
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 animate-pulse mx-auto mb-2" />
            <p>Running diagnostics...</p>
          </div>
        )}

        {diagnostics && !isLoading && (
          <div className="space-y-4">
            {/* Overall Status */}
            <Card className={diagnostics.status === 'healthy' ? 'border-green-200' : 'border-red-200'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {diagnostics.status === 'healthy' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      System Healthy
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Issues Detected
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{diagnostics.recommendation}</p>
              </CardContent>
            </Card>

            {/* Environment Variables */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(diagnostics.environment || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-mono text-xs">{key}:</span>
                      <span className={value ? 'text-green-600' : 'text-red-600'}>
                        {value ? '✓ Set' : '✗ Missing'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Database Tables */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Database Tables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(diagnostics.tables || {}).map(([table, info]: [string, any]) => (
                    <div key={table} className="flex items-center justify-between text-sm">
                      <span className="font-mono">{table}</span>
                      <div className="flex items-center gap-2">
                        {info.exists ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">{info.count} records</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-red-600 text-xs">{info.error}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Write Permissions */}
            {diagnostics.write_permission && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Write Permissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {diagnostics.write_permission.status === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Can write to database</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">
                          {diagnostics.write_permission.error}
                        </span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Errors */}
            {diagnostics.errors && diagnostics.errors.length > 0 && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-sm text-red-700">Errors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {diagnostics.errors.map((error: string, i: number) => (
                      <li key={i} className="text-sm text-red-600">{error}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Refresh Button */}
            <Button onClick={runDiagnostics} disabled={isLoading} className="w-full">
              Refresh Diagnostics
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}