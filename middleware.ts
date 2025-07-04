import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';
  const url = req.nextUrl.clone();
  // const token = req.cookies.get('token')?.value

  if (url.pathname.startsWith('/assets')) {
    return NextResponse.next();
  }

  // const { pathname } = req.nextUrl

  const currentHost = hostname.split('.')[0];

  if (currentHost === 'staff') {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // if (pathname === '/') {
  //   if (token) {
  //     const url = req.nextUrl.clone()
  //     url.pathname = '/user'
  //     return NextResponse.redirect(url)
  //   }
  // } else if (pathname.startsWith('/user') && !token) {
  //   const url = req.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url)
  // }


  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
