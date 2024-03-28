'use client';

import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useMutationBtcLogin } from '@/hooks/user';
import { useBTCProvider, useConnectModal } from '@particle-network/btc-connectkit';

export function useSignInWithBitcoin() {
  const { disconnect } = useConnectModal();
  const { signMessage } = useBTCProvider();
  const { mutate } = useMutationBtcLogin();

  const signInWithBitcoin = useCallback(
    async (address: string, publicKey: string) => {
      try {
        const message = 'Welcome to Dragonverse Neo.';
        const signature = await signMessage(message);
        mutate({ message, signature, address, publicKey });
        toast.success('Wallet connected');
      } catch (error) {
        disconnect();
      }
    },
    [disconnect, mutate, signMessage],
  );

  return useMemo(() => ({ signInWithBitcoin }), [signInWithBitcoin]);
}
