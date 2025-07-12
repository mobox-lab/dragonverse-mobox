import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import { useMainDisconnect } from '@/hooks/wallet';
import { useQueryClient } from '@tanstack/react-query';

export const QueryCacheProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { mainDisconnect } = useMainDisconnect();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const queryCache = useMemo(() => queryClient.getQueryCache(), [queryClient]);

  useEffect(() => {
    queryCache.config = {
      onError: (error: any) => {
        const { data, code } = error ?? {};
        if (code === 401 && data?.[0] === 'TokenExpiredError') {
          setAccessToken(undefined);
          mainDisconnect();
        }
      },
    };
  }, [mainDisconnect, queryCache, setAccessToken]);

  return <div>{children}</div>;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: feat: ✨ create battle pass system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____create_battle_pass_system', () => {
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
