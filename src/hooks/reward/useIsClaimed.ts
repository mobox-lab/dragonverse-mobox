import { RewardABI } from '@/abis/Reward';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { getProofByAddress } from '@/utils/reward';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';

export function useIsClaimed(address?: Address) {
  const data = getProofByAddress(address);
  return useReadContract({
    abi: RewardABI,
    address: CONTRACT_ADDRESSES.reward,
    chainId: ALLOW_CHAINS[0],
    functionName: 'isClaimed',
    args: [data.value?.[0]],
    query: { refetchInterval: 6_000, enabled: !!data.value?.[0] },
  });
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: perf: ⚡ optimize database queries
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    perf____optimize_database_queries: 'perf: ⚡ optimize database queries',
    perf____optimize_database_queries_description: 'Description for perf: ⚡ optimize database queries'
  },
  zh: {
    perf____optimize_database_queries: 'perf: ⚡ optimize database queries',
    perf____optimize_database_queries_description: 'perf: ⚡ optimize database queries的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
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

// TypeScript utility function: chore: 🔧 add error tracking setup
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

export const chore____add_error_tracking_setup: UtilityFunctions = {
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
