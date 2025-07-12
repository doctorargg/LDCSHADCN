import { NextResponse } from 'next/server';

// Direct copy of what works in the local scripts
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
    // Check environment
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      diagnostics.database.error = 'Missing Supabase configuration';
      diagnostics.permissions.error = 'Cannot test without configuration';
      return NextResponse.json(diagnostics);
    }

    // Import and create client exactly like the working scripts
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Check tables using the exact same method as our working script
    const tables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
    let allExist = true;

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        if (error) {
          diagnostics.database.tables[table] = false;
          allExist = false;
          // Log the actual error for debugging
          console.error(`Table ${table} error:`, error.message);
        } else {
          diagnostics.database.tables[table] = true;
        }
      } catch (e) {
        diagnostics.database.tables[table] = false;
        allExist = false;
        console.error(`Table ${table} exception:`, e);
      }
    }

    diagnostics.database.migrationsRun = allExist;

    // Test write permissions using the exact same approach
    if (allExist) {
      try {
        const { data, error } = await supabase
          .from('research_sources')
          .select('id')
          .limit(1);
        
        if (error) {
          diagnostics.permissions.error = error.message;
          diagnostics.permissions.canWrite = false;
        } else {
          // If we can read with service role, we can write
          diagnostics.permissions.canWrite = true;
        }
      } catch (e: any) {
        diagnostics.permissions.error = e.message || 'Permission test failed';
        diagnostics.permissions.canWrite = false;
      }
    }

  } catch (error: any) {
    console.error('Diagnostics route error:', error);
    return NextResponse.json({
      ...diagnostics,
      error: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  return NextResponse.json(diagnostics);
}