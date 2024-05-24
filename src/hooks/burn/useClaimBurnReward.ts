import { useCallback, useMemo } from 'react';
import { BatchBurnABI } from '@/abis';
import { useMainWriteContract } from '@/hooks/wallet';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { toast } from 'react-toastify';

export function useClaimBurnEMDBLReward() {
  const { batchBurn } = CONTRACT_ADDRESSES;
  const { writeContract, isLoading } = useMainWriteContract({
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
      toast.success('Claim succeeded');
    },
  });

  const write = useCallback(
    () => writeContract({ address: batchBurn, abi: BatchBurnABI, functionName: 'usersReceiveeMDBLRewards' }),
    [batchBurn, writeContract],
  );

  return useMemo(() => ({ isLoading, write }), [isLoading, write]);
}
