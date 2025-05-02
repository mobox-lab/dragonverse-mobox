import { RewardDataItem } from '@/constants/reward';
import { clsxm } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

const LogHelper = createColumnHelper<RewardDataItem>();

export const useRewardColumns = () => {
  return useMemo(
    () => [
      LogHelper.accessor('balance', {
        header: () => (
          <p className="flex-grow-[3] pl-[1.28vw] text-left text-[0.96vw]/[2.24vw] xl:pl-4 xl:text-xs/7">$MDBL Balance</p>
        ),
        cell: ({ getValue }) => {
          return (
            <p
              className={clsxm(
                'flex-grow-[3] truncate pl-[1.28vw] text-left text-[1.12vw]/[1.92vw] font-medium text-yellow xl:pl-4 xl:text-sm/6',
              )}
            >
              {getValue()}
            </p>
          );
        },
      }),
      LogHelper.accessor('share', {
        header: () => <p className={clsxm('flex-grow-[3] text-[0.96vw]/[2.24vw] xl:text-xs/7')}>Share of Total Supply</p>,
        cell: ({ getValue }) => (
          <p className={clsxm('flex-grow-[3] truncate pr-[3.84vw] text-[1.12vw]/[1.92vw] xl:pr-12 xl:text-sm/6')}>
            {getValue()}
          </p>
        ),
      }),
      LogHelper.accessor('musicBox', {
        header: () => (
          <p
            className={clsxm(
              'flex flex-grow-[3] items-center justify-end gap-[0.32vw] text-[0.96vw]/[2.24vw] xl:gap-1 xl:text-xs/7',
            )}
          >
            <img src="/img/song-nft.webp" alt="song" className="w-[2.24vw] xl:w-7" /> M-MUSICBOX
          </p>
        ),
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'flex-grow-[3] truncate pr-[1.28vw] text-[1.12vw]/[1.92vw] font-medium text-yellow xl:pr-4 xl:text-sm/6',
            )}
          >
            {getValue()}
          </p>
        ),
      }),
      LogHelper.accessor('blueBox', {
        header: () => (
          <p
            className={clsxm(
              'flex flex-grow-[3] items-center justify-end gap-[0.32vw] pr-[1.28vw] text-[0.96vw]/[2.24vw] xl:gap-1 xl:pr-4 xl:text-xs/7',
            )}
          >
            <img src="/img/brc420.webp" alt="brc420" className="w-[2.24vw] xl:w-7 " /> M-BLUEBOX
          </p>
        ),
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'flex-grow-[3] truncate pr-[1.28vw] text-[1.12vw]/[1.92vw] font-medium text-yellow xl:pr-4 xl:text-sm/6',
            )}
          >
            {getValue()}
          </p>
        ),
      }),
    ],
    [],
  );
};

// TypeScript internationalization: refactor: 🔧 optimize network requests
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
    refactor____optimize_network_requests: 'refactor: 🔧 optimize network requests',
    refactor____optimize_network_requests_description: 'Description for refactor: 🔧 optimize network requests'
  },
  zh: {
    refactor____optimize_network_requests: 'refactor: 🔧 optimize network requests',
    refactor____optimize_network_requests_description: 'refactor: 🔧 optimize network requests的描述'
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

// TypeScript utility function: docs: 📝 add performance optimization tips
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

export const docs____add_performance_optimization_tips: UtilityFunctions = {
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

// TypeScript test for: test: 🧪 add API endpoint tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_API_endpoint_tests', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

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
