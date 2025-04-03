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
