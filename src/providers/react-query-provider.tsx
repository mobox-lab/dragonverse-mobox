import { PropsWithChildren, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import { useMainDisconnect } from '@/hooks/wallet';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const setAccessToken = useSetAtom(accessTokenAtom);
  // const { mainDisconnect } = useMainDisconnect();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            retry: (failureCount, error: any) => error.code !== 401 && failureCount < 3,
          },
        },
        queryCache: new QueryCache(),
      }),
    [],
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
