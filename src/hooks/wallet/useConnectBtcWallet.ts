import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { termOfUseAcceptedAtom } from '@/atoms';
import { MainWalletType } from '@/constants/enum';
import { useSignInWithBitcoin, useMainAccount } from '@/hooks/wallet';
import { useBTCProvider, useConnectModal, useConnector } from '@particle-network/btc-connectkit';

export function useConnectBtcWallet() {
  const { disconnect } = useConnectModal();
  const { connect } = useConnector();
  const [isConnect, setIsConnect] = useState<number>(0);
  const { accounts, getPublicKey, getNetwork, switchNetwork } = useBTCProvider();
  const { signInWithBitcoin } = useSignInWithBitcoin();
  const { walletType, majorAddress } = useMainAccount();
  const account = useMemo(() => accounts[0], [accounts]);
  const isAccepted = useAtomValue(termOfUseAcceptedAtom);

  const onBtcConnect = useCallback(
    async (id: string) => {
      if (!isAccepted) {
        toast.error('Please read and agree to the Terms of Use');
        return;
      }
      try {
        await connect(id);
        ReactGA.event({ category: 'merlin', action: 'connect_wallet', label: id });
        setIsConnect((c) => c + 1);
      } catch (error: any) {
        const message = error.message;
        if (message.indexOf('Unisat Wallet is not install') > -1) {
          window.open('https://unisat.io/download', '_blank');
          return;
        }
        if (message.indexOf('OKX Wallet is not install') > -1) {
          window.open('https://www.okx.com/cn/web3', '_blank');
          return;
        }
        if (message.indexOf('Bitget Wallet is not install') > -1) {
          window.open('https://web3.bitget.com/en', '_blank');
          return;
        }
        disconnect();
      }
    },
    [connect, disconnect, isAccepted],
  );

  const onSignIn = useCallback(
    async (account: string) => {
      try {
        const network = await getNetwork();
        if (network === 'testnet') {
          await switchNetwork('livenet');
          setIsConnect((c) => c + 1);
          return;
        }
        const publicKey = await getPublicKey();
        await signInWithBitcoin(account, publicKey);
      } catch (error) {
        disconnect();
      }
    },
    [disconnect, getNetwork, getPublicKey, signInWithBitcoin, switchNetwork],
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
