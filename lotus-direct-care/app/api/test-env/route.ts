import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAdminKey: !!process.env.ADMIN_API_KEY,
    keyLength: process.env.ADMIN_API_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}