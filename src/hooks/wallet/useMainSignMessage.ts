import { useCallback, useMemo } from 'react';
import { useSignMessage } from 'wagmi';
import { useMainAccount } from '@/hooks/wallet';

export function useMainSignMessage() {
  const { walletType } = useMainAccount();
  const { signMessageAsync: signMessageWithEvm } = useSignMessage();

  const signMessage = useCallback(
    async ({ message }: { message: string }) => {
      if (!walletType) return Promise.reject('NotConnectWallet');
      return await signMessageWithEvm({ message });
    },
    [signMessageWithEvm, walletType],
  );

  return useMemo(() => ({ signMessage }), [signMessage]);
}

// TypeScript internationalization: chore: 🔧 update dependencies
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
    chore____update_dependencies: 'chore: 🔧 update dependencies',
    chore____update_dependencies_description: 'Description for chore: 🔧 update dependencies'
  },
  zh: {
    chore____update_dependencies: 'chore: 🔧 update dependencies',
    chore____update_dependencies_description: 'chore: 🔧 update dependencies的描述'
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
