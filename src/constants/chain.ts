import { arbitrum, arbitrumGoerli, bsc, bscTestnet } from 'wagmi/chains';

export const CHAIN_CONFIG: Record<number, { icon?: string; name?: string }> = {
  [bsc.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Chain',
  },
  [bscTestnet.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Test Chain',
  },
  [arbitrum.id]: {
    icon: '/svg/chains/arbitrum.svg',
    name: 'Arbitrum One',
  },
  [arbitrumGoerli.id]: {
    icon: '/svg/chains/arbitrum.svg',
    name: 'Arbitrum Goerli',
  },
};
