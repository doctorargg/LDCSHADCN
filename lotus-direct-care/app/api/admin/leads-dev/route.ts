import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Development endpoint - DO NOT USE IN PRODUCTION
export async function GET() {
  try {
    // Check if we have the necessary environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { message: 'Supabase not configured' },
        { status: 503 }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Try to fetch from form_submissions table (which should exist based on migrations)
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { 
          message: 'Failed to fetch leads',
          error: error.message,
          hint: 'Make sure you have run: supabase migration up'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data || [],
      pagination: {
        total: data?.length || 0,
        limit: 50,
        offset: 0,
        hasMore: false
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}