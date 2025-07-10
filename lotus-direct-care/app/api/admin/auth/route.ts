import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    // Debug logging
    console.log('Auth attempt:', {
      receivedKey: apiKey ? `${apiKey.substring(0, 5)}...` : 'none',
      envKeyExists: !!process.env.ADMIN_API_KEY,
      envKeyLength: process.env.ADMIN_API_KEY?.length || 0,
      envKeyStart: process.env.ADMIN_API_KEY ? `${process.env.ADMIN_API_KEY.substring(0, 5)}...` : 'none'
    });

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    // Verify the API key
    if (apiKey !== process.env.ADMIN_API_KEY) {
      console.log('Key mismatch:', {
        match: apiKey === process.env.ADMIN_API_KEY,
        receivedLength: apiKey.length,
        expectedLength: process.env.ADMIN_API_KEY?.length || 0
      });
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Set the admin token cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-token', apiKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Clear the admin token cookie
    const cookieStore = await cookies();
    cookieStore.delete('admin-token');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}