import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/perfil/:path*',
    '/inicio',
    '/nfe/:path*',
    '/nfce/:path*',
    '/cte/:path*',
    '/mdfe/:path*',
  ],
};
