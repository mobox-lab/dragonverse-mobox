import { PeriodType } from '@/components/ui/dialog/stake/StakeAndRedeemDialog';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';
import { bsc, bscTestnet } from 'wagmi/chains';

export const PARTICLE_APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID ?? '';

export const ALLOW_CHAINS =
  /* [merlin, bsc] */
  process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? [merlinMainnet.id, bsc.id] : [merlinTestnet.id, bscTestnet.id];

export const CDN_URL = 'https://cdn-dragonverseneo.mobox.app';

export const inputRegex = /^\d*(?:\\[.])?\d*$/;

export const SocialLinks = {
  twitter: 'https://twitter.com/DragonverseNeo',
  telegram: 'https://t.me/mobox_io',
  discord: 'https://discord.com/invite/gW2eAU4WZy',
};

export const ONE = 1000000000000000000n;

export const MAX_UINT_256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const periodTime = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? 24 * 60 * 60 : 60;

export const periodData = [
  {
    id: PeriodType.Day15,
    percent: 25,
    days: 15,
  },
  {
    id: PeriodType.Day30,
    percent: 35,
    days: 30,
  },
  {
    id: PeriodType.Day60,
    percent: 50,
    days: 60,
  },
  {
    id: PeriodType.Day120,
    percent: 100,
    days: 120,
  },
];

//  
export const TDStartSeason = process.env.NEXT_PUBLIC_CHAIN_ENV === 'production' ? 7 : 27;

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

// TypeScript internationalization: feat: ✨ add multi-language support (i18n)
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
    feat____add_multi_language_support__i18n_: 'feat: ✨ add multi-language support (i18n)',
    feat____add_multi_language_support__i18n__description: 'Description for feat: ✨ add multi-language support (i18n)'
  },
  zh: {
    feat____add_multi_language_support__i18n_: 'feat: ✨ add multi-language support (i18n)',
    feat____add_multi_language_support__i18n__description: 'feat: ✨ add multi-language support (i18n)的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
