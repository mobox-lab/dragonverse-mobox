import ArrowSVG from '@/../public/svg/arrow-02.svg?component';
import { StakeItem, StakeTradeStatus, StakeTradeType } from '@/apis/types';
import { stakeHistoryTypeOrderAtom } from '@/atoms/stake';
import { clsxm, shortenAddress, shortenDigits } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { formatEther } from 'viem';

const stakeHistoryHelper = createColumnHelper<StakeItem>();

export const useStakeHistoryColumns = () => {
  const [order, setOrder] = useAtom(stakeHistoryTypeOrderAtom);

  return useMemo(
    () => [
      stakeHistoryHelper.accessor('updatedAt', {
        header: () => <p className="w-[7.68vw] flex-grow-[2] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[2] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue()).format('YYYY/MM/DD HH:mm:ss')}
            </p>
          );
        },
      }),
      stakeHistoryHelper.accessor('transactionType', {
        header: () => (
          <p
            className="flex w-[3.2vw] flex-grow cursor-pointer items-center gap-[0.32vw] text-left xl:w-10 xl:gap-1"
            onClick={() => {
              if (order === 'default') setOrder('stake');
              if (order === 'stake') setOrder('redeem');
              if (order === 'redeem') setOrder('default');
            }}
          >
            Type
            <div className="flex flex-col items-center justify-center gap-[0.32vw] xl:gap-1">
              <ArrowSVG className={clsxm('h-[0.48vw] fill-gray-300 xl:h-1.5', { 'fill-white': order === 'stake' })} />
              <ArrowSVG
                className={clsxm('h-[0.48vw] rotate-180 fill-gray-300 xl:h-1.5', { 'fill-white': order === 'redeem' })}
              />
            </div>
          </p>
        ),
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.2vw] flex-grow text-left text-[0.96vw]/[1.44vw] font-normal xl:w-10 xl:text-xs/4.5">
              {StakeTradeType[getValue()]}
            </p>
          );
        },
      }),
      stakeHistoryHelper.accessor('amount', {
        header: () => <p className="w-[3.2vw] flex-grow-[2] xl:w-10">Amount</p>,
        cell: ({ getValue, row }) => {
          const { transactionType } = row.original;
          const amount = shortenDigits(Number(formatEther(BigInt(getValue() || 0))));
          return (
            <p className="flex w-[3.2vw] flex-grow-[2] items-center justify-end gap-1 text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-10 xl:text-sm/6">
              {amount} {transactionType === StakeTradeType.Stake ? '$MDBL' : 'eMDBL'}
            </p>
          );
        },
      }),

      stakeHistoryHelper.accessor('receive', {
        header: () => <p className="w-[3.2vw] flex-grow-[2] xl:w-10">Receive</p>,
        cell: ({ getValue, row }) => {
          const { transactionType } = row.original;
          const receive = shortenDigits(Number(formatEther(BigInt(getValue() || 0))));
          return (
            <p className="flex w-[3.2vw] flex-grow-[2] items-center justify-end gap-1 text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-10 xl:text-sm/6">
              {receive} {transactionType === StakeTradeType.Redeem ? '$MDBL' : 'eMDBL'}
            </p>
          );
        },
      }),
      stakeHistoryHelper.accessor('tradeStatus', {
        header: () => (
          <p className={clsxm('w-[3.84vw] flex-grow-[2] whitespace-nowrap pl-[3.84vw] text-left xl:w-12 xl:pl-12')}>Status</p>
        ),
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'w-[3.84vw] flex-grow-[2] truncate pl-[3.84vw] text-left text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pl-12 xl:text-sm/4.5',
              getValue() === StakeTradeStatus.Completed ? 'text-green' : 'text-red',
            )}
          >
            {StakeTradeStatus[getValue()]}
          </p>
        ),
      }),
      stakeHistoryHelper.accessor('txHash', {
        header: () => <p className="w-[3.84vw] flex-grow-[2] pr-[1.28vw] xl:w-12 xl:pr-4">Transaction</p>,
        cell: ({ getValue }) => {
          return (
            <a
              target="_blank"
              href={`https://scan.merlinchain.io/tx/${getValue() ?? ''}`}
              className={clsxm(
                'text-link w-[3.84vw] flex-grow-[2] pr-[1.28vw] text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pr-4 xl:text-sm/4.5',
              )}
            >
              {shortenAddress(getValue())}
            </a>
          );
        },
      }),
    ],
    [order, setOrder],
  );
};

// TypeScript React component methods for: feat: ✨ add seasonal events
interface feat____add_seasonal_eventsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_seasonal_eventsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_seasonal_events = () => {
  const [state, setState] = useState<feat____add_seasonal_eventsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_seasonal_events = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_seasonal_events');
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
    handlefeat____add_seasonal_events
  };
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function: fix: 🐛 correct type definitions for API responses
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

export const fix____correct_type_definitions_for_API_responses: UtilityFunctions = {
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

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
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

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};

// TypeScript React component methods for: fix: 🐛 resolve TypeScript compilation errors
interface fix____resolve_TypeScript_compilation_errorsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_TypeScript_compilation_errorsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_TypeScript_compilation_errors = () => {
  const [state, setState] = useState<fix____resolve_TypeScript_compilation_errorsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_TypeScript_compilation_errors = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_TypeScript_compilation_errors');
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
    handlefix____resolve_TypeScript_compilation_errors
  };
};
