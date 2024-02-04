import { bsc, arbitrum } from 'wagmi/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { metaMaskConnector, tokenPocketConnector, walletConnectConnector } from '@/connectors';
import { merlinTestnet } from '@/connectors/chains';
import type { PropsWithChildren } from 'react';

export const wagmiConfig = createConfig({
  chains: [bsc, arbitrum, merlinTestnet],
  connectors: [metaMaskConnector, tokenPocketConnector, walletConnectConnector],
  pollingInterval: 6_000,
  transports: {
    [bsc.id]: http(),
    [arbitrum.id]: http(),
  },
});

export const WagmiClientProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
