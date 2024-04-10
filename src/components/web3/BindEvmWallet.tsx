import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { useSetAtom } from 'jotai';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { accessTokenAtom } from '@/atoms';
import Popover from '@/components/ui/popover';
import { useCopyToClipboard } from 'react-use';
import { shortenAddress } from '@/utils/shorten';
import ClipSVG from '@/../public/svg/clip.svg?component';
import ArrowSVG from '@/../public/svg/arrow-02.svg?component';
import { useMainAccount, useMainDisconnect } from '@/hooks/wallet';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';

export default function BindEvmWallet() {
  const { majorAddress } = useMainAccount();
  const [isOpen, setIsOpen] = useState(false);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const { mainDisconnect } = useMainDisconnect();
  const [, copyToClipboard] = useCopyToClipboard();

  const onDisconnectClick = () => {
    ReactGA.event({ category: 'merlin', action: 'disconnect_wallet', label: 'disconnect' });
    mainDisconnect();
    setAccessToken('');
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      className="w-full max-w-[238px]"
      render={() => (
        <div className="flex items-start">
          <div className="w-full border border-gray-600 bg-black/60 p-2 text-[1.12vw]/[1.6vw] xl:text-xs/4">
            <div className="border-b border-white/25 px-[0.64vw] pb-[1.28vw] pt-[0.32vw] xl:px-2 xl:pb-4 xl:pt-2">
              <p className="text-[0.96vw]/[1.28vw] font-medium text-gray-300 xl:text-xs/4">EVM Address</p>
              <div className="mt-[0.48vw] flex items-center gap-[0.48vw] xl:mt-1.5 xl:gap-1.5">
                {shortenAddress(majorAddress)}
                <ClipSVG
                  className="w-[0.96vw] cursor-pointer stroke-white xl:w-3"
                  onClick={() => {
                    copyToClipboard(majorAddress ?? '');
                    toast.success('EVM address copied');
                  }}
                />
              </div>
            </div>
            <div
              onClick={onDisconnectClick}
              className="flex cursor-pointer items-center gap-[0.48vw] px-[0.8vw] pb-[0.96vw] pt-[1.44vw] hover:bg-white/[0.12] hover:backdrop-blur-lg xl:gap-1.5 xl:px-2.5 xl:pb-3 xl:pt-4.5"
            >
              <img className="h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5" src="/svg/logout.svg" alt="" />
              Disconnect
            </div>
          </div>
        </div>
      )}
    >
      <div className="flex-center bg-gray-750 relative h-12 max-w-[238px] flex-1 cursor-pointer gap-1.5 border border-green/50 bg-gradient-to-b from-green/10 to-green/10 text-xs font-medium">
        <PatternWithoutLine className="stroke-green" />
        <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
          <img src="/img/merlin-chain.png" className="h-full w-full" alt="merlin" />
        </div>
        <p className="select-none text-[1.12vw]/[1.12vw] xl:text-sm/3.5">{shortenAddress(majorAddress)}</p>
        <motion.div className="h-[0.64vw] w-[0.64vw] xl:h-2 xl:w-2" animate={{ rotate: isOpen ? 0 : 180 }}>
          <ArrowSVG viewBox="0 0 10 10" className="h-full w-full overflow-visible fill-white" preserveAspectRatio="none meet" />
        </motion.div>
      </div>
    </Popover>
  );
}
