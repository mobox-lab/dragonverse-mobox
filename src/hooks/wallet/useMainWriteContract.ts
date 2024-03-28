import { useCallback, useEffect, useMemo, useState } from 'react';
import { ALLOW_CHAIN } from '@/constants';
import { useMainAccount } from '@/hooks/wallet';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { Address, encodeFunctionData, Hash, parseEventLogs } from 'viem';

type WriteContractProps = {
  abi: readonly any[];
  functionName: string;
  args?: any;
  address: Address;
  value?: bigint;
};

type MainWriteContractProps = {
  onError?: (error: any) => void;
  onSuccess?: (data: any[]) => void;
};

export function useMainWriteContract({ onError, onSuccess }: MainWriteContractProps = {}) {
  const { sendTransactionAsync } = useSendTransaction();
  const { walletType } = useMainAccount();
  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [abi, setABI] = useState<readonly any[] | undefined>(undefined);
  const [txHash, setTxHash] = useState<Hash | undefined>(undefined);
  const {
    data: transaction,
    isLoading: isConfirming,
    error,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: ALLOW_CHAIN,
  });

  useEffect(() => {
    if (error) {
      onError?.({ code: 5002, name: 'TransactionFailed', message: 'user contract transaction error' });
      setTxHash(undefined);
      return;
    }
    if (transaction && abi) {
      onSuccess?.(parseEventLogs({ abi, logs: transaction.logs }));
      setTxHash(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, transaction, walletType]);

  const isLoading = useMemo(() => isTxLoading || isConfirming, [isTxLoading, isConfirming]);

  const writeContract = useCallback(
    async ({ abi, functionName, args, address, value }: WriteContractProps) => {
      if (!walletType) return Promise.reject('NotConnectWallet');
      const data = encodeFunctionData({ abi, functionName, args });
      let hash = '';
      setABI(abi);
      try {
        setIsTxLoading(true);
        hash = await sendTransactionAsync({ data, to: address, value });
        setTxHash(hash as Hash);
        setIsTxLoading(false);
      } catch (error: any) {
        setIsTxLoading(false);
        setTxHash(undefined);
        if (error?.shortMessage === 'User rejected the request.' || error?.message === 'The user rejected the request.') {
          onError?.({ code: 4001, name: 'UserRejected', message: 'User rejected the request.' });
        } else {
          onError?.(error);
        }
      }
      return hash;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendTransactionAsync, walletType],
  );

  return useMemo(
    () => ({
      writeContract,
      hash: txHash,
      transaction,
      isLoading,
    }),
    [isLoading, transaction, txHash, writeContract],
  );
}
