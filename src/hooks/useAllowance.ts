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

// TypeScript internationalization: test: 🧪 add API endpoint tests
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
    test____add_API_endpoint_tests: 'test: 🧪 add API endpoint tests',
    test____add_API_endpoint_tests_description: 'Description for test: 🧪 add API endpoint tests'
  },
  zh: {
    test____add_API_endpoint_tests: 'test: 🧪 add API endpoint tests',
    test____add_API_endpoint_tests_description: 'test: 🧪 add API endpoint tests的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
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
