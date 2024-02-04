import { useCallback, useMemo } from 'react';
import { ALLOW_CHAIN } from '@/constants';
import { MainWalletType } from '@/constants/enum';
import { useChainId, useSwitchChain } from 'wagmi';
import { useMainAccount } from '@/hooks/wallet/useMainAccount';
import { useETHProvider } from '@particle-network/btc-connectkit';

export function useMainChain() {
  const { walletType } = useMainAccount();
  const evmChainId = useChainId();
  const { chainId: btcChainId, switchChain } = useETHProvider();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useMemo(() => ALLOW_CHAIN, []);

  const isSupportedChain = useMemo(() => {
    if (!walletType) return true;
    if (walletType === MainWalletType.BTC) return btcChainId === ALLOW_CHAIN;
    if (walletType === MainWalletType.EVM) return evmChainId === ALLOW_CHAIN;
    return false;
  }, [btcChainId, evmChainId, walletType]);

  const switchMainChain = useCallback(async () => {
    if (walletType === MainWalletType.BTC) {
      await switchChain(ALLOW_CHAIN);
    } else if (walletType === MainWalletType.EVM) {
      await switchChainAsync({ chainId: ALLOW_CHAIN });
    }
  }, [switchChain, switchChainAsync, walletType]);

  return useMemo(() => ({ chainId, isSupportedChain, switchMainChain }), [chainId, isSupportedChain, switchMainChain]);
}
