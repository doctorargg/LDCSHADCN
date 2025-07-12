import { NextResponse } from 'next/server';

// Check which environment variables are available
export async function GET() {
  const envCheck = {
    environment: process.env.NODE_ENV || 'unknown',
    vercel: process.env.VERCEL || 'not-on-vercel',
    timestamp: new Date().toISOString(),
    
    // Check which env vars are defined (not showing values for security)
    envVars: {
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      
      // Admin
      ADMIN_API_KEY: !!process.env.ADMIN_API_KEY,
      
      // AI Services
      GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      FIRECRAWL_API_KEY: !!process.env.FIRECRAWL_API_KEY,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      
      // Email
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
      NOTIFICATION_EMAIL: !!process.env.NOTIFICATION_EMAIL,
    },
    
    // Show key lengths to help debug without exposing values
    keyLengths: {
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
      ADMIN_API_KEY: process.env.ADMIN_API_KEY?.length || 0,
    },
    
    // Runtime info
    runtime: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    }
  };
  
  return NextResponse.json(envCheck, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache'
    }
  });
}