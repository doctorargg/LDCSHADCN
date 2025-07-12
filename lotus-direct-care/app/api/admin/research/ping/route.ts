import { NextResponse } from 'next/server';

// Simple ping endpoint - no auth required, just to verify the route exists
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    message: 'Research API is reachable'
  });
}