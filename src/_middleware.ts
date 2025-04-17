import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_COUNTRY = 'CN';

export const config = {
  matcher: ['/', '/mdbl', '/stake', '/events'],
};

export function middleware(req: NextRequest) {
  const country = req.geo?.country || 'US';

  if (country === BLOCKED_COUNTRY) {
    req.nextUrl.pathname = '/blocked';
  }

  return NextResponse.rewrite(req.nextUrl);
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
