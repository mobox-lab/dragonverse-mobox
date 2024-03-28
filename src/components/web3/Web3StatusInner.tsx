import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import ReactGA from 'react-ga4';
import { useSetAtom } from 'jotai';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { accessTokenAtom } from '@/atoms';
import Button from '@/components/ui/button';
import Popover from '@/components/ui/popover';
import { useCopyToClipboard } from 'react-use';
import { shortenAddress } from '@/utils/shorten';
import ClipSVG from '@/../public/svg/clip.svg?component';
import ArrowSVG from '@/../public/svg/arrow-02.svg?component';
import { useMainAccount, useMainDisconnect } from '@/hooks/wallet';

export default function Web3StatusInner() {
  const { majorAddress, aaAddress, btcAddress } = useMainAccount();
  const [isOpen, setIsOpen] = useState(false);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const { mainDisconnect } = useMainDisconnect();
  const [, copyToClipboard] = useCopyToClipboard();

  const evmAddress = useMemo(() => aaAddress ?? majorAddress, [aaAddress, majorAddress]);

  const onDisconnectClick = () => {
    ReactGA.event({ category: 'merlin', action: 'disconnect_wallet', label: 'disconnect' });
    mainDisconnect();
    setAccessToken('');
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      render={() => (
        <div className={clsx('flex items-start', aaAddress ? 'w-[23.5vw] xl:w-[294px]' : 'w-[14.4vw] xl:w-[180px] ')}>
          <div className="w-full border border-gray-600 bg-black/60 p-2 text-[1.12vw]/[1.6vw] backdrop-blur xl:text-xs/4">
            <div className="border-b border-white/25 px-[0.64vw] pb-[1.28vw] pt-[0.32vw] xl:px-2 xl:pb-4 xl:pt-2">
              <p className="text-[0.96vw]/[1.28vw] font-medium text-gray-300 xl:text-xs/4">EVM Address</p>
              <div className="mt-[0.48vw] flex items-center gap-[0.48vw] xl:mt-1.5 xl:gap-1.5">
                {shortenAddress(evmAddress)}
                <ClipSVG
                  className="w-[0.96vw] cursor-pointer stroke-white xl:w-3"
                  onClick={() => {
                    copyToClipboard(evmAddress ?? '');
                    toast.success('EVM address copied');
                  }}
                />
              </div>
            </div>
            {btcAddress && (
              <div className="border-b border-white/25 px-[0.64vw] py-[1.28vw] xl:px-2 xl:py-4">
                <p className="text-[0.96vw]/[1.28vw] font-medium text-gray-300 xl:text-xs/4">BTC Address</p>
                <div className="mt-[0.48vw] flex items-center gap-[0.48vw] xl:mt-1.5 xl:gap-1.5">
                  {shortenAddress(btcAddress)}
                  <ClipSVG
                    className="w-[0.96vw] cursor-pointer stroke-white xl:w-3"
                    onClick={() => {
                      copyToClipboard(btcAddress ?? '');
                      toast.success('BTC address copied');
                    }}
                  />
                </div>
              </div>
            )}
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
      <Button
        type="pattern"
        className={clsx(
          'flex h-[4.96vw] w-auto items-center justify-center gap-[0.48vw] border px-[1.44vw] text-[1.28vw]/[1.92vw] font-medium after:invisible after:-z-[10] hover:bg-[#222]/60 xl:h-12 xl:gap-1.5 xl:px-4.5 xl:text-sm/5',
        )}
      >
        <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
          <img src="/img/merlin-chain.png" className="h-full w-full" alt="merlin" />
        </div>
        <p className="text-[1.12vw]/[1.12vw] xl:text-sm/3.5">
          {shortenAddress(majorAddress)}
          {aaAddress && <>({shortenAddress(aaAddress)})</>}
        </p>
        <motion.div className="h-[0.64vw] w-[0.64vw] xl:h-2 xl:w-2" animate={{ rotate: isOpen ? 0 : 180 }}>
          <ArrowSVG viewBox="0 0 10 10" className="h-full w-full overflow-visible fill-white" preserveAspectRatio="none meet" />
        </motion.div>
      </Button>
    </Popover>
  );
}
