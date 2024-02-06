import { useState } from 'react';
import ReactGA from 'react-ga4';
import { useSetAtom } from 'jotai';
import { motion } from 'framer-motion';
import { accessTokenAtom } from '@/atoms';
import Button from '@/components/ui/button';
import Popover from '@/components/ui/popover';
import { shortenAddress } from '@/utils/shorten';
import ArrowSvg from '@/../public/svg/arrow-02.svg?component';
import { useMainAccount, useMainDisconnect } from '@/hooks/wallet';

export default function Web3StatusInner() {
  const { majorAddress } = useMainAccount();
  const [isOpen, setIsOpen] = useState(false);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const { mainDisconnect } = useMainDisconnect();

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      render={() => (
        <div className="flex w-[16vw] items-start xl:w-[200px]">
          <div className="flex w-full flex-col gap-[0.48vw] border-[1px] border-gray-600 bg-black/60 p-2 text-[1.12vw]/[1.6vw] xl:gap-1.5 xl:text-sm/5">
            <div
              className="flex cursor-pointer items-center gap-[0.48vw] p-[0.8vw] hover:bg-white/[0.12] hover:backdrop-blur-lg xl:gap-1.5 xl:p-2.5"
              onClick={() => {
                ReactGA.event({ category: 'dvneo', action: 'connect_wallet', label: 'disconnect' });
                mainDisconnect();
                setAccessToken('');
              }}
            >
              <img className="ml-0.5 h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5" src="/svg/logout.svg" alt="" />
              Disconnect
            </div>
          </div>
        </div>
      )}
    >
      <Button
        type="pattern"
        className="flex h-[4.96vw] w-[16vw] items-center justify-center text-[1.28vw]/[1.92vw] font-semibold xl:h-[62px] xl:w-[200px] xl:text-base/6"
      >
        <p className="mx-1.5">{shortenAddress(majorAddress)}</p>
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
          <ArrowSvg className="fill-white" />
        </motion.div>
      </Button>
    </Popover>
  );
}
