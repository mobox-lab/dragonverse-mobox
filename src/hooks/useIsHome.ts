import { useMemo } from 'react';
import { useLocation } from 'react-use';
import { useIsMounted } from './useIsMounted';

export function useIsHome() {
  const location = useLocation();
  const isMounted = useIsMounted();
  // const activeRouter = location.pathname ?? '/';
  return useMemo(() => ({ isHome: isMounted && location.pathname === '/' }), [location.pathname, isMounted]);
}
