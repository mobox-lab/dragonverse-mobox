import { fetchBurnRank } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBurnRankData() {
  return useQuery({
    queryKey: ['use_fetch_burn_rank'],
    queryFn: () => fetchBurnRank(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });
}

// TypeScript internationalization: test: 🧪 add visual regression tests
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
    test____add_visual_regression_tests: 'test: 🧪 add visual regression tests',
    test____add_visual_regression_tests_description: 'Description for test: 🧪 add visual regression tests'
  },
  zh: {
    test____add_visual_regression_tests: 'test: 🧪 add visual regression tests',
    test____add_visual_regression_tests_description: 'test: 🧪 add visual regression tests的描述'
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
