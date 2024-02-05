import { useCallback, useMemo, useRef } from 'react';
import { watchAccount } from '@wagmi/core';
import { MainWalletType } from '@/constants/enum';
import { wagmiConfig } from '@/providers/wagmi-provider';
import { useMainAccount } from '@/hooks/wallet/useMainAccount';
import { useSignInWithEthereum } from '@/hooks/wallet/useSignInWithEthereum';
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
        const [address] = accounts;
        await signInWithEthereum(address);
      } catch (error) {
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
