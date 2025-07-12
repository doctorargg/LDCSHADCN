import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { researchService } from '@/lib/services/research-service';

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