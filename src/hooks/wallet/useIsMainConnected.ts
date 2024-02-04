import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';
import { useETHProvider } from '@particle-network/btc-connectkit';

export function useIsMainConnected() {
  const { address } = useAccount();
  const { evmAccount } = useETHProvider();
  const accessToken = useAtomValue(accessTokenAtom);
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);

  return useMemo(
    () => jwtPayload.address === evmAccount || jwtPayload.address === address,
    [address, evmAccount, jwtPayload.address],
  );
}
