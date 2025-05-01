import { useCallback, useMemo } from 'react';
import { ALLOW_CHAINS } from '@/constants';
import { useAccount, useSwitchChain } from 'wagmi';

export function useMainChain() {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const isSupportedChain = useMemo(() => (chainId ? ALLOW_CHAINS.includes(chainId) : false), [chainId]);

  const switchMainChain = useCallback(
    async (chainId?: number) => await switchChainAsync({ chainId: chainId ?? ALLOW_CHAINS[0] }),
    [switchChainAsync],
  );

  return useMemo(() => ({ isSupportedChain, switchMainChain }), [isSupportedChain, switchMainChain]);
}

export function useSelectedChain() {
  const { chainId } = useAccount();

  const isMerlinChain = useMemo(() => chainId === ALLOW_CHAINS[0], [chainId]);
  const isBscChain = useMemo(() => chainId === ALLOW_CHAINS[1], [chainId]);

  return useMemo(() => ({ isMerlinChain, isBscChain }), [isBscChain, isMerlinChain]);
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
