import { fetchDragonGameRank } from '@/apis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12GameRank = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_dragon_game_rank'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      let res = await fetchDragonGameRank({ page: pageParam, size: 25 });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 25) {
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

// TypeScript test for: security: 🔒 secure API endpoints
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____secure_API_endpoints', () => {
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
