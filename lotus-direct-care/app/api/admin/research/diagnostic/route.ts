import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface DiagnosticResult {
  tables: Record<string, {
    exists: boolean;
    count: number;
    error: string | null;
  }>;
  environment: Record<string, boolean>;
  errors: string[];
  rls_note?: string;
  write_permission?: {
    status: string;
    error: string | null;
  };
  status?: string;
  recommendation?: string;
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication using admin token
    const adminToken = request.headers.get('x-admin-token');
    const cookieToken = request.cookies.get('admin-token')?.value;
    const apiKey = request.headers.get('x-api-key');
    
    const isAuthorized = 
      adminToken === process.env.ADMIN_API_KEY || 
      cookieToken === process.env.ADMIN_API_KEY ||
      apiKey === process.env.ADMIN_API_KEY;
    
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const supabase = createAdminClient();
    const diagnostics: DiagnosticResult = {
      tables: {},
      environment: {},
      errors: []
    };

    // Check environment variables
    diagnostics.environment = {
      ADMIN_API_KEY: !!process.env.ADMIN_API_KEY,
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      FIRECRAWL_API_KEY: !!process.env.FIRECRAWL_API_KEY,
    };

    // Check if tables exist and count records
    const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          diagnostics.tables[table] = {
            exists: false,
            count: 0,
            error: error.message
          };
          diagnostics.errors.push(`${table}: ${error.message}`);
        } else {
          diagnostics.tables[table] = {
            exists: true,
            count: count || 0,
            error: null
          };
        }
      } catch (e: unknown) {
        diagnostics.tables[table] = {
          exists: false,
          count: 0,
          error: e instanceof Error ? e.message : 'Unknown error'
        };
        diagnostics.errors.push(`${table}: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    }

    // Check RLS policies
    try {
      await supabase
        .rpc('get_policies', { schema_name: 'public' });
      
      diagnostics.rls_note = 'Check Supabase dashboard for RLS policy status';
    } catch (e: unknown) {
      // RPC might not exist, that's okay
      diagnostics.rls_note = 'Check Supabase dashboard for RLS policy status';
    }

    // Check if we can insert a test record (to test write permissions)
    try {
      const testSourceName = `Test Source ${Date.now()}`;
      const { error: insertError } = await supabase
        .from('research_sources')
        .insert({
          name: testSourceName,
          url: 'https://test.example.com',
          domain: 'test.example.com',
          source_type: 'website',
          categories: ['test'],
          reliability_score: 0.5
        });
      
      if (insertError) {
        diagnostics.write_permission = {
          status: 'failed',
          error: insertError.message
        };
      } else {
        // Clean up test record
        await supabase
          .from('research_sources')
          .delete()
          .eq('name', testSourceName);
        
        diagnostics.write_permission = {
          status: 'success',
          error: null
        };
      }
    } catch (e: unknown) {
      diagnostics.write_permission = {
        status: 'failed',
        error: e instanceof Error ? e.message : 'Unknown error'
      };
    }

    // Overall status
    diagnostics.status = diagnostics.errors.length === 0 ? 'healthy' : 'unhealthy';
    diagnostics.recommendation = diagnostics.errors.length > 0 
      ? 'Run database migrations: supabase migration up' 
      : 'System appears healthy';

    return NextResponse.json(diagnostics);
  } catch (error: unknown) {
    console.error('Diagnostic error:', error);
    return NextResponse.json(
      { 
        error: 'Diagnostic check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}