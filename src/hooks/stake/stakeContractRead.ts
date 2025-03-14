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
