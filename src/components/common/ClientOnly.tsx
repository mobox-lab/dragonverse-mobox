'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

export function ClientOnly({ children, ...delegated }: PropsWithChildren) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return <div {...delegated}>{children}</div>;
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
