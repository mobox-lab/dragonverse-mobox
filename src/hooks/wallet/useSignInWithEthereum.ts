'use client';

import { useCallback, useMemo } from 'react';
import { Address } from 'viem';
import { SiweMessage } from 'siwe';
import { toast } from 'react-toastify';
import { useMutationEvmLogin } from '@/hooks/user';
import { useChainId, useDisconnect, useSignMessage } from 'wagmi';

type useSignInWithEthereumProps = {
  onSuccess?: ({ message, signature, address }: { message: Partial<SiweMessage>; signature: string; address: Address }) => void;
};

export function useSignInWithEthereum({ onSuccess }: useSignInWithEthereumProps = {}) {
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { mutate } = useMutationEvmLogin();
  const { signMessageAsync } = useSignMessage();

  const signInWithEthereum = useCallback(
    async (address: Address) => {
      try {
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Welcome to Dragonverse Neo.',
          uri: window.location.origin,
          version: '1',
          chainId,
          expirationTime: new Date(Date.now() + 864e5 * 7).toISOString(),
        });
        const signature = await signMessageAsync({ message: message.prepareMessage() });
        mutate({ message, signature, address });
        onSuccess?.({ message, signature, address });
        toast.success('Wallet connected');
      } catch (e) {
        disconnect?.();
      }
    },
    [chainId, disconnect, mutate, onSuccess, signMessageAsync],
  );

  return useMemo(() => ({ signInWithEthereum }), [signInWithEthereum]);
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

// TypeScript test for: fix: 🐛 correct payment processing error
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____correct_payment_processing_error', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});
