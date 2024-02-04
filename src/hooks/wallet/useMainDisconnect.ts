import { useDisconnect } from 'wagmi';
import { useConnectModal } from '@particle-network/btc-connectkit';
import { useCallback, useMemo } from 'react';

export function useMainDisconnect() {
  const { disconnect: evmDisconnect } = useDisconnect();
  const { disconnect: btcDisconnect } = useConnectModal();

  const mainDisconnect = useCallback(() => {
    evmDisconnect?.();
    btcDisconnect?.();
  }, [btcDisconnect, evmDisconnect]);

  return useMemo(
    () => ({
      evmDisconnect,
      btcDisconnect,
      mainDisconnect,
    }),
    [btcDisconnect, evmDisconnect, mainDisconnect],
  );
}
