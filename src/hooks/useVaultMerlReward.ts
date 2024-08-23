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
