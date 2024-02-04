'use client';
import { PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import '@/styles/index.css';
import Providers from '@/providers/root';
import { poppins } from '@/constants/font';
import Web3Status from '@/components/web3/Web3Status';
import MainWalletConnectDialog from '@/components/ui/dialog/MainWalletConnectDialog';
import { useIsHome } from '@/hooks/useIsHome';
import Sider from '@/components/layout/Sider';
import Nav from '@/components/nav';
import DragonBurnDialog from '@/components/ui/dialog/DragonBurnDialog';
import '../constants/metadata';

export default function RootLayout({ children }: PropsWithChildren) {
  const { isHome } = useIsHome();
  const [collapsed, setCollapsed] = useState<boolean>(!isHome);
  return (
    <html lang="en">
      <body className={clsx(poppins.className, poppins.variable)}>
        <Providers>
          <div className="scrollbar-hide flex overflow-auto">
            <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="flex h-[12.8vw] justify-center pt-[1.92vw] xl:h-[160px] xl:pt-6">
                {collapsed ? (
                  <img src="/img/logo.webp" alt="logo" className="h-[4.32vw] w-[4.32vw] xl:h-[54px] xl:w-[54px]" />
                ) : (
                  <img src="/img/dragonverse.png" alt="logo" className="h-[7.92vw] w-[13.92vw] xl:h-[94px] xl:w-[174px]" />
                )}
              </div>

              <div>
                <Nav collapsed={collapsed} />
              </div>
            </Sider>
            <div
              className={clsx(`relative ml-[6.88vw] flex-auto overflow-auto transition-all ease-in-out xl:ml-[86px]`, {
                '!ml-[19.04vw] xl:!ml-[238px]': isHome,
              })}
            >
              <Web3Status
                className={clsx(
                  'sticky z-10 flex w-full items-center justify-end px-[5vw] pt-[1.92vw] xl:container sm:px-[20px] xl:pt-6',
                )}
              />
              <main className="xl:container">{children}</main>
            </div>
          </div>

          <DragonBurnDialog />
          <MainWalletConnectDialog />
        </Providers>
      </body>
    </html>
  );
}
