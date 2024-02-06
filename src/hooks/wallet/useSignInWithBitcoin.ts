'use client';

import { useCallback, useMemo } from 'react';
import { useMutationBtcLogin } from '@/hooks/user';
import { useBTCProvider, useConnectModal } from '@particle-network/btc-connectkit';

export function useSignInWithBitcoin() {
  const { disconnect } = useConnectModal();
  const { signMessage } = useBTCProvider();
  const { mutate } = useMutationBtcLogin();

  const signInWithBitcoin = useCallback(
    async (address: string, publicKey: string) => {
      try {
        const message = 'Sign in with Bitcoin to the app.';
        const signature = await signMessage('Sign in with Bitcoin to the app.');
        mutate({ message, signature, address, publicKey });
      } catch (error) {
        disconnect();
      }
    },
    [disconnect, mutate, signMessage],
  );

  return useMemo(() => ({ signInWithBitcoin }), [signInWithBitcoin]);
}
