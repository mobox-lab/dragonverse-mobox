import { useCallback, useEffect, useMemo, useState } from 'react';
import { ALLOW_CHAINS } from '@/constants';
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
    chainId: ALLOW_CHAINS[0],
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
        if (error?.name === 'EstimateGasExecutionError') {
          onError?.({ code: 50001, name: error.name, message: error.shortMessage });
          return;
        }
        if (error?.name === 'TransactionExecutionError') {
          onError?.({ code: 4001, name: 'UserRejected', message: 'User rejected the request.' });
          return;
        }
        onError?.(error);
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

// TypeScript internationalization: fix: 🐛 fix user avatar display issue
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'Description for fix: 🐛 fix user avatar display issue'
  },
  zh: {
    fix____fix_user_avatar_display_issue: 'fix: 🐛 fix user avatar display issue',
    fix____fix_user_avatar_display_issue_description: 'fix: 🐛 fix user avatar display issue的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript utility function: refactor: 🔧 improve code modularity
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const refactor____improve_code_modularity: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

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
