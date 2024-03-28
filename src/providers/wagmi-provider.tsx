import { bsc, arbitrum, mainnet } from 'wagmi/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { metaMaskConnector, okxConnector, tokenPocketConnector, walletConnectConnector } from '@/connectors';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';
import type { PropsWithChildren } from 'react';

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, arbitrum, merlinTestnet, merlinMainnet],
  connectors: [metaMaskConnector, okxConnector, tokenPocketConnector, walletConnectConnector],
  pollingInterval: 6_000,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [merlinTestnet.id]: http(),
    [merlinMainnet.id]: http(),
  },
});
export const WagmiClientProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
