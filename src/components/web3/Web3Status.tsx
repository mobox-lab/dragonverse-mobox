'use client';

import { useSetAtom } from 'jotai';
import Button from '@/components/ui/button';
import { useIsMainConnected } from '@/hooks/wallet';
import { mainWalletConnectDialogAtom } from '@/atoms';
import { useMainChain } from '@/hooks/wallet/useMainChain';
import Web3StatusInner from '@/components/web3/Web3StatusInner';

export default function Web3Status() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();

  if (isMainConnected) {
    if (!isSupportedChain) {
      return (
        <Button
          type="pattern"
          className="h-[4.96vw] w-[16vw] text-[1.28vw]/[1.92vw] font-bold xl:h-[62px] xl:w-[200px] xl:text-base/6"
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
      className="h-[4.96vw] w-[16vw] text-[1.28vw]/[1.92vw] font-bold xl:h-[62px] xl:w-[200px] xl:text-base/6"
      onClick={() => setWalletConnect(true)}
    >
      CONNECT
    </Button>
  );
}
