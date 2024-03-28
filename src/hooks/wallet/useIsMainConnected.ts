import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';

export function useIsMainConnected() {
  const { address } = useAccount();
  const accessToken = useAtomValue(accessTokenAtom);
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);

  return useMemo(() => {
    if (!jwtPayload.address) return false;
    return jwtPayload.address === address;
  }, [address, jwtPayload.address]);
}
