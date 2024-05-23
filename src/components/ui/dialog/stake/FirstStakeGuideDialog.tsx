'use client';
import { stakeAndRedeemDialogAtom, stakeFirstGuideDialogAtom } from '@/atoms/stake';
import { STORAGE_KEY } from '@/constants/storage';
import { openLink } from '@/utils';
import { clickableMotionProps } from '@/utils/motionAnim';
import { setLocalStorage } from '@/utils/storage';
import { motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import ReactGA from 'react-ga4';
import Dialog from '..';
import Button from '../../button';

export default function FirstStakeGuideDialog() {
  const setStakeAndRedeemDialog = useSetAtom(stakeAndRedeemDialogAtom);
  const [isOpen, setIsOpen] = useAtom(stakeFirstGuideDialogAtom);

  const onClick = useCallback(async () => {
    await setLocalStorage(STORAGE_KEY.FIRST_STAKE_GUIDE_HAVE_READ, true);
    setStakeAndRedeemDialog(true);
    setIsOpen(false);
  }, [setIsOpen, setStakeAndRedeemDialog]);

  return (
    <Dialog
      open={isOpen}
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      contentClassName="pb-[2.88vw] xl:pb-9"
      onOpenChange={setIsOpen}
      render={() => (
        <div className="flex flex-col items-center">
          <div className="text-center text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6">Make sure you have read</div>
          <motion.div className="mt-[2.4vw] size-[7.68vw] cursor-pointer xl:mt-7.5 xl:size-24" {...clickableMotionProps()}>
            <img
              draggable={false}
              src="/img/guide-icon.webp"
              className="relative size-[7.68vw] xl:size-24"
              alt="Guide"
              onClick={() => {
                ReactGA.event({ category: 'merlin', action: 'vault_guide' });
                openLink('https://mbox.medium.com/introducing-mdbl-liquidity-yield-program-stage-1-840d82ad8138');
                onClick();
              }}
            />
          </motion.div>
          <a
            onClick={onClick}
            target="_blank"
            href="https://mbox.medium.com/introducing-mdbl-liquidity-yield-program-stage-1-840d82ad8138"
            className="text-link mt-[0.96vw] text-[1.12vw]/[1.6vw] font-semibold xl:mt-3 xl:text-sm/5"
          >
            Liquidity Yield Program Guide
          </a>
          <Button
            className="mt-[3.84vw] h-[3.52vw] w-full text-[1.28vw]/[1.28vw] font-bold xl:mt-12 xl:h-11 xl:text-base/4"
            type="yellow-dark"
            onClick={onClick}
          >
            Confirm
          </Button>
        </div>
      )}
    />
  );
}
