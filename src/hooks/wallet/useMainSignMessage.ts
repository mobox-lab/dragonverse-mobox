import { useCallback, useMemo } from 'react';
import { useSignMessage } from 'wagmi';
import { useMainAccount } from '@/hooks/wallet';

export function useMainSignMessage() {
  const { walletType } = useMainAccount();
  const { signMessageAsync: signMessageWithEvm } = useSignMessage();

  const signMessage = useCallback(
    async ({ message }: { message: string }) => {
      if (!walletType) return Promise.reject('NotConnectWallet');
      return await signMessageWithEvm({ message });
    },
    [signMessageWithEvm, walletType],
  );

  return useMemo(() => ({ signMessage }), [signMessage]);
}
