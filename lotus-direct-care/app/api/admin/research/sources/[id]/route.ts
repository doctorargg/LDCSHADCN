import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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
      user_email: 'admin@lotusdirectcare.com',
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
      user_email: 'admin@lotusdirectcare.com',
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