'use client';

import React from 'react';
import { useSetAtom } from 'jotai';
import { shortenAddress } from '@/utils';
import Button from '@/components/ui/button';
import Popover from '@/components/ui/popover';
import { btcWalletConnectDialogAtom } from '@/atoms';

export default function BtcConnectBtn() {
  const setIsOpen = useSetAtom(btcWalletConnectDialogAtom);
  const btc = 'bc1qpcnvsysmvqz8sd05azrtlcl8x5kvllxtuqfl8h';
  const aa = '0xD7144673F3117a981558210f1e9267d1F72825Ba';
  const onClick = () => {
    setIsOpen(true);
  };
  return (
    <Popover
      placement="bottom-start"
      render={() => (
        <div className="flex w-[14.4vw] items-start xl:w-[275px]">
          <div className="w-full border border-gray-600 bg-black/60 p-2 text-[1.12vw]/[1.6vw] backdrop-blur xl:text-xs/4">
            <div className="flex cursor-pointer items-center gap-[0.48vw] px-[0.8vw] pb-[0.96vw] pt-[1.44vw] hover:bg-white/[0.12] hover:backdrop-blur-lg xl:gap-1.5 xl:px-2.5 xl:pb-3 xl:pt-4.5">
              Unbind
            </div>
          </div>
        </div>
      )}
    >
      <Button
        // onClick={onClick}
        type="pattern"
        className="flex-center h-12 flex-1 gap-1.5 text-[1.12vw]/[1.12vw] xl:text-sm/3.5"
      >
        {/*Click to connect BTC(AA) wallet*/}
        <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
          <img src="/img/btc.webp" className="h-full w-full" alt="merlin" />
        </div>
        {shortenAddress(btc)}({shortenAddress(aa)})
      </Button>
    </Popover>
  );
}
