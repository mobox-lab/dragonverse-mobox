import { useCallback, useMemo } from 'react';
import { useSignMessage } from 'wagmi';
import { useMainAccount } from '@/hooks/wallet';
import { MainWalletType } from '@/constants/enum';
import { useBTCProvider } from '@particle-network/btc-connectkit';

export function useMainSignMessage() {
  const { walletType } = useMainAccount();
  const { signMessage: singMessageWithBtc } = useBTCProvider();
  const { signMessageAsync: signMessageWithEvm } = useSignMessage();

  const signMessage = useCallback(
    async ({ message }: { message: string }) => {
      if (!walletType) return Promise.reject('NotConnectWallet');
      let signature = '';
      if (walletType === MainWalletType.EVM) {
        signature = await singMessageWithBtc(message);
      }
      if (walletType === MainWalletType.BTC) {
        signature = await signMessageWithEvm({ message });
      }
      return signature;
    },
    [signMessageWithEvm, singMessageWithBtc, walletType],
  );

  return useMemo(() => ({ signMessage }), [signMessage]);
}
