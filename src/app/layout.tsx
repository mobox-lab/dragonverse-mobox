import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import Providers from '@/providers/root';
import { poppins } from '@/constants/font';
import { ToastContainer } from 'react-toastify';
import LeftSider from '@/components/layout/LeftSider';
import Web3Status from '@/components/web3/Web3Status';
import ToastIcon from '@/components/ui/toast/ToastIcon';
import DialogComponents from '@/components/ui/dialog/DialogComponents';
import type { Metadata } from 'next';

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
          <div className="scrollbar-hide flex overflow-auto">
            <LeftSider />
            <div className="relative ml-[6.88vw] flex-auto overflow-auto transition-all ease-in-out xl:ml-[86px]">
              <div className="sticky z-50 flex items-center justify-end pt-[2.4vw] xl:container xl:pt-7.5">
                <div className="px-[3.2vw] xl:px-0">
                  <Web3Status />
                </div>
              </div>
              <main className="xl:container">{children}</main>
            </div>
          </div>

          <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
          <DialogComponents />
        </Providers>
      </body>
    </html>
  );
}
