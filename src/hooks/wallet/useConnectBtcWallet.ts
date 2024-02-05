import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBTCProvider, useConnectModal, useConnector } from '@particle-network/btc-connectkit';
import { useSignInWithBitcoin } from '@/hooks/wallet/useSignInWithBitcoin';
import { useMainAccount } from '@/hooks/wallet/useMainAccount';
import { MainWalletType } from '@/constants/enum';

export function useConnectBtcWallet() {
  const { disconnect } = useConnectModal();
  const { connect } = useConnector();
  const [isConnect, setIsConnect] = useState<number>(0);
  const { accounts, getPublicKey } = useBTCProvider();
  const { signInWithBitcoin } = useSignInWithBitcoin();
  const { walletType, majorAddress } = useMainAccount();
  const account = useMemo(() => accounts[0], [accounts]);

  const onBtcConnect = useCallback(
    async (id: string) => {
      try {
        await connect(id);
        setIsConnect((c) => c + 1);
      } catch (error) {
        disconnect();
      }
    },
    [connect, disconnect],
  );

  const onSignIn = useCallback(
    async (account: string) => {
      try {
        const publicKey = await getPublicKey();
        await signInWithBitcoin(account, publicKey);
      } catch (error) {
        disconnect();
      }
    },
    [disconnect, getPublicKey, signInWithBitcoin],
  );

  useEffect(() => {
    if (walletType === MainWalletType.BTC) {
      setIsConnect((c) => c + 1);
    }
  }, [walletType]);

  useEffect(() => {
    if (!isConnect || !account || majorAddress === account) return;
    onSignIn(account).then();
  }, [account, isConnect, majorAddress, onSignIn]);

  return useMemo(() => ({ onBtcConnect }), [onBtcConnect]);
}
