import { BatchBurnABI } from '@/abis';
import { ALLOW_CHAIN } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useReadContracts } from 'wagmi';
import { useMainAccount } from '../wallet';
import { MDragonBallABI } from '@/abis/MDragonBall';

export function useBurnContractRead() {
  const chainId = ALLOW_CHAIN;
  const { batchBurn, mDragonBall } = CONTRACT_ADDRESSES;
  const { evmAddress } = useMainAccount();
  const { data } = useReadContracts({
    contracts: [
      { address: batchBurn, abi: BatchBurnABI, functionName: 'getTotalBurnAmount', chainId },
      { address: batchBurn, abi: BatchBurnABI, functionName: 'getReceiveOpen', chainId },
    ],
    query: { refetchInterval: 6_000 },
  });

  const { data: userData } = useReadContracts({
    contracts: [
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'getUserBurnLength',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: mDragonBall,
        abi: MDragonBallABI,
        functionName: 'isApprovedForAll',
        args: evmAddress ? [evmAddress as Address, batchBurn] : undefined,
      },
      {
        chainId,
        address: mDragonBall,
        abi: MDragonBallABI,
        functionName: 'balanceOf',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'getUserTokenIdList',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'isClaimed', // eMDBL isClaim
        args: evmAddress ? [evmAddress as Address, 0n] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'getUsereMDBLRewardData',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
    ],
    query: { refetchInterval: 6_000, enabled: !!evmAddress },
  });

  return useMemo(() => {
    return {
      totalBurn: data?.[0].result ?? 0n,
      userBurn: userData?.[0].result ?? 0n,
      isApprovedForAll: userData?.[1].result ?? false,
      balance: userData?.[2].result ?? 0n,
      tokenIds: userData?.[3].result ?? [],
      isReceiveOpen: data?.[1].result ?? false,
      isEMDBLClaim: userData?.[4].result ?? false,
      userReward: userData?.[5].result ?? [0n, 0n, 0n, 0n, 0n],
    };
  }, [userData, data]);
}
