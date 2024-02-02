'use client';

import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import Button from '@/components/ui/button';
import { mainWalletConnectDialogAtom } from '@/atoms';

export default function Web3Status({ className }: { className?: string }) {
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);

  return (
    <div className={clsx('flex', className)}>
      <Button
        type="pattern"
        className="h-[4.96vw] w-[16vw] text-[1.28vw]/[1.92vw] font-bold xl:h-[62px] xl:w-[200px] xl:text-base/6"
        onClick={() => setWalletConnect(true)}
      >
        CONNECT
      </Button>
    </div>
  );
}
