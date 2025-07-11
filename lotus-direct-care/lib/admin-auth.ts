// Client-side cookie helper
function getCookieValue(name: string): string {
  if (typeof window === 'undefined') return '';
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || '';
  }
  return '';
}

// Client-side only function for getting admin headers
export function getAdminHeaders(): HeadersInit {
  const adminToken = getCookieValue('admin-token');

  return {
    'Content-Type': 'application/json',
    'x-admin-token': adminToken || '',
  };
}