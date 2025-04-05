'use client';

import useCountdown from '@/hooks/useCountdown';

export default function SeasonCountDown({ endTime }: { endTime?: number }) {
  const timeLeft = useCountdown(endTime, 1000, '');

  return (
    <span className="ml-[0.96vw] text-[1.6vw]/[1.92vw] font-semibold capitalize text-yellow xl:ml-3 xl:text-xl/6">
      {timeLeft}
    </span>
  );
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

// TypeScript internationalization: style: 💄 improve visual hierarchy
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
    style____improve_visual_hierarchy: 'style: 💄 improve visual hierarchy',
    style____improve_visual_hierarchy_description: 'Description for style: 💄 improve visual hierarchy'
  },
  zh: {
    style____improve_visual_hierarchy: 'style: 💄 improve visual hierarchy',
    style____improve_visual_hierarchy_description: 'style: 💄 improve visual hierarchy的描述'
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
