import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  // Redirect if user is not authorized for the admin routes
  if (
    req.nextUrl.pathname.startsWith('/admin') &&
    token?.role !== 'Administrator'
  ) {
    return NextResponse.rewrite(
      new URL('/auth/login?message=You Are Not Authorized!', req.url)
    );
  }

  if (
    req.nextUrl.pathname.startsWith('/customer') &&
    token?.role !== 'Customer'
  ) {
    return NextResponse.rewrite(
      new URL('/auth/login?message=You Are Not Authorized!', req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/customer/:path*'] // Define the routes that should be protected
};
