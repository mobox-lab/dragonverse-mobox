import { useCallback, useMemo } from 'react';
import instance from '@/apis/request';
import { useSetAtom } from 'jotai/index';
import { accessTokenAtom, mainWalletConnectDialogAtom } from '@/atoms';
import { useBTCProvider, useConnectModal } from '@particle-network/btc-connectkit';

export function useSignInWithBitcoin() {
  const { disconnect } = useConnectModal();
  const { signMessage } = useBTCProvider();
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setDialogOpen = useSetAtom(mainWalletConnectDialogAtom);

  const signInWithBitcoin = useCallback(
    async (address: string, publicKey: string) => {
      try {
        const signature = await signMessage('Sign in with Bitcoin to the app.');
        const token = '';
        // 'eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhENzE0NDY3M0YzMTE3YTk4MTU1ODIxMGYxZTkyNjdkMUY3MjgyNUJhIiwibm9uY2UiOiJIVWxJT3B0Q2lBaThucmw3UiIsInBsYXRmb3JtIjowLCJpYXQiOjE3MDY2NzAyNDksImV4cCI6MTcwNzI3NTA0OX0.pI_J3AJ2Y_g2K6PXZqJwKEV_ZPtSANLtKx6_SC5tOok';
        setAccessToken(token);
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        setDialogOpen(false);
      } catch (error) {
        disconnect();
      }
    },
    [disconnect, setAccessToken, setDialogOpen, signMessage],
  );

  return useMemo(() => ({ signInWithBitcoin }), [signInWithBitcoin]);
}
