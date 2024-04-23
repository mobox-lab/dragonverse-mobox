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

export const P12Test: Chain = {
  id: 121212,
  name: 'P12Test',
  nativeCurrency: {
    decimals: 18,
    name: 'p12',
    symbol: 'p12',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.tenderly.co/fork/324315d5-cc09-44d4-baff-55b1599f5207'],
    },
  },
} as const;
