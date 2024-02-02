'use client';

import React, { PropsWithChildren } from 'react';
import { ProviderComposer } from '@/components/common/ProviderComposer';
import { JotaiStoreProvider } from '@/providers/jotai-provider';
import { WagmiClientProvider } from '@/providers/wagmi-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { BTCConnectProvider } from '@/providers/btc-connect-provider';

const contexts: React.JSX.Element[] = [
  <JotaiStoreProvider key="jotaiStoreProvider" />,
  <BTCConnectProvider key="btcConnectProvider" />,
  <WagmiClientProvider key="wagmiClientProvider" />,
  <ReactQueryProvider key="reactQueryProvider" />,
];

export default function Providers({ children }: PropsWithChildren) {
  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
}
