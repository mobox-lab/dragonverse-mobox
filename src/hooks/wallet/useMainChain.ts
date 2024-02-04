import { ALLOW_CHAIN } from '@/constants';
import { useMainAccount } from '@/hooks/wallet/useMainAccount';
import { useChainId, useSwitchChain } from 'wagmi';
import { useETHProvider } from '@particle-network/btc-connectkit';
import { useCallback, useMemo } from 'react';
import { MainWalletType } from '@/constants/enum';

export function useMainChain() {
  const { walletType } = useMainAccount();
  const evmChainId = useChainId();
  const { chainId: btcChainId, switchChain } = useETHProvider();
  const { switchChainAsync } = useSwitchChain();

  const isSupportedChain = useMemo(() => {
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

  return useMemo(() => ({ isSupportedChain, switchMainChain }), [isSupportedChain, switchMainChain]);
}
