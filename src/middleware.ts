import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const BLOCKED_COUNTRY = 'CN';

export const config = {
  matcher: ['/', '/mdbl'],
};

export function middleware(req: NextRequest) {
  console.log('req.geo: ', req.geo);
  const country = req.geo?.country || 'US';

  console.log('country: ', country);
  console.log('req.nextUrl: ', req.nextUrl);

  if (country === BLOCKED_COUNTRY) {
    req.nextUrl.pathname = '/blocked';
  }

  return NextResponse.rewrite(req.nextUrl);
}
