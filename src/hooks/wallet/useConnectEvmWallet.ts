import { useCallback, useMemo, useRef } from 'react';
import ReactGA from 'react-ga4';
import { watchAccount } from '@wagmi/core';
import { MainWalletType } from '@/constants/enum';
import { wagmiConfig } from '@/providers/wagmi-provider';
import { useMainAccount, useSignInWithEthereum } from '@/hooks/wallet';
import { Connector, useAccountEffect, useConnect, useDisconnect } from 'wagmi';

export function useConnectEvmWallet() {
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const unwatchAccount = useRef<() => void>();
  const { walletType, majorAddress } = useMainAccount();
  const { signInWithEthereum } = useSignInWithEthereum();

  const onEvmConnect = useCallback(
    async (connector: Connector) => {
      try {
        const { accounts } = await connectAsync({ connector });
        ReactGA.event({ category: 'merlin', action: 'connect_wallet', label: connector.name });
        const [address] = accounts;
        await signInWithEthereum(address);
      } catch (error: any) {
        if (error.name === 'ProviderNotFoundError') {
          if (connector.name === 'metaMask') {
            window.open('https://metamask.io/download', '_blank');
            return;
          }
          if (connector.name === 'OKX Wallet') {
            window.open('https://www.okx.com/web3', '_blank');
            return;
          }
          if (connector.name === 'TokenPocket') {
            window.open('https://www.tokenpocket.pro', '_blank');
            return;
          }
        }
        disconnect();
      }
    },
    [connectAsync, disconnect, signInWithEthereum],
  );

  useAccountEffect({
    onConnect() {
      unwatchAccount.current = watchAccount(wagmiConfig, {
        async onChange(data) {
          try {
            if (walletType === MainWalletType.EVM && majorAddress !== data.address && data.address) {
              await signInWithEthereum(data.address);
            }
          } catch (error) {
            disconnect();
          }
        },
      });
    },
    onDisconnect() {
      unwatchAccount.current?.();
    },
  });

  return useMemo(() => ({ onEvmConnect }), [onEvmConnect]);
}
