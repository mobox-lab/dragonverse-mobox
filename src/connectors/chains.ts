import { Chain } from 'viem';

export const merlinMainnet: Chain = {
  id: 4200,
  name: 'Merlin Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.merlinchain.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'MerlinScan',
      url: 'https://scan.merlinchain.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0x1289eFf4266dbBE945786A5aA67e27289f82b066',
      blockCreated: 7523616,
    },
  },
} as const;

export const merlinTestnet: Chain = {
  id: 686868,
  name: 'Merlin Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.merlinchain.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'MerlinScan',
      url: 'https://testnet-scan.merlinchain.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0x2b363dB8f3D626C99668c21ED52210F8fC1Ae07E',
      blockCreated: 3575174,
    },
  },
  testnet: true,
} as const;
