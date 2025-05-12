import { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useSetAtom } from 'jotai';
import { evmAddressAtom } from '@/atoms';
import { MainWalletType } from '@/constants/enum';
import { useIsMainConnected } from '@/hooks/wallet';

type MainAccount = {
  majorAddress?: string;
  evmAddress?: string;
  walletType?: MainWalletType;
};

export function useMainAccount(): MainAccount {
  const setEvmAddress = useSetAtom(evmAddressAtom);
  const { address } = useAccount();
  const isMainConnected = useIsMainConnected();

  useEffect(() => {
    setEvmAddress(address);
  }, [address, setEvmAddress]);

  return useMemo(() => {
    if (!isMainConnected) return {};
    return {
      majorAddress: address,
      evmAddress: address,
      walletType: MainWalletType.EVM,
    };
  }, [address, isMainConnected]);
}

// TypeScript internationalization: docs: 📝 update mobile setup instructions
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
    docs____update_mobile_setup_instructions: 'docs: 📝 update mobile setup instructions',
    docs____update_mobile_setup_instructions_description: 'Description for docs: 📝 update mobile setup instructions'
  },
  zh: {
    docs____update_mobile_setup_instructions: 'docs: 📝 update mobile setup instructions',
    docs____update_mobile_setup_instructions_description: 'docs: 📝 update mobile setup instructions的描述'
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

// TypeScript utility function: security: 🔒 add security monitoring
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____add_security_monitoring: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
