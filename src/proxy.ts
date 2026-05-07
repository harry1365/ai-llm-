import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const authSession = request.cookies.get('auth_session');
  const role = authSession?.value;
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Dashboard
  if (pathname.startsWith('/dashboard/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Protect User Dashboard
  if (pathname.startsWith('/dashboard/user')) {
    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Redirect logged-in users away from login page
  if (pathname === '/login' && role) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/user', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

