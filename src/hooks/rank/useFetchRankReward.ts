import { useCallback, useMemo, useState } from 'react';
import { Address } from 'viem';
import { useReadContracts } from 'wagmi';
import { ALLOW_CHAINS } from '@/constants';
import {
  fetchClaimRewardSignature,
  fetchFundRewardClaim,
  fetchMyRewards,
  fetchRankMdblProof,
  fetchRankMerlProof,
  fetchRankRewardBalance,
  fetchRankRewardClaim,
} from '@/apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LeaderboardRewardsABI } from '@/abis/LeaderboardRewards';
import { RankReward } from '@/apis/types';

export function useReadLeaderboardRewards(address?: Address) {
  const [chainId] = ALLOW_CHAINS;
  const { leaderboardRewards, testLeaderboardMDBLRewards } = CONTRACT_ADDRESSES; //  
  const contractAddress = testLeaderboardMDBLRewards ?? leaderboardRewards;
  const { data } = useReadContracts({
    contracts: [
      {
        chainId,
        address: contractAddress,
        abi: LeaderboardRewardsABI,
        functionName: 'getUserRewardsReceived',
        args: address ? [address] : undefined,
      },
      { chainId, address: contractAddress, abi: LeaderboardRewardsABI, functionName: 'paused' },
    ],
    query: { refetchInterval: 6_000, enabled: !!address },
  });

  return useMemo(
    () => ({
      claimedMdbl: data?.[0].result?.[0] ?? 0n,
      claimedEmdbl: data?.[0].result?.[1] ?? 0n,
      isClaimPaused: data?.[1].result ?? true,
    }),
    [data],
  );
}

export function useFetchRankRewardBalance(address?: string) {
  return useQuery({
    queryKey: ['fetch_rank_reward_balance', address],
    queryFn: () => fetchRankRewardBalance({ address }),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: !!address,
  });
}

function useFetchRankRewardClaim() {
  return useMutation({ mutationFn: () => fetchRankRewardClaim() });
}

function useFetchClaimRewardSignature() {
  return useMutation({ mutationFn: (id?: number) => fetchClaimRewardSignature({ id }) });
}

export function useRankEMDBLClaimSignature() {
  const { mutateAsync: mutateRankReward } = useFetchRankRewardClaim();
  const { mutateAsync: mutateRankRewardSig } = useFetchClaimRewardSignature();
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = useCallback(async () => {
    try {
      setIsLoading(true);
      const request = await mutateRankReward();
      let requestCount = 0;
      let res: any = undefined;

      while (!res?.data.r && requestCount < 10) {
        res = await mutateRankRewardSig(request.data.id);
        requestCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsLoading(false);
      if (requestCount >= 10) return { code: 429, data: null, message: 'too many request' };
      return res;
    } catch (error) {
      setIsLoading(false);
    }
  }, [mutateRankReward, mutateRankRewardSig]);

  return useMemo(() => ({ mutateAsync, isLoading }), [isLoading, mutateAsync]);
}

export function useFetchRankMdblProof(address?: string) {
  return useQuery({
    queryKey: ['fetch_rank_mdbl_proof', address],
    queryFn: () => fetchRankMdblProof(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: !!address,
  });
}

export function useFetchRankMerlProof(address?: string) {
  return useQuery({
    queryKey: ['fetch_rank_merl_proof', address],
    queryFn: () => fetchRankMerlProof(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: !!address,
  });
}

export function useFetchMyRewards(address?: string) {
  return useQuery({
    queryKey: ['fetch-my-rewards', address],
    queryFn: () => fetchMyRewards(address!),
    select: (res) => {
      if (res.code === 200) {
        return res.data.reduce(
          (data, item) => ({
            ...data,
            [item.tokenName]: item,
          }),
          {} as Record<string, RankReward>,
        );
      }

      return null;
    },
    enabled: !!address,
  });
}

export function useFetchFundRewardClaim() {
  return useMutation({
    mutationFn(tokenName: string) {
      return fetchFundRewardClaim(tokenName);
    },
  });
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
