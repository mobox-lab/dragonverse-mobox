// TODO: Add MerlinMainnet
export const merlinTestnet = {
  id: 686868,
  name: 'MerlinTestnet',
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
  testnet: true,
};
