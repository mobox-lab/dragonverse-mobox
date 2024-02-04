'use client';
import { ALLOW_CHAINS } from '@/constants';
import { useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';

export const useCorrectNetwork = () => {
  const { isConnected, chain } = useAccount();

  const isCorrectNetwork = useMemo(() => isConnected && chain && ALLOW_CHAINS[0].id === chain.id, [chain, isConnected]);

  const { switchChain } = useSwitchChain();

  return { isCorrectNetwork, switchNetwork: () => switchChain({ chainId: ALLOW_CHAINS[0].id }) };
};
