import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Check authentication using admin token
  const adminToken = request.headers.get('x-admin-token');
  const cookieToken = request.cookies.get('admin-token')?.value;
  const apiKey = request.headers.get('x-api-key');
  
  const expectedKey = process.env.ADMIN_API_KEY;
  const hasExpectedKey = !!expectedKey;
  
  const isAuthorized = 
    adminToken === expectedKey || 
    cookieToken === expectedKey ||
    apiKey === expectedKey;
  
  return NextResponse.json({
    auth_check: {
      provided_token: !!adminToken || !!cookieToken || !!apiKey,
      expected_key_exists: hasExpectedKey,
      is_authorized: isAuthorized,
      auth_method: adminToken ? 'header' : cookieToken ? 'cookie' : apiKey ? 'api-key' : 'none'
    },
    env_check: {
      ADMIN_API_KEY: hasExpectedKey,
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL
    }
  });
}