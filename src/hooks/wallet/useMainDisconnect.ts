import { useCallback, useMemo } from 'react';
import { useSetAtom } from 'jotai';
import { useDisconnect } from 'wagmi';
import { accessTokenAtom } from '@/atoms';

export function useMainDisconnect() {
  const setAccessTokenAtom = useSetAtom(accessTokenAtom);
  const { disconnect: evmDisconnect } = useDisconnect();

  const mainDisconnect = useCallback(() => {
    evmDisconnect?.();
    setAccessTokenAtom('');
  }, [evmDisconnect, setAccessTokenAtom]);

  return useMemo(
    () => ({
      evmDisconnect,
      mainDisconnect,
    }),
    [evmDisconnect, mainDisconnect],
  );
}
