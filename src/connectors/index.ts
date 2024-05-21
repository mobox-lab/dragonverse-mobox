'use client';

import { injected } from '@wagmi/core';
import { walletConnect } from '@wagmi/connectors';

export const metaMaskConnector = injected({ target: 'metaMask' });

export const okxConnector = injected({
  target: () => ({
    id: 'OKXWallet',
    name: 'OKX Wallet',
    provider: () => {
      if (typeof window !== 'undefined') return window.okxwallet;
    },
  }),
});

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

export const trustWalletConnector = injected({
  target: () => ({
    id: 'TrustWallet',
    name: 'TrustWallet',
    provider: () => {
      if (typeof window !== 'undefined') return window.trustwallet;
    },
  }),
});
