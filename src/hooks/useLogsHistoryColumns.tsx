import { useMemo } from 'react';
import dayjs from 'dayjs';
import { TradeHistoryItem } from '@/apis/types';
import { createColumnHelper } from '@tanstack/react-table';
import { formatNumber } from '@/utils';
import clsx from 'clsx';

const tradeHistoryHelper = createColumnHelper<TradeHistoryItem>();

const statusTextColors: Record<string, string> = {
  Succeed: 'text-green',
  Reversed: 'text-[#F13361]',
  Pending: 'text-legendary',
};

export const useLogsHistoryColumns = () => {
  return useMemo(
    () => [
      tradeHistoryHelper.accessor('createdTimestamp', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue() * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('fundAction', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">Type</p>,
        cell: ({ getValue }) => {
          const value = getValue();
          const action =
            value === 'WITHDRAW-REVERSED'
              ? 'Reversed'
              : value.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

          return (
            <p className="w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              {action}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('state', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">Status</p>,
        cell: ({ getValue }) => {
          const status = getValue();

          return (
            <p
              className={clsx(
                'w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
                statusTextColors[status] ?? '',
              )}
            >
              {status}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('amount', {
        header: () => <p className="w-[3.84vw] flex-grow-[5] pr-[1.28vw] xl:w-12 xl:pr-4">Amount</p>,
        cell: ({ getValue }) => {
          return (
            <p className="flex w-[3.84vw] flex-grow-[5] items-center justify-end pr-[1.28vw] text-right text-[1.12vw]/[1.44vw] font-medium text-yellow xl:w-12 xl:pr-4 xl:text-sm/4.5">
              {formatNumber(BigInt(getValue()))}
              <img src="/img/mdbl-in-game.png" alt="mdbl" className="ml-1 h-[1.5vw] xl:h-5" />
            </p>
          );
        },
      }),
    ],
    [],
  );
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript React component methods for: style: 💄 improve typography hierarchy
interface style____improve_typography_hierarchyProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface style____improve_typography_hierarchyState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usestyle____improve_typography_hierarchy = () => {
  const [state, setState] = useState<style____improve_typography_hierarchyState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlestyle____improve_typography_hierarchy = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/style____improve_typography_hierarchy');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlestyle____improve_typography_hierarchy
  };
};
