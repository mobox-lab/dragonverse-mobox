'use client';

import ArrowSVG from '@/../public/svg/arrow-02.svg?component';
import ClipSVG from '@/../public/svg/clip.svg?component';
import { SnapShotData } from '@/apis/types';
import { mainWalletConnectDialogAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import Popover from '@/components/ui/popover';
import BindEvmWallet from '@/components/web3/BindEvmWallet';
import { useIsMainConnected, useMainChain } from '@/hooks/wallet';
import { shortenAddress } from '@/utils';
import { motion } from 'framer-motion';
import { useSetAtom } from 'jotai/index';
import { useState } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';

type SnapShotWalletButtonProps = {
  data?: SnapShotData;
};

export default function SnapShotWalletButton({ data }: SnapShotWalletButtonProps) {
  const isMainConnected = useIsMainConnected();
  const [, copyToClipboard] = useCopyToClipboard();
  const [isOpen, setIsOpen] = useState(false);
  const { isSupportedChain, switchMainChain } = useMainChain();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);

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
      <div className="flex w-full max-w-[540px] items-center justify-center gap-4 font-semibold">
        <BindEvmWallet />
        {data?.buffAAAddress && (
          <div className="w-7.5">
            <img src="/svg/bind.svg" alt="bind" className="w-full" />
          </div>
        )}
        {data?.buffAAAddress ? (
          <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
            placement="bottom-start"
            className="w-full max-w-[238px]"
            render={() => (
              <div className="flex items-start">
                <div className="w-full border border-gray-600 bg-black/60 p-2 text-[1.12vw]/[1.6vw] backdrop-blur xl:text-xs/4">
                  <div className="border-b border-white/25 px-[0.64vw] pb-[1.28vw] pt-[0.32vw] xl:px-2 xl:pb-4 xl:pt-2">
                    <p className="text-[0.96vw]/[1.28vw] font-medium text-gray-300 xl:text-xs/4">EVM Address</p>
                    <div className="mt-[0.48vw] flex items-center gap-[0.48vw] xl:mt-1.5 xl:gap-1.5">
                      {shortenAddress(data.buffAAAddress)}
                      <ClipSVG
                        className="w-[0.96vw] cursor-pointer stroke-white xl:w-3"
                        onClick={() => {
                          copyToClipboard(data.buffAAAddress ?? '');
                          toast.success('EVM address copied');
                        }}
                      />
                    </div>
                  </div>
                  <div className="px-[0.64vw] py-[1.28vw] xl:px-2 xl:py-4">
                    <p className="text-[0.96vw]/[1.28vw] font-medium text-gray-300 xl:text-xs/4">BTC Address</p>
                    <div className="mt-[0.48vw] flex items-center gap-[0.48vw] xl:mt-1.5 xl:gap-1.5">
                      {shortenAddress(data.buffAddress)}
                      <ClipSVG
                        className="w-[0.96vw] cursor-pointer stroke-white xl:w-3"
                        onClick={() => {
                          copyToClipboard(data.buffAddress ?? '');
                          toast.success('BTC address copied');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <div className="flex-center relative h-12 flex-1 cursor-pointer gap-1.5 border border-green/50 bg-gray-750 bg-gradient-to-b from-green/10 to-green/10 text-xs font-medium">
              <PatternWithoutLine className="stroke-green" />
              <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
                <img src="/img/btc.webp" className="h-full w-full" alt="btc" />
              </div>
              {shortenAddress(data.buffAddress)}({shortenAddress(data.buffAAAddress)})
              <motion.div className="h-[0.64vw] w-[0.64vw] xl:h-2 xl:w-2" animate={{ rotate: isOpen ? 0 : 180 }}>
                <ArrowSVG
                  viewBox="0 0 10 10"
                  className="h-full w-full overflow-visible fill-white"
                  preserveAspectRatio="none meet"
                />
              </motion.div>
            </div>
          </Popover>
        ) : null}
      </div>
    );
  }

  return (
    <Button
      type="pattern"
      className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-12 xl:w-[200px] xl:text-sm/3.5"
      onClick={() => setWalletConnect(true)}
    >
      CONNECT
    </Button>
  );
}
