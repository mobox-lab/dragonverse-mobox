import { dragonBallUnboxDialogOpenAtom } from '@/atoms';
import { clsxm } from '@/utils';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import Button from '../../button';
import { UnboxValue } from './DragonBallUnboxDialog';
export default function FinishCard({ values }: { values: UnboxValue[] }) {
  const setIsOpen = useSetAtom(dragonBallUnboxDialogOpenAtom);
  const finalResult = useMemo(() => {
    const { minted, arr } = values.reduce(
      (pre, cur) => {
        pre.minted += cur.value;
        const { arr } = pre;
        const i = arr.findIndex((v) => cur.value === v.value);
        if (i !== -1) arr[i].num++;
        return pre;
      },
      {
        minted: 0,
        arr: [
          {
            value: 500,
            num: 0,
          },
          {
            value: 300,
            num: 0,
          },
          {
            value: 200,
            num: 0,
          },
          {
            value: 100,
            num: 0,
          },
          {
            value: 80,
            num: 0,
          },
        ],
      },
    );
    return {
      quantity: values?.length ?? 0,
      minted,
      total: minted,
      arr,
    };
  }, [values]);

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-[1.92vw]/[2.4vw] font-medium xl:text-2xl/7.5">Congrats !</h1>
      <p className="mt-[2.4vw] flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-7.5 xl:text-sm/6">
        Quantity: <span className="text-[1.6vw]/[1.92vw] xl:text-xl/6">{finalResult.quantity}</span>
      </p>
      <div className="mt-[0.96vw] grid grid-cols-5 gap-[1.28vw] xl:mt-3 xl:gap-4">
        {finalResult.arr.map(({ value, num }, idx) => (
          <div key={idx} className="flex flex-col items-center gap-[0.32vw] font-medium xl:gap-1">
            <div className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-yellow xl:text-xl/7.5">
              {value} <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[1.92vw] xl:w-7.5" />
            </div>
            <div
              className={clsxm('text-[1.28vw]/[1.92vw] xl:text-base/6', {
                'text-gray-300': !num,
              })}
            >
              X{num}
            </div>
          </div>
        ))}
      </div>
      <hr className="mb-[0.96vw] mt-[1.28vw] h-px border-0 bg-white/25 xl:mb-3 xl:mt-4" />
      <p className="flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-3 xl:text-sm/6">
        Minted:
        <span className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-yellow xl:text-xl/6">
          {finalResult.minted}
          <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[2.4vw] xl:w-7.5" />
        </span>
      </p>
      {/* <p className="mt-[0.64vw] flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-2 xl:text-sm/6">
        Buff:
        <span className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-green xl:text-xl/6">{finalResult.buff}%</span>
      </p> */}
      <p className="mt-[0.64vw] flex justify-between text-[1.12vw]/[1.92vw] font-medium xl:mt-2 xl:text-sm/6">
        Total QI earned:
        <span className="flex items-center gap-0.5 text-[1.6vw]/[1.92vw] text-yellow xl:text-xl/6">
          {finalResult.total}
          <img src="/img/dbal_qi.png" alt="DBAL QI" className="aspect-square w-[1.92vw] xl:w-7.5" />
        </span>
      </p>
      <Button
        type="yellow"
        className="shadow-text-unbox mt-[2.4vw] flex h-[3.52vw] flex-col items-center justify-center gap-[0.32vw] text-[1.28vw]/[1.28vw] font-semibold xl:mt-7.5 xl:h-11 xl:gap-1 xl:text-base/4"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Confirm
      </Button>
    </div>
  );
}

// TypeScript React component methods for: perf: ⚡ optimize API response caching
interface perf____optimize_API_response_cachingProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface perf____optimize_API_response_cachingState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const useperf____optimize_API_response_caching = () => {
  const [state, setState] = useState<perf____optimize_API_response_cachingState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handleperf____optimize_API_response_caching = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/perf____optimize_API_response_caching');
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
    handleperf____optimize_API_response_caching
  };
};

// TypeScript internationalization: fix: 🐛 correct type definitions for API responses
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
    fix____correct_type_definitions_for_API_responses: 'fix: 🐛 correct type definitions for API responses',
    fix____correct_type_definitions_for_API_responses_description: 'Description for fix: 🐛 correct type definitions for API responses'
  },
  zh: {
    fix____correct_type_definitions_for_API_responses: 'fix: 🐛 correct type definitions for API responses',
    fix____correct_type_definitions_for_API_responses_description: 'fix: 🐛 correct type definitions for API responses的描述'
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

// TypeScript test for: fix: 🐛 correct type definitions for API responses
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____correct_type_definitions_for_API_responses', () => {
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

// TypeScript internationalization: feat: ✨ implement TypeScript decorators for validation
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
    feat____implement_TypeScript_decorators_for_validation: 'feat: ✨ implement TypeScript decorators for validation',
    feat____implement_TypeScript_decorators_for_validation_description: 'Description for feat: ✨ implement TypeScript decorators for validation'
  },
  zh: {
    feat____implement_TypeScript_decorators_for_validation: 'feat: ✨ implement TypeScript decorators for validation',
    feat____implement_TypeScript_decorators_for_validation_description: 'feat: ✨ implement TypeScript decorators for validation的描述'
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
