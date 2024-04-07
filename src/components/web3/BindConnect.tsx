'use client';

import { useSetAtom } from 'jotai/index';
import Button from '@/components/ui/button';
import { mainWalletConnectDialogAtom } from '@/atoms';
import Web3StatusInner from '@/components/web3/Web3StatusInner';
import { useIsMainConnected, useMainChain } from '@/hooks/wallet';

export default function BindConnect() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();

  if (isMainConnected) {
    if (!isSupportedChain) {
      return (
        <Button
          type="pattern"
          className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-[62px] xl:w-[200px] xl:text-base/6"
          onClick={() => switchMainChain()}
        >
          Wrong Network
        </Button>
      );
    }
    return <Web3StatusInner />;
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
