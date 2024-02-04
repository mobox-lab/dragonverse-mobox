import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import Providers from '@/providers/root';
import { poppins } from '@/constants/font';
import Web3Status from '@/components/web3/Web3Status';
import MainWalletConnectDialog from '@/components/ui/dialog/MainWalletConnectDialog';

import '@/styles/index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dragonverse Neo', description: 'Dragonverse Neo' };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, poppins.variable)}>
        <Providers>
          <Web3Status />
          <main className="xl:container">{children}</main>
          <MainWalletConnectDialog />
        </Providers>
      </body>
    </html>
  );
}
