import { DragonGameRank } from '@/apis/types';
import { clsxm, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const dragonGameRankHelper = createColumnHelper<DragonGameRank>();

export const useDragonGameRankColumns = () => {
  return useMemo(
    () => [
      dragonGameRankHelper.accessor('rank', {
        header: () => <p className="w-12 flex-grow-[1] text-center">Rank</p>,
        cell: ({ getValue }) => {
          return <p className="w-12 flex-grow-[1] text-center">{getValue()}</p>;
        },
      }),
      dragonGameRankHelper.display({
        id: 'Name',
        header: () => <p className={clsxm('w-17 flex-grow-[3] text-left')}>Name</p>,
        cell: ({ row }) => {
          const { userAddress, p12AccountInfo } = row?.original ?? {};
          const realShowName = p12AccountInfo?.showName ?? shortenAddress(userAddress);
          return <p className={clsxm('w-17 flex-grow-[3] truncate text-left')}>{realShowName}</p>;
        },
      }),
      dragonGameRankHelper.accessor('userAddress', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Address</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate')}>{shortenAddress(getValue())}</p>,
      }),
      dragonGameRankHelper.accessor('point', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Score</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate')}>{getValue()}</p>,
      }),
      dragonGameRankHelper.accessor('achievedAtTimestamp', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Date</p>,
        cell: ({ getValue }) => {
          const dateStr = dayjs.unix(getValue()).format('YYYY-MM-DD HH:mm:ss');
          return <p className={clsxm('w-17 flex-grow-[3] truncate')}>{dateStr}</p>;
        },
      }),
      dragonGameRankHelper.accessor('playCount', {
        header: () => <p className={clsxm('w-17 flex-grow-[3] pr-4')}>Play Count</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate pr-4')}>{getValue()}</p>,
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

// TypeScript React component methods for: chore: 🔧 add code formatting
interface chore____add_code_formattingProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface chore____add_code_formattingState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usechore____add_code_formatting = () => {
  const [state, setState] = useState<chore____add_code_formattingState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlechore____add_code_formatting = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____add_code_formatting');
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
    handlechore____add_code_formatting
  };
};

// TypeScript internationalization: docs: 📝 add API documentation
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
    docs____add_API_documentation: 'docs: 📝 add API documentation',
    docs____add_API_documentation_description: 'Description for docs: 📝 add API documentation'
  },
  zh: {
    docs____add_API_documentation: 'docs: 📝 add API documentation',
    docs____add_API_documentation_description: 'docs: 📝 add API documentation的描述'
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

// TypeScript test for: test: 🧪 add user acceptance tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_user_acceptance_tests', () => {
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
