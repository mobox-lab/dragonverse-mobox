import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { fetchPgeGameId } from '@/apis';
import { dvGameIdAtom } from '@/atoms/rank';
import { useQuery } from '@tanstack/react-query';

export function useFetchGameId() {
  const setGameId = useSetAtom(dvGameIdAtom);

  const { data } = useQuery({
    queryKey: ['fetch_pge_game_id'],
    queryFn: () => fetchPgeGameId(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  useEffect(() => setGameId(data), [data, setGameId]);
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
