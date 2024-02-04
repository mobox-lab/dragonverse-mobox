'use client';
import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { SiweMessage } from 'siwe';
import { useChainId, useDisconnect, useSignMessage } from 'wagmi';
import { isSSOLoginLoadingAtom } from '@/atoms/user/state';
import { Address } from 'viem';

type useSignInWithEthereumProps = {
  onSuccess?: ({ message, signature, address }: { message: Partial<SiweMessage>; signature: string; address: Address }) => void;
};

export function useSignInWithEthereum({ onSuccess }: useSignInWithEthereumProps) {
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const setSSOLoading = useSetAtom(isSSOLoginLoadingAtom);

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
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });
        setSSOLoading(true);
        onSuccess?.({ message, signature, address });
      } catch (e) {
        disconnect?.();
        console.error(e);
        setSSOLoading(false);
      }
    },
    [chainId, disconnect, onSuccess, setSSOLoading, signMessageAsync],
  );
  return useMemo(() => ({ signInWithEthereum }), [signInWithEthereum]);
}
