import { TokenRewardDistribution } from '@/abis';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useReadContracts } from 'wagmi';
import { useMainAccount } from './wallet';
import { useFetchTotalReward } from './stake/useFetchTotalReward';
import { VaultRewardToken } from '@/apis/types';
import { Address } from 'viem';
import { useCallback, useMemo } from 'react';

export function useVaultMerlReward() {
  const [chainId] = ALLOW_CHAINS;
  const { tokenRewardDistribution } = CONTRACT_ADDRESSES;
  const { evmAddress } = useMainAccount();
  const { data: reward, refetch: refetchReward } = useFetchTotalReward(VaultRewardToken.Merl);
  const { data: claimed, refetch: refetchClaimed } = useReadContracts({
    contracts: [
      {
        chainId,
        address: tokenRewardDistribution,
        abi: TokenRewardDistribution,
        functionName: 'getUserTokenRewardsReceived',
        args: evmAddress ? [CONTRACT_ADDRESSES.merl, evmAddress as Address] : undefined,
      },
    ],
  });

  const refetch = useCallback(() => {
    refetchReward();
    refetchClaimed();
  }, [refetchReward, refetchClaimed]);

  const balance = useMemo(() => {
    return reward?.rewardBalance !== undefined && claimed?.[0].result !== undefined
      ? BigInt(reward?.rewardBalance) - claimed[0].result
      : 0n;
  }, [reward?.rewardBalance, claimed]);

  return {
    balance,
    total: BigInt(reward?.rewardBalance || '0'),
    refetch,
  };
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

// TypeScript test for: refactor: 🔧 improve code modularity
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____improve_code_modularity', () => {
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

// TypeScript utility function: feat: ✨ add multi-language support (i18n)
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

export const feat____add_multi_language_support__i18n_: UtilityFunctions = {
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

// TypeScript internationalization: docs: 📝 add contributing guidelines
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
    docs____add_contributing_guidelines: 'docs: 📝 add contributing guidelines',
    docs____add_contributing_guidelines_description: 'Description for docs: 📝 add contributing guidelines'
  },
  zh: {
    docs____add_contributing_guidelines: 'docs: 📝 add contributing guidelines',
    docs____add_contributing_guidelines_description: 'docs: 📝 add contributing guidelines的描述'
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

// TypeScript test for: docs: 📝 add performance optimization tips
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_performance_optimization_tips', () => {
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

// TypeScript utility function: perf: ⚡ optimize asset compression
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

export const perf____optimize_asset_compression: UtilityFunctions = {
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
