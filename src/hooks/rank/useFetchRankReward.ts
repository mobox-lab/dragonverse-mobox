import { useCallback, useMemo, useState } from 'react';
import { Address } from 'viem';
import { useReadContracts } from 'wagmi';
import { ALLOW_CHAIN } from '@/constants';
import {
  fetchAirdropProof,
  fetchClaimRewardSignature,
  fetchRankMdblProof,
  fetchRankRewardBalance,
  fetchRankRewardClaim,
} from '@/apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LeaderboardRewardsABI } from '@/abis/LeaderboardRewards';

export function useReadLeaderboardRewards(address?: Address) {
  const chainId = ALLOW_CHAIN;
  const { leaderboardRewards } = CONTRACT_ADDRESSES;
  const { data } = useReadContracts({
    contracts: [
      {
        chainId,
        address: leaderboardRewards,
        abi: LeaderboardRewardsABI,
        functionName: 'getUserRewardsReceived',
        args: address ? [address] : undefined,
      },
      { chainId, address: leaderboardRewards, abi: LeaderboardRewardsABI, functionName: 'paused' },
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
