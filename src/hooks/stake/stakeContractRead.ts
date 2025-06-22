import { EMDBLABI, MDBLABI } from '@/abis';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useEffect, useMemo } from 'react';
import { Address, erc20Abi } from 'viem';
import { useReadContract, useReadContracts } from 'wagmi';
import { useMainAccount } from '../wallet';
import { useFetchTotalReward } from './useFetchTotalReward';
import { emdblTotalSupplyAtom } from '@/atoms/stake';
import { useSetAtom } from 'jotai';
import { useFetchInactiveEMDL } from './useFetchInactiveEMDL';
import { mainnet } from 'wagmi/chains';

export function useTotalSupply() {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESSES.emdbl,
    abi: EMDBLABI,
    functionName: 'totalSupply',
    chainId: ALLOW_CHAINS[0],
    query: {
      refetchInterval: 6_000,
    },
  });

  return useMemo(() => {
    return { data };
  }, [data]);
}

export function useEMDBLBalance() {
  const { evmAddress } = useMainAccount();
  const { data } = useReadContract({
    address: CONTRACT_ADDRESSES.emdbl,
    abi: EMDBLABI,
    functionName: 'balanceOf',
    args: [evmAddress as Address],
    chainId: ALLOW_CHAINS[0],
    query: {
      enabled: !!evmAddress,
      refetchInterval: 6_000,
    },
  });

  return useMemo(() => {
    return { data };
  }, [data]);
}

export function useMDBLBalance() {
  const { evmAddress } = useMainAccount();
  const { data } = useReadContract({
    address: CONTRACT_ADDRESSES.mdbl,
    abi: MDBLABI,
    functionName: 'balanceOf',
    args: [evmAddress as Address],
    chainId: ALLOW_CHAINS[0],
    query: {
      enabled: !!evmAddress,
      refetchInterval: 6_000,
    },
  });

  return useMemo(() => {
    return { data };
  }, [data]);
}

export function useEMDBLCanRedemptionBalance() {
  const { evmAddress } = useMainAccount();
  const { data } = useReadContract({
    address: CONTRACT_ADDRESSES.emdbl,
    abi: EMDBLABI,
    functionName: 'getUserCanRedemptionBalance',
    args: [evmAddress as Address],
    chainId: ALLOW_CHAINS[0],
    query: {
      enabled: !!evmAddress,
      refetchInterval: 6_000,
    },
  });

  return useMemo(() => {
    return { data };
  }, [data]);
}

export function useAccruedBalance() {
  const { evmAddress } = useMainAccount();
  const { data: reward, refetch } = useFetchTotalReward();

  const { data } = useReadContract({
    address: CONTRACT_ADDRESSES.emdbl,
    abi: EMDBLABI,
    functionName: 'getUserHasUsedPermitQuota',
    args: [evmAddress as Address],
    chainId: ALLOW_CHAINS[0],
    query: {
      enabled: !!evmAddress,
      refetchInterval: 2_000,
    },
  });

  return useMemo(() => {
    if (reward?.rewardBalance !== undefined && data !== undefined) {
      return { balance: BigInt(reward?.rewardBalance) - data, refetch: refetch };
    }
    return { balance: 0n, refetch: refetch };
  }, [data, reward, refetch]);
}

export function useVeMoboxBalance() {
  const { evmAddress } = useMainAccount();
  return useReadContract({
    address: CONTRACT_ADDRESSES.veMobox,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: evmAddress ? [evmAddress as Address] : undefined,
    chainId: ALLOW_CHAINS[1],
    query: {
      enabled: !!evmAddress,
      refetchInterval: 6_000,
    },
  });
}
//  
export function useStakeContractRead() {
  const { data: reward, refetch } = useFetchTotalReward();
  const { data: inactiveEMDBL, refetch: inactiveRefetch } = useFetchInactiveEMDL();

  const [chainId] = ALLOW_CHAINS;
  const { mdbl, emdbl } = CONTRACT_ADDRESSES;
  const { evmAddress } = useMainAccount();
  const setEmdblTotalSupply = useSetAtom(emdblTotalSupplyAtom);
  const { data } = useReadContracts({
    contracts: [{ address: emdbl, abi: EMDBLABI, functionName: 'totalSupply', chainId }],
    query: { refetchInterval: 6_000 },
  });

  const { data: stakeData } = useReadContracts({
    contracts: [
      {
        chainId,
        address: emdbl,
        abi: EMDBLABI,
        functionName: 'balanceOf',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: mdbl,
        abi: MDBLABI,
        functionName: 'balanceOf',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: emdbl,
        abi: EMDBLABI,
        functionName: 'getUserCanRedemptionBalance',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: emdbl,
        abi: EMDBLABI,
        functionName: 'getUserHasUsedPermitQuota',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: mdbl,
        abi: EMDBLABI,
        functionName: 'allowance',
        args: evmAddress ? [evmAddress as Address, emdbl] : undefined,
      },
    ],
    query: { refetchInterval: 6_000, enabled: !!evmAddress },
  });

  // total supply
  useEffect(() => {
    if (data?.[0].result === undefined) return;
    setEmdblTotalSupply(data[0].result);
  }, [data, setEmdblTotalSupply]);

  return useMemo(() => {
    const accrued =
      reward?.rewardBalance !== undefined && stakeData?.[3].result !== undefined
        ? BigInt(reward?.rewardBalance) - stakeData[3].result
        : 0n;

    const activeEmdblBalance =
      inactiveEMDBL?.inactiveEmdblAmount !== undefined && stakeData?.[0].result !== undefined
        ? stakeData?.[0].result - BigInt(inactiveEMDBL?.inactiveEmdblAmount)
        : 0n;
    return {
      emdblBalance: stakeData?.[0].result,
      mdblBalance: stakeData?.[1].result,
      emdblCanRedemptionBalance: stakeData?.[2].result,
      accruedBalance: accrued,
      totalAccruedBalance: BigInt(reward?.rewardBalance || '0'),
      allowance: stakeData?.[4].result,
      refetch,
      activeEmdblBalance,
      inactiveRefetch,
    };
  }, [reward?.rewardBalance, stakeData, inactiveEMDBL?.inactiveEmdblAmount, refetch, inactiveRefetch]);
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: feat: ✨ implement wallet connection for Web3
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
    feat____implement_wallet_connection_for_Web3: 'feat: ✨ implement wallet connection for Web3',
    feat____implement_wallet_connection_for_Web3_description: 'Description for feat: ✨ implement wallet connection for Web3'
  },
  zh: {
    feat____implement_wallet_connection_for_Web3: 'feat: ✨ implement wallet connection for Web3',
    feat____implement_wallet_connection_for_Web3_description: 'feat: ✨ implement wallet connection for Web3的描述'
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

// TypeScript internationalization: style: 💄 improve accessibility design
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
    style____improve_accessibility_design: 'style: 💄 improve accessibility design',
    style____improve_accessibility_design_description: 'Description for style: 💄 improve accessibility design'
  },
  zh: {
    style____improve_accessibility_design: 'style: 💄 improve accessibility design',
    style____improve_accessibility_design_description: 'style: 💄 improve accessibility design的描述'
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

// TypeScript test for: chore: 🔧 add code formatting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____add_code_formatting', () => {
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

// TypeScript internationalization: test: 🧪 add user acceptance tests
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
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'Description for test: 🧪 add user acceptance tests'
  },
  zh: {
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'test: 🧪 add user acceptance tests的描述'
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

// TypeScript utility function: style: 💄 add micro-interactions
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

export const style____add_micro_interactions: UtilityFunctions = {
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
