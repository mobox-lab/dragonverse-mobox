import type { PropsWithChildren } from 'react';
import { ConnectProvider, UnisatConnector, OKXConnector, BitgetConnector } from '@particle-network/btc-connectkit';

Object.defineProperty(global, '_bitcore', {
  get() {},
  set() {},
});

export const BTCConnectProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConnectProvider
      options={{
        projectId: '559e0125-5a19-476d-8221-397a91d687b2',
        clientKey: 'cCxbcw9aE0rYBwEtMO787Z80GRdN9RWXLBICprut',
        appId: 'c737323e-bd6f-4e0b-8407-13babad868ac',
        aaOptions: { accountContracts: { BTC: [{ chainIds: [686868], version: '1.0.0' }] } },
      }}
      connectors={[new UnisatConnector(), new OKXConnector(), new BitgetConnector()]}
    >
      {children}
    </ConnectProvider>
  );
};
