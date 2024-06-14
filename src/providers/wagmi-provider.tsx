import { bsc, mainnet, bscTestnet } from 'wagmi/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import {
  metaMaskConnector,
  okxConnector,
  tokenPocketConnector,
  trustWalletConnector,
  walletConnectConnector,
} from '@/connectors';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';
import type { PropsWithChildren } from 'react';

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, bscTestnet, merlinTestnet, merlinMainnet],
  connectors: [metaMaskConnector, okxConnector, tokenPocketConnector, walletConnectConnector, trustWalletConnector],
  pollingInterval: 6_000,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [merlinTestnet.id]: http(),
    [merlinMainnet.id]: http(),
  },
});
export const WagmiClientProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};
