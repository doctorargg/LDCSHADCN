import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { researchService } from '@/lib/services/research-service';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action_type = searchParams.get('action_type');
    const days = searchParams.get('days');
    const limit = searchParams.get('limit');

    const history = await researchService.getHistory({
      action_type: action_type || undefined,
      days: days ? parseInt(days) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}