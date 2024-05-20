import { useCallback, useMemo } from 'react';
import { BatchBurnABI } from '@/abis';
import { useMainWriteContract } from '@/hooks/wallet';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';

export function useClaimBurnEMDBLReward() {
  const { batchBurn } = CONTRACT_ADDRESSES;
  const { writeContract, isLoading } = useMainWriteContract();

  const write = useCallback(
    () => writeContract({ address: batchBurn, abi: BatchBurnABI, functionName: 'usersReceiveeMDBLRewards' }),
    [batchBurn, writeContract],
  );

  return useMemo(() => ({ isLoading, write }), [isLoading, write]);
}
