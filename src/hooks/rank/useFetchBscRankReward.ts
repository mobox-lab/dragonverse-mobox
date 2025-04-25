import { useQuery } from '@tanstack/react-query';
import { fetchRankMoboxProof } from '@/apis';
import { Address } from 'viem';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useAccount, useReadContracts } from 'wagmi';
import { LeaderboardRewardsABI } from '@/abis/LeaderboardRewards';
import { useCallback, useMemo } from 'react';
import { useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { toast } from 'react-toastify';
import { formatNumber } from '@/utils';
import { AirdropProof } from '@/apis/types';

export function useReadBscLeaderboardRewards(address?: Address) {
  const chainId = ALLOW_CHAINS[1];
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
      claimedMobox: data?.[0].result?.[0] ?? 0n,
      isClaimPaused: data?.[1].result ?? true,
    }),
    [data],
  );
}

export function useFetchRankMoboxProof(address?: string) {
  return useQuery({
    queryKey: ['fetch_rank_mobox_proof', address],
    queryFn: () => fetchRankMoboxProof(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: !!address,
  });
}

export function useRankMoboxRewardClaim() {
  const { address } = useAccount();
  const { switchMainChain } = useMainChain();
  const { isBscChain } = useSelectedChain();
  const { writeContract, isLoading: writeLoading } = useMainWriteContract({
    onError: (error) => {
      if (error?.name === 'UserRejected') {
        return;
      }
      if (error?.name === 'EstimateGasExecutionError') {
        toast.error(error.message);
        return;
      }
      toast.error('Network error, please try again later');
    },
    onSuccess: (data) => {
      if (!data) return;
      const log = data[0];
      toast.success(`Claim ${formatNumber(log.args.amount)} Mobox succeeded`);
    },
  });

  const onClaimClick = useCallback(
    async (data: AirdropProof) => {
      if (!address) return;
      if (!isBscChain) {
        switchMainChain(ALLOW_CHAINS[1]).then();
        return;
      }
      writeContract({
        abi: LeaderboardRewardsABI,
        functionName: 'usersReceiveMERLRewards',
        args: [data.index + 1, data.amount, data.proof],
        address: CONTRACT_ADDRESSES.leaderboardRewards,
      }).then();
    },
    [address, isBscChain, switchMainChain, writeContract],
  );
  return useMemo(
    () => ({
      onClaimClick,
      isLoading: writeLoading,
    }),
    [onClaimClick, writeLoading],
  );
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
