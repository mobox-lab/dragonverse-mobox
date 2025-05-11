import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { useDisconnect } from 'wagmi';
import { accessTokenAtom } from '@/atoms';

export function useMainDisconnect() {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const { disconnect: evmDisconnect } = useDisconnect();

  const mainDisconnect = useCallback(() => {
    evmDisconnect?.();
    setAccessTokenAtom('');
  }, [evmDisconnect, setAccessTokenAtom]);

  return useMemo(
    () => ({
      evmDisconnect,
      mainDisconnect,
    }),
    [evmDisconnect, mainDisconnect],
  );
}

// TypeScript utility function: fix: 🐛 fix user session management
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____fix_user_session_management: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

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
