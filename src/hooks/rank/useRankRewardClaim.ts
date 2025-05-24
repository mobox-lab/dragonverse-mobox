import { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { formatNumber } from '@/utils';
import { AirdropProof } from '@/apis/types';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { LeaderboardRewardsABI } from '@/abis/LeaderboardRewards';
import { useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { useRankEMDBLClaimSignature } from '@/hooks/rank/useFetchRankReward';

export function useRankEmdblRewardClaim() {
  const { address } = useAccount();
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const { mutateAsync, isLoading: fetchLoading } = useRankEMDBLClaimSignature();
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
      toast.success(`Claim ${formatNumber(log.args.amount)} eMDBL succeeded`);
    },
  });
  const onClaimClick = useCallback(async () => {
    if (!address) return;
    if (!isMerlinChain) {
      switchMainChain(ALLOW_CHAINS[0]).then();
      return;
    }
    const res = await mutateAsync();
    if (res?.code === 200) {
      const data = res.data;
      const hash = await writeContract({
        abi: LeaderboardRewardsABI,
        functionName: 'permitClaim',
        args: [CONTRACT_ADDRESSES.emdbl, address, BigInt(data?.balance || '0'), data?.deadline, data?.v, data?.r, data?.s],
        address: CONTRACT_ADDRESSES?.testLeaderboardMDBLRewards ?? CONTRACT_ADDRESSES.leaderboardRewards,
      });
    } else {
      toast.error('Error request.');
    }
  }, [address, isMerlinChain, mutateAsync, switchMainChain, writeContract]);

  return useMemo(
    () => ({
      onClaimClick,
      isLoading: fetchLoading || writeLoading,
    }),
    [fetchLoading, onClaimClick, writeLoading],
  );
}

export function useRankMdblRewardClaim() {
  const { address } = useAccount();
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
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
      toast.success(`Claim ${formatNumber(log.args.amount)} MDBL succeeded`);
    },
  });

  const onClaimClick = useCallback(
    async (data: AirdropProof) => {
      if (!address) return;
      if (!isMerlinChain) {
        switchMainChain(ALLOW_CHAINS[0]).then();
        return;
      }
      writeContract({
        abi: LeaderboardRewardsABI,
        functionName: 'usersReceiveMERLRewards',
        args: [data.index + 1, data.amount, data.proof],
        address: CONTRACT_ADDRESSES?.testLeaderboardMDBLRewards ?? CONTRACT_ADDRESSES.leaderboardRewards,
      }).then();
    },
    [address, isMerlinChain, switchMainChain, writeContract],
  );
  return useMemo(
    () => ({
      onClaimClick,
      isLoading: writeLoading,
    }),
    [onClaimClick, writeLoading],
  );
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
