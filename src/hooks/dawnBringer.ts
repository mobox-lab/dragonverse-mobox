import { DawnBringerABI } from '@/abis';
import { ALLOW_CHAINS, DAWN_BRINGERS_ADDRESS } from '@/constants';
import { useEffect, useMemo } from 'react';
import { TransactionReceipt } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

type WriteContractProps = {
  onSuccess?: (data: TransactionReceipt) => void;
  onError?: (error: Error) => void;
};

export function useRewardClaim({ onSuccess, onError }: WriteContractProps = {}) {
  const { data, isPaused, writeContract, writeContractAsync } = useWriteContract();
  const {
    data: transaction,
    isLoading: isWaitLoading,
    status,
    error,
  } = useWaitForTransactionReceipt({
    hash: data,
    query: { enabled: !!data },
  });

  useEffect(() => {
    if (transaction) {
      onSuccess?.(transaction);
    }
  }, [onSuccess, transaction]);

  useEffect(() => {
    if (status === 'error') {
      onError?.(error);
    }
  }, [onError, status, error]);

  return useMemo(
    () => ({
      data,
      transaction,
      write: (args: any) =>
        writeContract({
          address: DAWN_BRINGERS_ADDRESS,
          abi: DawnBringerABI,
          functionName: 'whitelistMint',
          chainId: ALLOW_CHAINS[0].id,
          args,
        }),
      writeAsync: (args: any) =>
        writeContractAsync({
          address: DAWN_BRINGERS_ADDRESS,
          abi: DawnBringerABI,
          functionName: 'whitelistMint',
          chainId: ALLOW_CHAINS[0].id,
          args,
        }),
      isLoading: isPaused,
      isWaitLoading: isWaitLoading,
    }),
    [data, isPaused, isWaitLoading, transaction, writeContract, writeContractAsync],
  );
}
