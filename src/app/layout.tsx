import LeftSider from '@/components/layout/LeftSider';
import DialogComponents from '@/components/ui/dialog/DialogComponents';
import ToastIcon from '@/components/ui/toast/ToastIcon';
import Web3Status from '@/components/web3/Web3Status';
import Container from '@/components/layout/Container';
import { poppins } from '@/constants/font';
import Providers from '@/providers/root';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import '../utils/analytics';

import '@/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Dragonverse Neo',
  description: 'Dragonverse Neo',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, poppins.variable)}>
        <Providers>
          <div className="scrollbar-hide flex h-screen overflow-auto">
            <LeftSider />
            <Container>
              <div className="sticky z-50 flex items-center justify-end pt-[2.4vw] xl:container xl:pt-7.5">
                <div className="px-[3.2vw]">
                  <Web3Status />
                </div>
              </div>
              <main className="xl:container">{children}</main>
            </Container>
          </div>
          <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
          <DialogComponents />
        </Providers>
      </body>
    </html>
  );
}
