import { MaxUint256 } from 'ethers';
import { useEffect, useMemo } from 'react';
import { Address, erc20Abi, TransactionReceipt } from 'viem';
import { useReadContract, useTransactionReceipt, useWriteContract } from 'wagmi';

type TokenAllowanceParams = {
  token?: Address;
  owner?: Address;
  spender?: Address;
  chainId?: number;
  watch?: boolean;
};

export function useTokenAllowance(params: TokenAllowanceParams): [bigint | undefined, (() => Promise<any>) | undefined] {
  const { token, owner, spender, chainId, watch = false } = params;
  const { data: allowance, refetch } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: owner && spender ? [owner, spender] : undefined,
    query: {
      enabled: !!token && !!owner && !!spender,
      refetchInterval: watch ? 6_000 : undefined,
    },
    chainId,
  });

  return useMemo(
    () => (token && allowance !== undefined ? [allowance, refetch] : [undefined, undefined]),
    [token, allowance, refetch],
  );
}

type ApproveTokenProps = {
  token?: Address;
  spender?: Address;
  onSuccess?: (data: TransactionReceipt) => void;
  onError?: (error: Error) => void;
};

export function useApproveToken({ token, spender, onError, onSuccess }: ApproveTokenProps) {
  const { data, writeContract, isPending, writeContractAsync } = useWriteContract();
  const {
    data: transaction,
    error,
    status,
    isLoading: isWaitLoading,
  } = useTransactionReceipt({
    hash: data,
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
  }, [error, onError, status]);

  return useMemo(
    () => ({
      data,
      transaction,
      write: () => {
        if (!token || !spender) return;
        return writeContract({
          address: token,
          abi: erc20Abi,
          functionName: 'approve',
          args: [spender, MaxUint256],
        });
      },
      writeAsync: () => {
        if (!token || !spender) return;
        return writeContractAsync({
          address: token,
          abi: erc20Abi,
          functionName: 'approve',
          args: [spender, MaxUint256],
        });
      },
      isLoading: isPending,
      isWaitLoading: isWaitLoading,
    }),
    [data, isPending, isWaitLoading, spender, token, transaction, writeContract, writeContractAsync],
  );
}
