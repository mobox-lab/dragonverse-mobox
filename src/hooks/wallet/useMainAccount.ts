import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue, useSetAtom } from 'jotai';
import { accessTokenAtom, evmAddressAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';
import { MainWalletType } from '@/constants/enum';
import { useIsMainConnected } from '@/hooks/wallet';

type MainAccount = {
  majorAddress?: string;
  evmAddress?: string;
  walletType?: MainWalletType;
};

export function useMainAccount(): MainAccount {
  const accessToken = useAtomValue(accessTokenAtom);
  const setEvmAddress = useSetAtom(evmAddressAtom);
  const { address } = useAccount();
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);
  const isMainConnected = useIsMainConnected();

  return useMemo(() => {
    if (!isMainConnected) return {};
    setEvmAddress(address);
    return {
      majorAddress: address,
      evmAddress: address,
      walletType: MainWalletType.EVM,
    };
  }, [address, isMainConnected, setEvmAddress]);
}
