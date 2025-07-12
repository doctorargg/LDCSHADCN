import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
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

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        db: {
          schema: 'public'
        },
        global: {
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
          }
        }
      }
    );

    // Check research tables
    const researchTables = ['research_sources', 'research_queries', 'research_results', 'research_history'];
    let allTablesExist = true;
    
    for (const table of researchTables) {
      try {
        const { error } = await supabaseAdmin
          .from(table)
          .select('id')
          .limit(1);
        
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

    // Test write permissions
    if (allTablesExist) {
      try {
        // First try a simple select to verify the service key works
        const { error: selectError } = await supabaseAdmin
          .from('research_sources')
          .select('id')
          .limit(1);
        
        if (selectError) {
          console.error('Select error:', selectError);
          if (selectError.message.toLowerCase().includes('invalid api key') || 
              selectError.message.toLowerCase().includes('jwt')) {
            diagnostics.permissions.error = 'Invalid API key';
          } else {
            diagnostics.permissions.error = `Read error: ${selectError.message}`;
          }
          diagnostics.permissions.canWrite = false;
        } else {
          // Service key is valid, now test if we can write
          // Use research_sources for write test since we know its schema
          const testData = {
            name: 'Diagnostic Test Source',
            url: 'https://test.diagnostic.local',
            description: 'Temporary test source for diagnostics',
            source_type: 'website',
            is_active: false,
            metadata: {}
          };
          
          const { data: writeTest, error: writeError } = await supabaseAdmin
            .from('research_sources')
            .insert(testData)
            .select()
            .single();
          
          if (writeError) {
            diagnostics.permissions.error = `Write error: ${writeError.message}`;
            diagnostics.permissions.canWrite = false;
          } else {
            // Clean up test data
            await supabaseAdmin
              .from('research_sources')
              .delete()
              .eq('id', writeTest.id);
            diagnostics.permissions.canWrite = true;
          }
        }
      } catch (error) {
        diagnostics.permissions.error = 'Failed to test permissions';
        diagnostics.permissions.canWrite = false;
      }
    } else {
      diagnostics.permissions.error = 'Cannot test permissions - tables do not exist';
    }

  } catch (error) {
    console.error('Diagnostics error:', error);
    return NextResponse.json({
      ...diagnostics,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }

  return NextResponse.json(diagnostics);
}