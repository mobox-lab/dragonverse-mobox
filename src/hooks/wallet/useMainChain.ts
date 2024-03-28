import { useCallback, useMemo } from 'react';
import { ALLOW_CHAIN } from '@/constants';
import { useAccount, useSwitchChain } from 'wagmi';

export function useMainChain() {
  const { chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useMemo(() => ALLOW_CHAIN, []);

  const isSupportedChain = useMemo(() => {
    return chain?.id === ALLOW_CHAIN;
  }, [chain?.id]);

  const switchMainChain = useCallback(async () => {
    await switchChainAsync({ chainId: ALLOW_CHAIN });
  }, [switchChainAsync]);

  return useMemo(() => ({ chainId, isSupportedChain, switchMainChain }), [chainId, isSupportedChain, switchMainChain]);
}
