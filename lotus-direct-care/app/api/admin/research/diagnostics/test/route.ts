import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const diagnostics = {
    environment: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      keyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0
    },
    tests: [] as any[]
  };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Missing environment variables', diagnostics });
  }

  // Test 1: Basic client
  try {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await client
      .from('research_sources')
      .select('id')
      .limit(1);
    
    diagnostics.tests.push({
      test: 'Basic client',
      success: !error,
      error: error?.message || null,
      data: data
    });
  } catch (e: any) {
    diagnostics.tests.push({
      test: 'Basic client',
      success: false,
      error: e.message
    });
  }

  // Test 2: Client with options (same as main diagnostic route)
  try {
    const client = createClient(
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
    
    const { data, error } = await client
      .from('research_sources')
      .select('id')
      .limit(1);
    
    diagnostics.tests.push({
      test: 'Client with options',
      success: !error,
      error: error?.message || null,
      data: data
    });
  } catch (e: any) {
    diagnostics.tests.push({
      test: 'Client with options',
      success: false,
      error: e.message
    });
  }

  return NextResponse.json(diagnostics);
}