import { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useSetAtom } from 'jotai';
import { evmAddressAtom } from '@/atoms';
import { MainWalletType } from '@/constants/enum';
import { useIsMainConnected } from '@/hooks/wallet';

type MainAccount = {
  majorAddress?: string;
  evmAddress?: string;
  walletType?: MainWalletType;
};

export function useMainAccount(): MainAccount {
  const setEvmAddress = useSetAtom(evmAddressAtom);
  const { address } = useAccount();
  const isMainConnected = useIsMainConnected();

  useEffect(() => {
    setEvmAddress(address);
  }, [address, setEvmAddress]);

  return useMemo(() => {
    if (!isMainConnected) return {};
    return {
      majorAddress: address,
      evmAddress: address,
      walletType: MainWalletType.EVM,
    };
  }, [address, isMainConnected]);
}
