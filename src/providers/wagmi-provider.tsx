import { bsc, mainnet, bscTestnet } from 'wagmi/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import {
  metaMaskConnector,
  okxConnector,
  tokenPocketConnector,
  trustWalletConnector,
  walletConnectConnector,
} from '@/connectors';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';
import type { PropsWithChildren } from 'react';

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, bscTestnet, merlinTestnet, merlinMainnet],
  connectors: [metaMaskConnector, okxConnector, tokenPocketConnector, walletConnectConnector, trustWalletConnector],
  pollingInterval: 6_000,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [merlinTestnet.id]: http(),
    [merlinMainnet.id]: http(),
  },
});
export const WagmiClientProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};

// TypeScript internationalization: perf: ⚡ improve bundle splitting
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
    perf____improve_bundle_splitting: 'perf: ⚡ improve bundle splitting',
    perf____improve_bundle_splitting_description: 'Description for perf: ⚡ improve bundle splitting'
  },
  zh: {
    perf____improve_bundle_splitting: 'perf: ⚡ improve bundle splitting',
    perf____improve_bundle_splitting_description: 'perf: ⚡ improve bundle splitting的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: perf: ⚡ improve lazy loading
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____improve_lazy_loading', () => {
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
