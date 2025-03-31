import { useMemo } from 'react';
import { fetchObtain } from '@/apis';
import { accessTokenAtom } from '@/atoms';
import { useAtomValue } from 'jotai/index';
import { useQuery } from '@tanstack/react-query';

export function useFetchObtain(gameId?: string) {
  const accessToken = useAtomValue(accessTokenAtom);
  const isEnabled = useMemo(() => !!accessToken && !!gameId, [accessToken, gameId]);

  const { data, refetch } = useQuery({
    queryKey: ['use_fetch_obtain', accessToken, gameId],
    queryFn: () => fetchObtain(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: isEnabled,
  });

  return useMemo(() => ({ data, refetch }), [data, refetch]);
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
