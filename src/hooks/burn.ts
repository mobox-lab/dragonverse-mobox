import { MoboxGovernForgeABI } from '@/abis';
import { MOBOX_GOVERN_FORGE_ADDRESS } from '@/constants';
import { useEffect, useMemo } from 'react';
import { TransactionReceipt } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

type WriteContractProps = {
  proposalNum: number;
  onSuccess?: (data: TransactionReceipt) => void;
  onError?: (error: any) => void;
};

export function useBurnMobox({ proposalNum, onSuccess, onError }: WriteContractProps) {
  const { data, isPending, status, error, writeContract, writeContractAsync } = useWriteContract();
  const { data: transaction, isLoading: isWaitLoading } = useWaitForTransactionReceipt({
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
  }, [error, status, onError]);

  return useMemo(
    () => ({
      data,
      transaction,
      write: () =>
        writeContract({
          address: MOBOX_GOVERN_FORGE_ADDRESS,
          abi: MoboxGovernForgeABI,
          functionName: 'burnForProposal',
          args: [proposalNum],
        }),
      writeAsync: () =>
        writeContractAsync({
          address: MOBOX_GOVERN_FORGE_ADDRESS,
          abi: MoboxGovernForgeABI,
          functionName: 'burnForProposal',
          args: [proposalNum],
        }),
      isLoading: isPending,
      isWaitLoading: isWaitLoading,
    }),
    [data, isPending, isWaitLoading, proposalNum, transaction, writeContract, writeContractAsync],
  );
}
