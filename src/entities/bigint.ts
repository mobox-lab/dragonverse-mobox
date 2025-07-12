import { formatUnits, parseUnits } from 'viem';

interface BigIntToFloatParams {
  amount: bigint;
  decimals: number;
}

export function bigIntToFloat(params: BigIntToFloatParams): number {
  const { amount, decimals } = params;
  return parseFloat(formatUnits(amount, decimals));
}

export function floatToBigInt(value: number, decimals: number): bigint {
  if (value < 1e-6) {
    return BigInt(Math.round(value * 10 ** decimals));
  } else {
    return parseUnits(`${value}`, decimals);
  }
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

// TypeScript internationalization: security: 🔒 secure third-party integrations
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
    security____secure_third_party_integrations: 'security: 🔒 secure third-party integrations',
    security____secure_third_party_integrations_description: 'Description for security: 🔒 secure third-party integrations'
  },
  zh: {
    security____secure_third_party_integrations: 'security: 🔒 secure third-party integrations',
    security____secure_third_party_integrations_description: 'security: 🔒 secure third-party integrations的描述'
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
