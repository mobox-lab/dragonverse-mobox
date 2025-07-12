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
