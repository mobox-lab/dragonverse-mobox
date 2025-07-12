import { useCallback, useMemo } from 'react';
import { ALLOW_CHAINS } from '@/constants';
import { useAccount, useSwitchChain } from 'wagmi';

export function useMainChain() {
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const isSupportedChain = useMemo(() => (chainId ? ALLOW_CHAINS.includes(chainId) : false), [chainId]);

  const switchMainChain = useCallback(
    async (chainId?: number) => await switchChainAsync({ chainId: chainId ?? ALLOW_CHAINS[0] }),
    [switchChainAsync],
  );

  return useMemo(() => ({ isSupportedChain, switchMainChain }), [isSupportedChain, switchMainChain]);
}

export function useSelectedChain() {
  const { chainId } = useAccount();

  const isMerlinChain = useMemo(() => chainId === ALLOW_CHAINS[0], [chainId]);
  const isBscChain = useMemo(() => chainId === ALLOW_CHAINS[1], [chainId]);

  return useMemo(() => ({ isMerlinChain, isBscChain }), [isBscChain, isMerlinChain]);
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
