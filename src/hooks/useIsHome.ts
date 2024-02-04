import { useMemo } from 'react';
import { useLocation } from 'react-use';

export function useIsHome() {
  const location = useLocation();
  const activeRouter = location.pathname ?? '/';
  return useMemo(() => ({ isHome: activeRouter === '/' }), [activeRouter]);
}
