import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  const adminToken = request.headers.get('x-admin-token');
  const cookieToken = request.cookies.get('admin-token')?.value;
  
  return NextResponse.json({
    headers: {
      hasApiKey: !!apiKey,
      hasAdminToken: !!adminToken,
      apiKeyValue: apiKey ? `${apiKey.substring(0, 5)}...` : 'none',
      adminTokenValue: adminToken ? `${adminToken.substring(0, 5)}...` : 'none',
    },
    cookies: {
      hasCookieToken: !!cookieToken,
      cookieTokenValue: cookieToken ? `${cookieToken.substring(0, 5)}...` : 'none',
      allCookies: request.cookies.getAll().map(c => ({ name: c.name, valueStart: c.value.substring(0, 5) + '...' }))
    },
    env: {
      hasAdminKey: !!process.env.ADMIN_API_KEY,
      adminKeyValue: process.env.ADMIN_API_KEY ? `${process.env.ADMIN_API_KEY.substring(0, 5)}...` : 'none',
      adminKeyLength: process.env.ADMIN_API_KEY?.length || 0,
    },
    matches: {
      apiKeyMatch: apiKey === process.env.ADMIN_API_KEY,
      adminTokenMatch: adminToken === process.env.ADMIN_API_KEY,
      cookieTokenMatch: cookieToken === process.env.ADMIN_API_KEY,
    }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = body;
  
  const cookieToken = request.cookies.get('admin-token')?.value;
  
  return NextResponse.json({
    receivedToken: token ? `${token.substring(0, 5)}...` : 'none',
    cookieToken: cookieToken ? `${cookieToken.substring(0, 5)}...` : 'none',
    envToken: process.env.ADMIN_API_KEY ? `${process.env.ADMIN_API_KEY.substring(0, 5)}...` : 'none',
    tokenMatch: token === process.env.ADMIN_API_KEY,
    cookieMatch: cookieToken === process.env.ADMIN_API_KEY,
  });
}