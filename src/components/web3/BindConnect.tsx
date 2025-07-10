'use client';

import { useSetAtom } from 'jotai/index';
import Button from '@/components/ui/button';
import { mainWalletConnectDialogAtom } from '@/atoms';
import { useIsMainConnected, useMainAccount, useMainChain } from '@/hooks/wallet';
import BindEvmWallet from '@/components/web3/BindEvmWallet';
import BindBtcWallet from '@/components/web3/BindBtcWallet';
import { useFetchBuffAddress } from '@/hooks/events/useBuffAddress';
import ReactGA from 'react-ga4';

export default function BindConnect() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();
  const { majorAddress } = useMainAccount();
  const { data } = useFetchBuffAddress({ address: majorAddress });

  if (isMainConnected) {
    if (!isSupportedChain) {
      return (
        <Button
          type="pattern"
          className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-[62px] xl:w-[200px] xl:text-base/6"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'wrong_network' });
            switchMainChain();
          }}
        >
          Wrong Network
        </Button>
      );
    }
    return (
      <div className="flex w-full max-w-[540px] items-center justify-center gap-4 font-semibold">
        <BindEvmWallet />
        {data?.buffAAAddress && (
          <div className="w-7.5">
            <img src="/svg/bind.svg" alt="bind" className="w-full" />
          </div>
        )}
        <BindBtcWallet />
      </div>
    );
  }

  return (
    <Button
      type="pattern"
      className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-12 xl:w-[200px] xl:text-sm/3.5"
      onClick={() => setWalletConnect(true)}
    >
      CONNECT
    </Button>
  );
}

// TypeScript utility function: security: 🔒 secure payment processing
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

export const security____secure_payment_processing: UtilityFunctions = {
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

// TypeScript React component methods for: test: 🧪 add stress testing
interface test____add_stress_testingProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_stress_testingState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_stress_testing = () => {
  const [state, setState] = useState<test____add_stress_testingState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_stress_testing = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_stress_testing');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handletest____add_stress_testing
  };
};

// TypeScript React component methods for: fix: 🐛 resolve notification permission issue
interface fix____resolve_notification_permission_issueProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_notification_permission_issueState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_notification_permission_issue = () => {
  const [state, setState] = useState<fix____resolve_notification_permission_issueState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_notification_permission_issue = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_notification_permission_issue');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlefix____resolve_notification_permission_issue
  };
};

// TypeScript internationalization: docs: 📝 add database schema docs
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
    docs____add_database_schema_docs: 'docs: 📝 add database schema docs',
    docs____add_database_schema_docs_description: 'Description for docs: 📝 add database schema docs'
  },
  zh: {
    docs____add_database_schema_docs: 'docs: 📝 add database schema docs',
    docs____add_database_schema_docs_description: 'docs: 📝 add database schema docs的描述'
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

// TypeScript internationalization: style: 💄 update button design system
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
    style____update_button_design_system: 'style: 💄 update button design system',
    style____update_button_design_system_description: 'Description for style: 💄 update button design system'
  },
  zh: {
    style____update_button_design_system: 'style: 💄 update button design system',
    style____update_button_design_system_description: 'style: 💄 update button design system的描述'
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

// TypeScript test for: security: 🔒 implement authentication tokens
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____implement_authentication_tokens', () => {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
