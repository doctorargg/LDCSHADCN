import { NextResponse } from 'next/server';

export async function GET() {
  // Log everything to help debug
  const debug: {
    env: {
      NODE_ENV: string | undefined;
      hasSupabaseUrl: boolean;
      hasSupabaseAnon: boolean;
      hasServiceKey: boolean;
      serviceKeyLength: number;
      serviceKeyStart: string;
      serviceKeyEnd: string;
      serviceKeyFirstChar: string;
      expectedKeyStart: string;
    };
    test: string;
    fetchResult?: {
      status: number;
      statusText: string;
      headers: {
        'content-type': string | null;
        'x-request-id': string | null;
      };
      data?: any;
      error?: string;
    };
    error?: {
      message: string;
      cause?: any;
    };
  } = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseAnon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
      serviceKeyStart: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) || 'missing',
      serviceKeyEnd: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-10) || 'missing',
      serviceKeyFirstChar: process.env.SUPABASE_SERVICE_ROLE_KEY?.charAt(0) || 'missing',
      expectedKeyStart: 'eyJhbGciOiJ...',
    },
    test: 'none'
  };

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      debug.test = 'missing-env';
      return NextResponse.json(debug);
    }

    // Try a simple fetch to the Supabase API
    debug.test = 'fetch-attempt';
    
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/research_sources?select=id&limit=1`;
    const response = await fetch(url, {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    });

    debug.test = 'fetch-complete';
    debug.fetchResult = {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-type': response.headers.get('content-type'),
        'x-request-id': response.headers.get('x-request-id')
      }
    };

    if (response.status === 200) {
      const data = await response.json();
      debug.fetchResult.data = data;
      debug.test = 'success';
    } else {
      const text = await response.text();
      debug.fetchResult.error = text.substring(0, 200);
      debug.test = 'failed';
    }

  } catch (e: any) {
    debug.test = 'exception';
    debug.error = {
      message: e.message,
      cause: e.cause
    };
  }

  return NextResponse.json(debug, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache'
    }
  });
}