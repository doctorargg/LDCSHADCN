import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { researchService } from '@/lib/services/research-service';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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