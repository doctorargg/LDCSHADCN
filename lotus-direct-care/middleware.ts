import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page and API routes
    if (request.nextUrl.pathname === '/admin/login' || 
        request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Check for admin authentication
    const adminToken = request.cookies.get('admin-token');
    
    // In middleware, we just check if the token exists
    // The actual validation happens in the API routes
    if (!adminToken || !adminToken.value) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};