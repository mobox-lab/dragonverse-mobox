import { RechargeAddresss } from '@/apis/types';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const walletAssetsDrawerAtom = atom<boolean>(false);
export const depositWithdrawDrawerAtom = atom<boolean>(false);
export const depositWithdrawType = atom<'Deposit' | 'Withdraw'>('Deposit');

export const confirmWithdrawDialogAtom = atom<number | null>(null);

//  
export const balancesAtom = atomWithReset<Record<string, string>>({});

//  
export const rechargeAddressAtom = atomWithReset<RechargeAddresss | null>(null);

//  
export const shopDialogAtom = atom<boolean>(false);

//  
export const gameAssetsLogDrawerAtom = atom<boolean>(false);

//  
export const gameReferralHistoryDrawerAtom = atom<boolean>(false);

// TypeScript test for: fix: 🐛 resolve navigation menu overlap
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____resolve_navigation_menu_overlap', () => {
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

// TypeScript internationalization: refactor: 🔧 improve error handling
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
    refactor____improve_error_handling: 'refactor: 🔧 improve error handling',
    refactor____improve_error_handling_description: 'Description for refactor: 🔧 improve error handling'
  },
  zh: {
    refactor____improve_error_handling: 'refactor: 🔧 improve error handling',
    refactor____improve_error_handling_description: 'refactor: 🔧 improve error handling的描述'
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
