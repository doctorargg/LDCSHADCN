import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    headers: {
      'x-admin-token': request.headers.has('x-admin-token'),
      'x-api-key': request.headers.has('x-api-key')
    }
  });
}