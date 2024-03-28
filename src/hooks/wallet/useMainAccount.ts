import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue, useSetAtom } from 'jotai';
import { accessTokenAtom, evmAddressAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';
import { MainWalletType } from '@/constants/enum';
import { useIsMainConnected } from '@/hooks/wallet';
import { useBTCProvider, useETHProvider } from '@particle-network/btc-connectkit';
import { Address } from 'viem';

type MainAccount = {
  majorAddress?: string;
  minorAddress?: string;
  btcAddress?: string;
  aaAddress?: string;
  evmAddress?: string;
  walletType?: MainWalletType;
};

export function useMainAccount(): MainAccount {
  const accessToken = useAtomValue(accessTokenAtom);
  const setEvmAddress = useSetAtom(evmAddressAtom);
  const { accounts } = useBTCProvider();
  const { evmAccount } = useETHProvider();
  const { address } = useAccount();
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);
  const isMainConnected = useIsMainConnected();

  return useMemo(() => {
    if (!isMainConnected) return {};
    if (jwtPayload.address === address) {
      setEvmAddress(address);
      return {
        majorAddress: address,
        minorAddress: accounts[0],
        btcAddress: accounts[0],
        aaAddress: evmAccount,
        evmAddress: address,
        walletType: MainWalletType.EVM,
      };
    }

    if (jwtPayload.address === evmAccount) {
      setEvmAddress(evmAccount as Address);
      return {
        majorAddress: accounts[0],
        minorAddress: address,
        btcAddress: accounts[0],
        aaAddress: evmAccount,
        evmAddress: evmAccount,
        walletType: MainWalletType.BTC,
      };
    }
    return {};
  }, [accounts, address, evmAccount, isMainConnected, jwtPayload.address, setEvmAddress]);
}
