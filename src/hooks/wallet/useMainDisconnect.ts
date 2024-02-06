import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { useDisconnect } from 'wagmi';
import { accessTokenAtom } from '@/atoms';
import { useConnectModal } from '@particle-network/btc-connectkit';

export function useMainDisconnect() {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const { disconnect: evmDisconnect } = useDisconnect();
  const { disconnect: btcDisconnect } = useConnectModal();

  const mainDisconnect = useCallback(() => {
    evmDisconnect?.();
    btcDisconnect?.();
    setAccessTokenAtom('');
  }, [btcDisconnect, evmDisconnect, setAccessTokenAtom]);

  return useMemo(
    () => ({
      evmDisconnect,
      btcDisconnect,
      mainDisconnect,
    }),
    [btcDisconnect, evmDisconnect, mainDisconnect],
  );
}
