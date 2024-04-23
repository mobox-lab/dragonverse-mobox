import { useReadContract } from 'wagmi';
import { ALLOW_CHAIN } from '@/constants';
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
    chainId: ALLOW_CHAIN,
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
