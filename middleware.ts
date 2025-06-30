import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/assets')) {
    return NextResponse.next();
  }

  const currentHost = hostname.split('.')[0];

  if (currentHost === 'staff') {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // if (currentHost !== 'www' && currentHost !== 'example') {
  //   url.pathname = `/user/${currentHost}${url.pathname}`;
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
