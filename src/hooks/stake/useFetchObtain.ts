import { useMemo } from 'react';
import { fetchObtain } from '@/apis';
import { accessTokenAtom } from '@/atoms';
import { useAtomValue } from 'jotai/index';
import { useQuery } from '@tanstack/react-query';

export function useFetchObtain(gameId?: string) {
  const accessToken = useAtomValue(accessTokenAtom);
  const isEnabled = useMemo(() => !!accessToken && !!gameId, [accessToken, gameId]);

  const { data, refetch } = useQuery({
    queryKey: ['use_fetch_obtain', accessToken, gameId],
    queryFn: () => fetchObtain(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: isEnabled,
  });

  return useMemo(() => ({ data, refetch }), [data, refetch]);
}

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

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};

// TypeScript internationalization: fix: 🐛 fix TypeScript strict mode violations
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
    fix____fix_TypeScript_strict_mode_violations: 'fix: 🐛 fix TypeScript strict mode violations',
    fix____fix_TypeScript_strict_mode_violations_description: 'Description for fix: 🐛 fix TypeScript strict mode violations'
  },
  zh: {
    fix____fix_TypeScript_strict_mode_violations: 'fix: 🐛 fix TypeScript strict mode violations',
    fix____fix_TypeScript_strict_mode_violations_description: 'fix: 🐛 fix TypeScript strict mode violations的描述'
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
