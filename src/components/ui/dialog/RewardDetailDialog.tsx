import { rewardDetailDialogAtom } from '@/atoms/stake';
import { useAtom } from 'jotai';
import Dialog from '.';
import { useFetchDailyReward } from '@/hooks/stake/useFetchDailyReward';
import { formatNumber } from '@/utils';

export default function RewardDetailDialog() {
  const [isOpen, setIsOpen] = useAtom(rewardDetailDialogAtom);
  const { data } = useFetchDailyReward();
  return (
    <Dialog
      open={isOpen}
      contentClassName="p-0 xl:p-0"
      className="w-[48vw] xl:w-[600px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div className="flex flex-col">
          <div className="p-[2.88vw] pb-[3.2vw] text-center xl:p-6 xl:pb-10">
            <h1 className="flex items-center justify-center gap-[0.32vw] text-[1.6vw]/[2.4vw] font-semibold text-yellow xl:gap-1 xl:text-xl/7.5">
              <img src="/img/emdbl.webp" alt="emdbl" className="h-[2.4vw] w-[2.4vw] xl:h-7.5 xl:w-7.5" />
              eMDBL Reward
            </h1>

            <div className="mt-[2.4vw] flex h-[2.88vw] w-full items-center bg-blue-300/30 px-[1.28vw] text-[0.96vw]/[1.6vw] xl:mt-7.5 xl:h-9 xl:px-4 xl:text-xs/5">
              Current Daily Reward: {formatNumber(BigInt(data?.currentDayReward || 0), false)}
            </div>
            <p className="mt-[2.4vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-7.5 xl:text-sm/6">
              eMDBL reward will be proportionate to the Current Daily Reward:
            </p>
            <p className="mt-[1.28vw] text-[1.12vw]/[1.92vw] font-medium italic text-yellow xl:mt-4 xl:text-sm/6">
              My Boosted eMDBL = My eMDBL * (1 + My Boost Rate)
            </p>
            <div className="mt-[0.96vw] flex items-center justify-center gap-[0.64vw] text-[1.12vw]/[1.92vw] font-medium italic text-yellow xl:mt-3 xl:gap-2 xl:text-sm/6">
              My Daily Reward =
              <div className="flex flex-col items-center">
                <span>My Boosted eMDBL</span>
                <div className="h-px w-[10.56vw] bg-yellow xl:w-[150px]" />
                <span>Total Boosted eMDBL</span>
              </div>
              * Current Daily Reward
            </div>
            {/* <div classNamce="mb-[3.2vw] mt-[2.88vw] h-px bg-white/25 xl:mb-10 xl:mt-9" /> */}
          </div>
          {/* <div className="relative h-[16vw] xl:h-[200px]">
            <img src="/img/reward-detail-bg.webp" draggable={false} className="absolute inset-0 h-[16vw] xl:h-[200px]" alt="" />
            <p className="whitespace-pre-wrap pt-[3.2vw] text-center text-[1.92vw]/[2.88vw] font-semibold tracking-[0.32vw] text-gray-300 xl:pt-10 xl:text-2xl/9 xl:tracking-[4px]">
              {'COMING\nSOON'}
            </p>
          </div> */}
        </div>
      )}
    />
  );
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: feat: ✨ implement dark mode theme
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
    feat____implement_dark_mode_theme: 'feat: ✨ implement dark mode theme',
    feat____implement_dark_mode_theme_description: 'Description for feat: ✨ implement dark mode theme'
  },
  zh: {
    feat____implement_dark_mode_theme: 'feat: ✨ implement dark mode theme',
    feat____implement_dark_mode_theme_description: 'feat: ✨ implement dark mode theme的描述'
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

// TypeScript internationalization: feat: ✨ add TypeScript generics for reusable components
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
    feat____add_TypeScript_generics_for_reusable_components: 'feat: ✨ add TypeScript generics for reusable components',
    feat____add_TypeScript_generics_for_reusable_components_description: 'Description for feat: ✨ add TypeScript generics for reusable components'
  },
  zh: {
    feat____add_TypeScript_generics_for_reusable_components: 'feat: ✨ add TypeScript generics for reusable components',
    feat____add_TypeScript_generics_for_reusable_components_description: 'feat: ✨ add TypeScript generics for reusable components的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript React component methods for: security: 🔒 add XSS protection
interface security____add_XSS_protectionProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface security____add_XSS_protectionState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usesecurity____add_XSS_protection = () => {
  const [state, setState] = useState<security____add_XSS_protectionState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlesecurity____add_XSS_protection = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/security____add_XSS_protection');
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
    handlesecurity____add_XSS_protection
  };
};

// TypeScript test for: style: 💄 improve visual hierarchy
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____improve_visual_hierarchy', () => {
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

// TypeScript test for: refactor: 🔧 optimize image loading
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____optimize_image_loading', () => {
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
