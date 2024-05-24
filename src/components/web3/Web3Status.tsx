'use client';

import { useSetAtom } from 'jotai';
import Button from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { mainWalletConnectDialogAtom } from '@/atoms';
import Web3StatusInner from '@/components/web3/Web3StatusInner';
import { useIsMainConnected, useMainChain } from '@/hooks/wallet';
import WalletAssets from '@/components/web3/WalletAssets';
import ReactGA from 'react-ga4';

const connectButtonExcludePath = ['/terms-of-use', '/events', '/burn'];
export default function Web3Status() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();
  const pathname = usePathname();

  if (connectButtonExcludePath.includes(pathname)) return null;

  if (isMainConnected) {
    if (!isSupportedChain) {
      return (
        <Button
          type="pattern"
          className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-[62px] xl:w-[200px] xl:text-base/6"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'wrong_network' });
            switchMainChain();
          }}
        >
          Wrong Network
        </Button>
      );
    }
    return (
      <div className="flex-center gap-3.5">
        <Web3StatusInner />
        {/*<WalletAssets />*/}
      </div>
    );
  }

  return (
    <Button
      type="pattern"
      className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-medium xl:h-12 xl:w-[200px] xl:text-sm/3.5"
      onClick={() => setWalletConnect(true)}
    >
      CONNECT
    </Button>
  );
}
