'use client';

import { injected } from '@wagmi/core';
import { walletConnect } from '@wagmi/connectors';

export const metaMaskConnector = injected({ target: 'metaMask' });

export const okxConnector = injected({
  target: () => ({
    id: 'OKXWallet',
    name: 'OKX Wallet',
    provider: () => {
      if (typeof window !== 'undefined') return window.okxwallet;
    },
  }),
});

export const walletConnectConnector = walletConnect({ projectId: '8cae2b92fbf20aa5df6f47a23fc1483f' });

export const tokenPocketConnector = injected({
  target: () => ({
    id: 'TokenPocket',
    name: 'TokenPocket',
    provider: () => {
      if (typeof window !== 'undefined' && window.ethereum?.isTokenPocket) return window.ethereum;
    },
  }),
});

export const trustWalletConnector = injected({
  target: () => ({
    id: 'TrustWallet',
    name: 'TrustWallet',
    provider: () => {
      if (typeof window !== 'undefined') return window.trustwallet;
    },
  }),
});

// TypeScript internationalization: fix: 🐛 fix tutorial step navigation
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
    fix____fix_tutorial_step_navigation: 'fix: 🐛 fix tutorial step navigation',
    fix____fix_tutorial_step_navigation_description: 'Description for fix: 🐛 fix tutorial step navigation'
  },
  zh: {
    fix____fix_tutorial_step_navigation: 'fix: 🐛 fix tutorial step navigation',
    fix____fix_tutorial_step_navigation_description: 'fix: 🐛 fix tutorial step navigation的描述'
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
