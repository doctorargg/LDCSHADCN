import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('is_active');
    const sourceType = searchParams.get('source_type');

    let query = supabase
      .from('research_sources')
      .select('*')
      .order('reliability_score', { ascending: false });

    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true');
    }

    if (sourceType) {
      query = query.eq('source_type', sourceType);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ sources: data });
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      url,
      domain,
      source_type,
      categories,
      crawl_frequency,
      is_active,
      max_depth,
      include_patterns,
      exclude_patterns,
      reliability_score,
      notes,
    } = body;

    // Validate required fields
    if (!name || !url || !source_type) {
      return NextResponse.json(
        { error: 'Name, URL, and source type are required' },
        { status: 400 }
      );
    }

    // Extract domain from URL if not provided
    const extractedDomain = domain || new URL(url).hostname;

    const { data, error } = await supabase
      .from('research_sources')
      .insert({
        name,
        url,
        domain: extractedDomain,
        source_type,
        categories: categories || [],
        crawl_frequency: crawl_frequency || 'weekly',
        is_active: is_active !== false,
        max_depth: max_depth || 2,
        include_patterns: include_patterns || [],
        exclude_patterns: exclude_patterns || [],
        reliability_score: reliability_score || 0.5,
        notes,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the action
    await supabase.from('research_history').insert({
      action_type: 'config_change',
      source_id: data.id,
      user_email: user.email,
      details: { action: 'source_created', source_name: name },
    });

    return NextResponse.json({ source: data });
  } catch (error) {
    console.error('Error creating source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}