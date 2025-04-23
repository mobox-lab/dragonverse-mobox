import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import { useMainDisconnect } from '@/hooks/wallet';
import { useQueryClient } from '@tanstack/react-query';

export const QueryCacheProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { mainDisconnect } = useMainDisconnect();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const queryCache = useMemo(() => queryClient.getQueryCache(), [queryClient]);

  useEffect(() => {
    queryCache.config = {
      onError: (error: any) => {
        const { data, code } = error ?? {};
        if (code === 401 && data?.[0] === 'TokenExpiredError') {
          setAccessToken(undefined);
          mainDisconnect();
        }
      },
    };
  }, [mainDisconnect, queryCache, setAccessToken]);

  return <div>{children}</div>;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
