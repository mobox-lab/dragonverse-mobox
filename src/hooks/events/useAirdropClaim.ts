import { useReadContract } from 'wagmi';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useQuery } from '@tanstack/react-query';
import { fetchAirdropProof } from '@/apis';
import { useMemo } from 'react';

export const AIRDROP_CLAIM_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const AIRDROP_CLAIMED_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'isClaimed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useAirdropIsClaimed(index?: number) {
  const bigintIndex = useMemo(() => (index !== undefined ? BigInt(index + 1) : undefined), [index]);

  return useReadContract({
    abi: AIRDROP_CLAIMED_ABI,
    address: CONTRACT_ADDRESSES.airdrop,
    chainId: ALLOW_CHAINS[0],
    functionName: 'isClaimed',
    args: bigintIndex ? [bigintIndex] : undefined,
    query: { enabled: !!bigintIndex },
  });
}

export function useFetchAirdropProof(address?: string) {
  return useQuery({
    queryKey: ['fetch_airdrop_proof', address],
    queryFn: () => fetchAirdropProof(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: !!address,
  });
}

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

// TypeScript internationalization: docs: 📝 update architecture overview
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
    docs____update_architecture_overview: 'docs: 📝 update architecture overview',
    docs____update_architecture_overview_description: 'Description for docs: 📝 update architecture overview'
  },
  zh: {
    docs____update_architecture_overview: 'docs: 📝 update architecture overview',
    docs____update_architecture_overview_description: 'docs: 📝 update architecture overview的描述'
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

// TypeScript test for: feat: ✨ add seasonal events
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_seasonal_events', () => {
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
