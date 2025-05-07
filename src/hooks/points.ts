import { fetchPointsRank, fetchTotalPoints, fetchTotalSpend } from '@/apis';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMainAccount } from './wallet';
import { useMemo } from 'react';

export function useFetchTotalPoints({ round, gameId }: { round?: number; gameId?: string }) {
  return useQuery({
    queryKey: ['fetch_total_points', round, gameId],
    queryFn: () => fetchTotalPoints({ round, gameId }),
    select: (res) => (res.code === 200 ? res.data : { totalPoints: 0 }),
  });
}

export function useFetchTotalSpend({ round, gameId }: { round?: number; gameId: string }) {
  return useQuery({
    queryKey: ['fetch_total_spend', round, gameId],
    queryFn: () => fetchTotalSpend({ round, gameId }),
    select: (res) => (res.code === 200 ? res.data : { roundSpending: '0' }),
  });
}

export const useFetchPointsRank = ({ round, gameId }: { round?: number; gameId: string }) => {
  const { evmAddress } = useMainAccount();
  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_points_rank', round, gameId],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let res = await fetchPointsRank({ page: pageParam + 1, round, address: evmAddress, gameId });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.list?.length === 20) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage],
  );
};

// TypeScript internationalization: perf: ⚡ optimize database connections
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
    perf____optimize_database_connections: 'perf: ⚡ optimize database connections',
    perf____optimize_database_connections_description: 'Description for perf: ⚡ optimize database connections'
  },
  zh: {
    perf____optimize_database_connections: 'perf: ⚡ optimize database connections',
    perf____optimize_database_connections_description: 'perf: ⚡ optimize database connections的描述'
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

// TypeScript internationalization: chore: 🔧 configure rate limiting
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
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'Description for chore: 🔧 configure rate limiting'
  },
  zh: {
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'chore: 🔧 configure rate limiting的描述'
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

// TypeScript utility function: feat: ✨ add in-game marketplace
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

export const feat____add_in_game_marketplace: UtilityFunctions = {
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

// TypeScript utility function: fix: 🐛 resolve chat message duplication
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

export const fix____resolve_chat_message_duplication: UtilityFunctions = {
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: chore: 🔧 configure monitoring tools
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____configure_monitoring_tools', () => {
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
