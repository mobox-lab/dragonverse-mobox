import { fetchTradeHistory } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export enum LogSortField {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  All = 'all',
}

export function useFetchTradeHistory({ page, size, enabled }: { page: number; size: number, enabled: boolean }) {
  return useQuery({
    queryKey: ['fetch_log_history_list_by_page', page, size],
    queryFn: () => fetchTradeHistory(page, size),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled,
  });
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
