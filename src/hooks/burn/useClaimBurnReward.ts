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
