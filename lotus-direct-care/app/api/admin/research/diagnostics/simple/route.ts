import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const result: any = {
    step: 'start',
    env: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  };

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      result.step = 'missing-env';
      return NextResponse.json(result);
    }

    result.step = 'creating-client';
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    result.step = 'testing-query';
    
    const { data, error } = await supabase
      .from('research_sources')
      .select('id')
      .limit(1);

    result.step = 'query-complete';
    result.queryResult = {
      hasData: !!data,
      dataLength: data?.length || 0,
      error: error?.message || null,
      errorCode: error?.code || null
    };

    return NextResponse.json(result);
  } catch (e: any) {
    result.step = 'exception';
    result.exception = {
      message: e.message,
      stack: e.stack?.split('\n').slice(0, 3)
    };
    return NextResponse.json(result);
  }
}