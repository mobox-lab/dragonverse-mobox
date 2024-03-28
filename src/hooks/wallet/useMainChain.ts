import { useCallback, useMemo } from 'react';
import { ALLOW_CHAIN } from '@/constants';
import { MainWalletType } from '@/constants/enum';
import { useAccount, useSwitchChain } from 'wagmi';
import { useMainAccount } from '@/hooks/wallet';
import { useETHProvider } from '@particle-network/btc-connectkit';

export function useMainChain() {
  const { walletType } = useMainAccount();
  const { chain } = useAccount();
  const { chainId: btcChainId, switchChain } = useETHProvider();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useMemo(() => ALLOW_CHAIN, []);

  const isSupportedChain = useMemo(() => {
    if (!walletType) return true;
    if (walletType === MainWalletType.BTC) return btcChainId === ALLOW_CHAIN;
    if (walletType === MainWalletType.EVM) return chain?.id === ALLOW_CHAIN;
    return false;
  }, [btcChainId, chain?.id, walletType]);

  const switchMainChain = useCallback(async () => {
    if (walletType === MainWalletType.BTC) {
      await switchChain(ALLOW_CHAIN);
    } else if (walletType === MainWalletType.EVM) {
      await switchChainAsync({ chainId: ALLOW_CHAIN });
    }
  }, [switchChain, switchChainAsync, walletType]);

  return useMemo(() => ({ chainId, isSupportedChain, switchMainChain }), [chainId, isSupportedChain, switchMainChain]);
}
