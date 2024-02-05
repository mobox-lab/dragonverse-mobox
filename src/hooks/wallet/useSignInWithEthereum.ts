'use client';

import { useCallback, useMemo } from 'react';
import { Address } from 'viem';
import { SiweMessage } from 'siwe';
import { Platform } from '@/constants/enum';
import { useMutationLogin } from '@/hooks/user';
import { useChainId, useDisconnect, useSignMessage } from 'wagmi';

type useSignInWithEthereumProps = {
  onSuccess?: ({ message, signature, address }: { message: Partial<SiweMessage>; signature: string; address: Address }) => void;
};

export function useSignInWithEthereum({ onSuccess }: useSignInWithEthereumProps = {}) {
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { mutate } = useMutationLogin();
  const { signMessageAsync } = useSignMessage();

  const signInWithEthereum = useCallback(
    async (address: Address) => {
      try {
        const message = new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          expirationTime: new Date(Date.now() + 864e5 * 7).toISOString(),
        });
        const signature = await signMessageAsync({ message: message.prepareMessage() });
        mutate({ message, signature, address, platform: Platform.USER });
        onSuccess?.({ message, signature, address });
      } catch (e) {
        disconnect?.();
      }
    },
    [chainId, disconnect, mutate, onSuccess, signMessageAsync],
  );

  return useMemo(() => ({ signInWithEthereum }), [signInWithEthereum]);
}
