'use client';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useConfig } from 'wagmi';
import { defaultChainIdAtom } from '@/atoms/web3/state';

export function useDefaultChain() {
  const { chains } = useConfig();
  const setDefaultChainId = useSetAtom(defaultChainIdAtom);

  useEffect(() => {
    setDefaultChainId(chains[0]?.id);
  }, [chains, setDefaultChainId]);
}
