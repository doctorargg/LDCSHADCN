import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabase
      .from('research_sources')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the action
    await supabase.from('research_history').insert({
      action_type: 'config_change',
      source_id: id,
      user_email: user.email,
      details: { action: 'source_updated', changes: Object.keys(body) },
    });

    return NextResponse.json({ source: data });
  } catch (error: unknown) {
    console.error('Error updating source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get source info before deletion
    const { data: source } = await supabase
      .from('research_sources')
      .select('name')
      .eq('id', id)
      .single();

    const { error } = await supabase
      .from('research_sources')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the action
    await supabase.from('research_history').insert({
      action_type: 'config_change',
      user_email: user.email,
      details: { 
        action: 'source_deleted', 
        source_name: source?.name,
        source_id: id 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting source:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}