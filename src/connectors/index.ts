'use client';

import { injected } from '@wagmi/core';
import { walletConnect } from '@wagmi/connectors';

export const metaMaskConnector = injected({ target: 'metaMask' });

export const walletConnectConnector = walletConnect({ projectId: '8cae2b92fbf20aa5df6f47a23fc1483f' });

export const tokenPocketConnector = injected({
  target: () => ({
    id: 'TokenPocket',
    name: 'TokenPocket',
    provider: () => {
      if (typeof window !== 'undefined' && window.ethereum?.isTokenPocket) return window.ethereum;
    },
  }),
});
