// middleware.ts   (proxy.ts on Next.js 16, same code)
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const roleRoutes: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/dashboard': ['ADMIN', 'USER'],
  '/profile': ['ADMIN', 'USER'],
};

export async function proxy(req: NextRequest) {

    console.log('proxy here ==========')
  const { pathname } = req.nextUrl;
  const rule = Object.keys(roleRoutes).find((p) => pathname.startsWith(p));
  if (!rule) return NextResponse.next();

  const token = req.cookies.get('access_token')?.value;
  let role: string | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      role = payload.role as string; // your payload is { id, role }
    } catch {
      role = null; // invalid or expired
    }
  }

  if (!role) {
    const url = new URL('/login', req.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  if (!roleRoutes[rule].includes(role)) {
    return NextResponse.redirect(new URL('/forbidden', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*'] };