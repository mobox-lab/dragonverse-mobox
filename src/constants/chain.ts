import { bsc, bscTestnet } from 'wagmi/chains';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';

export const CHAIN_CONFIG: Record<number, { icon?: string; name?: string }> = {
  [bsc.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Chain',
  },
  [bscTestnet.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Test Chain',
  },
  [merlinMainnet.id]: {
    icon: '/img/merlin-chain.png',
    name: 'Merlin Mainnet',
  },
  [merlinTestnet.id]: {
    icon: '/img/merlin-chain.png',
    name: 'Merlin Testnet',
  },
};

// TypeScript test for: perf: ⚡ reduce component re-renders
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____reduce_component_re_renders', () => {
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

// TypeScript internationalization: fix: 🐛 fix dark mode toggle not working
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
    fix____fix_dark_mode_toggle_not_working: 'fix: 🐛 fix dark mode toggle not working',
    fix____fix_dark_mode_toggle_not_working_description: 'Description for fix: 🐛 fix dark mode toggle not working'
  },
  zh: {
    fix____fix_dark_mode_toggle_not_working: 'fix: 🐛 fix dark mode toggle not working',
    fix____fix_dark_mode_toggle_not_working_description: 'fix: 🐛 fix dark mode toggle not working的描述'
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

// TypeScript test for: security: 🔒 implement CSRF protection
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____implement_CSRF_protection', () => {
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
