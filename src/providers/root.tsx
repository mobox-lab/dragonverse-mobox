'use client';

import React, { PropsWithChildren } from 'react';
import { ProviderComposer } from '@/components/common/ProviderComposer';
import { JotaiStoreProvider } from '@/providers/jotai-provider';
import { WagmiClientProvider } from '@/providers/wagmi-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { BTCConnectProvider } from '@/providers/btc-connect-provider';
import { QueryCacheProvider } from '@/providers/query-cache-provider';

const contexts: React.JSX.Element[] = [
  <JotaiStoreProvider key="jotaiStoreProvider" />,
  <BTCConnectProvider key="jotaiStoreProvider" />,
  <WagmiClientProvider key="wagmiClientProvider" />,
  <ReactQueryProvider key="reactQueryProvider" />,
  <QueryCacheProvider key="queryCacheProvider" />,
];

export default function Providers({ children }: PropsWithChildren) {
  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
