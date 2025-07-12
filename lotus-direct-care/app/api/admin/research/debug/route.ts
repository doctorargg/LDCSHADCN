import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
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
    
    // Test both clients
    const adminClient = createAdminClient();
    const serverClient = await createClient();
    
    // Test with admin client
    const { data: adminQueries, error: adminError } = await adminClient
      .from('research_queries')
      .select('id, name')
      .limit(5);
    
    // Test with server client
    const { data: serverQueries, error: serverError } = await serverClient
      .from('research_queries')
      .select('id, name')
      .limit(5);
    
    // Test specific query with admin client
    const queryId = request.nextUrl.searchParams.get('queryId');
    let specificQuery = null;
    let specificError = null;
    
    if (queryId) {
      const { data, error } = await adminClient
        .from('research_queries')
        .select('*')
        .eq('id', queryId)
        .single();
      
      specificQuery = data;
      specificError = error;
    }
    
    return NextResponse.json({
      debug: {
        adminClient: {
          success: !adminError,
          error: adminError?.message,
          queriesCount: adminQueries?.length || 0,
          queries: adminQueries
        },
        serverClient: {
          success: !serverError,
          error: serverError?.message,
          queriesCount: serverQueries?.length || 0,
          queries: serverQueries
        },
        specificQuery: queryId ? {
          queryId,
          found: !!specificQuery,
          error: specificError?.message,
          data: specificQuery
        } : null,
        environment: {
          hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      }
    });
  } catch (error: unknown) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Debug failed' },
      { status: 500 }
    );
  }
}