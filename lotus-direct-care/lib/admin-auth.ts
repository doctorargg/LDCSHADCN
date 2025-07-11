import { cookies } from 'next/headers';

export function getAdminToken(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get('admin-token')?.value;
}

export function getAdminHeaders(): HeadersInit {
  const adminToken = typeof window !== 'undefined' 
    ? getCookieValue('admin-token')
    : '';

  return {
    'Content-Type': 'application/json',
    'x-admin-token': adminToken || '',
  };
}

// Client-side cookie helper
function getCookieValue(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || '';
  }
  return '';
}