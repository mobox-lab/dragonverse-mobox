import { bsc, bscTestnet } from 'wagmi/chains';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';

export const CHAIN_CONFIG: Record<number, { icon?: string; name?: string }> = {
  [bsc.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Chain',
  },
  [bscTestnet.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Test Chain',
  },
  [merlinMainnet.id]: {
    icon: '/img/merlin-chain.png',
    name: 'Merlin Mainnet',
  },
  [merlinTestnet.id]: {
    icon: '/img/merlin-chain.png',
    name: 'Merlin Testnet',
  },
};
