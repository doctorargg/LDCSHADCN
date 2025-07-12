import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { researchService } from '@/lib/services/research-service';

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

    const { queryId } = await request.json();

    if (!queryId) {
      return NextResponse.json(
        { error: 'Query ID is required' },
        { status: 400 }
      );
    }

    // Execute the research query
    const results = await researchService.executeResearch(queryId);

    return NextResponse.json({ 
      success: true,
      results,
      count: results.length 
    });
  } catch (error) {
    console.error('Error executing research query:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to execute research query' },
      { status: 500 }
    );
  }
}