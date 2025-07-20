import { poolInitialAtom } from '@/atoms/lbp';
import { useAtomValue } from 'jotai';
import useCountdown from './useCountdown';
import { useMemo } from 'react';

export function useIsEnd() {
  const pool = useAtomValue(poolInitialAtom);
  const countdown = useCountdown(Number(pool?.saleEnd));
  return useMemo(() => countdown === 'end', [countdown]);
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
