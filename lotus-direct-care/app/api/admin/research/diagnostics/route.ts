import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const diagnostics = {
    environment: {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      adminApiKey: !!process.env.ADMIN_API_KEY,
      geminiApiKey: !!process.env.GEMINI_API_KEY,
      firecrawlApiKey: !!process.env.FIRECRAWL_API_KEY,
    },
    database: {
      migrationsRun: false,
      tables: {} as Record<string, boolean>,
      error: null as string | null,
    },
    permissions: {
      canWrite: false,
      error: null as string | null,
    },
  };

  try {
    // Check if all required environment variables exist
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      diagnostics.database.error = 'Missing required Supabase environment variables';
      diagnostics.permissions.error = 'Cannot test without Supabase configuration';
      return NextResponse.json(diagnostics);
    }

    // Check if service role key exists
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      diagnostics.permissions.error = 'SUPABASE_SERVICE_ROLE_KEY not configured';
      return NextResponse.json(diagnostics);
    }

    // Create admin client with service role key - simplified initialization
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Check research tables
    const researchTables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
    let allTablesExist = true;
    
    for (const table of researchTables) {
      try {
        const { count, error } = await supabaseAdmin
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          diagnostics.database.tables[table] = false;
          allTablesExist = false;
          if (error.message.includes('does not exist')) {
            diagnostics.database.error = 'Research tables not found. Run: supabase migration up';
          }
        } else {
          diagnostics.database.tables[table] = true;
        }
      } catch (error) {
        diagnostics.database.tables[table] = false;
        allTablesExist = false;
      }
    }
    
    diagnostics.database.migrationsRun = allTablesExist;

    // Test write permissions only if tables exist
    if (allTablesExist) {
      try {
        // Use a simple insert/delete test
        const testId = `test-${Date.now()}`;
        const { error: insertError } = await supabaseAdmin
          .from('research_sources')
          .insert({
            id: testId,
            name: 'Diagnostic Test',
            url: 'https://test.local',
            source_type: 'website',
            is_active: false
          });
        
        if (insertError) {
          diagnostics.permissions.error = insertError.message;
          diagnostics.permissions.canWrite = false;
        } else {
          // Clean up test data
          await supabaseAdmin
            .from('research_sources')
            .delete()
            .eq('id', testId);
          diagnostics.permissions.canWrite = true;
        }
      } catch (error: any) {
        diagnostics.permissions.error = error.message || 'Failed to test write permissions';
        diagnostics.permissions.canWrite = false;
      }
    } else {
      diagnostics.permissions.error = 'Cannot test permissions - tables do not exist';
    }

  } catch (error: any) {
    console.error('Diagnostics error:', error);
    return NextResponse.json({
      ...diagnostics,
      error: error.message || 'Unknown error',
    }, { status: 500 });
  }

  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache'
    }
  });
}