import { NextResponse } from 'next/server';

export async function GET() {
  const debug: any = {
    timestamp: new Date().toISOString(),
    runtime: 'unknown',
    environment: 'unknown',
    supabaseTest: 'not-started'
  };

  try {
    // Detect runtime environment
    if (process.env.VERCEL) {
      debug.runtime = 'vercel';
      debug.environment = process.env.VERCEL_ENV || 'unknown';
      debug.region = process.env.VERCEL_REGION || 'unknown';
    } else {
      debug.runtime = 'local';
      debug.environment = process.env.NODE_ENV || 'development';
    }

    // Check critical env vars
    debug.envStatus = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseService: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      adminKey: !!process.env.ADMIN_API_KEY,
    };

    // Key info (safe partial display)
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      debug.serviceKeyInfo = {
        length: key.length,
        starts: key.substring(0, 10) + '...',
        ends: '...' + key.substring(key.length - 10),
        looksLikeJWT: key.split('.').length === 3
      };
    }

    // Test Supabase if possible
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      debug.supabaseTest = 'starting';
      
      try {
        // Dynamic import to avoid build issues
        const { createClient } = await import('@supabase/supabase-js');
        
        debug.supabaseTest = 'client-creating';
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        
        debug.supabaseTest = 'querying';
        const { data, error } = await supabase
          .from('research_sources')
          .select('id')
          .limit(1);
        
        if (error) {
          debug.supabaseTest = 'error';
          debug.supabaseError = {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          };
        } else {
          debug.supabaseTest = 'success';
          debug.queryResult = {
            hasData: !!data,
            rowCount: data?.length || 0
          };
        }
      } catch (e: any) {
        debug.supabaseTest = 'exception';
        debug.exception = {
          message: e.message,
          name: e.name,
          // Include first line of stack in production for debugging
          firstStackLine: e.stack?.split('\n')[1]?.trim()
        };
      }
    } else {
      debug.supabaseTest = 'missing-config';
    }

    // Headers info
    debug.headers = {
      host: process.env.VERCEL_URL || 'unknown',
      nodeVersion: process.version
    };

  } catch (error: any) {
    debug.criticalError = {
      message: error.message,
      name: error.name
    };
  }

  return NextResponse.json(debug, {
    headers: {
      'Cache-Control': 'no-store',
      'X-Debug-Time': new Date().toISOString()
    }
  });
}