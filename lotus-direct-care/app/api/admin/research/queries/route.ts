import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
    
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get('query_type');

    let query = supabase
      .from('research_queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (queryType) {
      query = query.eq('query_type', queryType);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ queries: data });
  } catch (error) {
    console.error('Error fetching queries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    
    const supabase = await createClient();

    const body = await request.json();
    const {
      name,
      description,
      query_text,
      query_type,
      categories,
      include_sources,
      exclude_sources,
      max_results,
      freshness_days,
      min_reliability_score,
      schedule_enabled,
      schedule_frequency,
    } = body;

    // Validate required fields
    if (!name || !query_text || !query_type) {
      return NextResponse.json(
        { error: 'Name, query text, and query type are required' },
        { status: 400 }
      );
    }

    // Calculate next run time if scheduling is enabled
    let next_run_at = null;
    if (schedule_enabled) {
      const now = new Date();
      switch (schedule_frequency) {
        case 'daily':
          next_run_at = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case 'weekly':
          next_run_at = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case 'monthly':
          next_run_at = new Date(now.setMonth(now.getMonth() + 1));
          break;
      }
    }

    const { data, error } = await supabase
      .from('research_queries')
      .insert({
        name,
        description,
        query_text,
        query_type,
        categories: categories || [],
        include_sources: include_sources || [],
        exclude_sources: exclude_sources || [],
        max_results: max_results || 10,
        freshness_days: freshness_days || 30,
        min_reliability_score: min_reliability_score || 0.5,
        schedule_enabled: schedule_enabled || false,
        schedule_frequency: schedule_frequency || 'weekly',
        next_run_at,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the action
    await supabase.from('research_history').insert({
      action_type: 'config_change',
      query_id: data.id,
      user_email: 'admin@lotusdirectcare.com',
      details: { action: 'query_created', query_name: name },
    });

    return NextResponse.json({ query: data });
  } catch (error) {
    console.error('Error creating query:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}