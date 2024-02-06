import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';
import { MainWalletType } from '@/constants/enum';
import { useIsMainConnected } from '@/hooks/wallet/useIsMainConnected';
import { useBTCProvider, useETHProvider } from '@particle-network/btc-connectkit';

type MainAccount = {
  majorAddress?: string;
  minorAddress?: string;
  btcAddress?: string;
  aaAddress?: string;
  walletType?: MainWalletType;
};

export function useMainAccount(): MainAccount {
  const accessToken = useAtomValue(accessTokenAtom);
  const { accounts } = useBTCProvider();
  const { evmAccount } = useETHProvider();
  const { address } = useAccount();
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);
  const isMainConnected = useIsMainConnected();

  return useMemo(() => {
    if (!isMainConnected) return {};
    if (jwtPayload.address === address) {
      return {
        majorAddress: address,
        minorAddress: accounts[0],
        btcAddress: accounts[0],
        aaAddress: evmAccount,
        walletType: MainWalletType.EVM,
      };
    }

    if (jwtPayload.address === evmAccount) {
      return {
        majorAddress: accounts[0],
        minorAddress: address,
        btcAddress: accounts[0],
        aaAddress: evmAccount,
        walletType: MainWalletType.BTC,
      };
    }
    return {};
  }, [accounts, address, evmAccount, isMainConnected, jwtPayload.address]);
}
