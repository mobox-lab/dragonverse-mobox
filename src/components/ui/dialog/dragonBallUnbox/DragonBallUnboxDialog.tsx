'use client';
import { dragonBallUnboxDialogOpenAtom, dragonBoxUnboxNumAtom } from '@/atoms/dragonverse';
import Dialog from '@/components/ui/dialog';
import { CDN_URL } from '@/constants';
import { Rarity } from '@/constants/enum';
import { clsxm } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { random } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../../button';
import { CloseSvg } from '../../svg/CloseSvg';
import DragonCard from './DragonCard';
import FinishCard from './FinishCard';

export type UnboxValue = {
  type: Rarity;
  value: number;
};
const boxValues: UnboxValue[] = [
  {
    type: Rarity.Common,
    value: 80,
  },
  {
    type: Rarity.Uncommon,
    value: 100,
  },
  {
    type: Rarity.Rare,
    value: 200,
  },
  {
    type: Rarity.Epic,
    value: 300,
  },
  {
    type: Rarity.Legendary,
    value: 500,
  },
];
export default function DragonBallUnboxDialog() {
  const [isOpen, setIsOpen] = useAtom(dragonBallUnboxDialogOpenAtom);
  const dragonBoxUnboxNum = useAtomValue(dragonBoxUnboxNumAtom);
  const unboxValues = useMemo(() => {
    return new Array(dragonBoxUnboxNum).fill(0).map((_, index) => {
      return boxValues[random(0, 4)];
    });
  }, [dragonBoxUnboxNum]);
  const unboxList = useMemo(() => {
    return unboxValues.reduce((acc, cur, index) => {
      if (index % 5 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(cur);
      return acc;
    }, [] as UnboxValue[][]);
  }, [unboxValues]);
  const [isFinish, setFinish] = useState(false);
  const [isDrawAll, setIsDrawAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0); //  

  const remainingNum = useMemo(() => {
    //  
    const totalCards = unboxValues.length;
    //  
    const flippedCards = currentIndex * 5 + flippedCount;
    //  
    const remainingCards = totalCards - flippedCards;
    return remainingCards;
  }, [currentIndex, flippedCount, unboxValues]);

  //  
  const [flippedStatus, setFlippedStatus] = useState<boolean[]>(Array(unboxValues.length).fill(false));
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  const reset = () => {
    setIsDrawAll(false);
    setFinish(false);
    setFlippedCount(0);
    setFlippedStatus(Array(unboxValues.length).fill(false));
    setIsAutoRunning(false);
    setCurrentIndex(0);
  };

  // Test
  useEffect(() => {
    if (!isOpen) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  //  
  const handleCardFlip = useCallback((idx: number) => {
    setFlippedCount((prevCount) => prevCount + 1);
    setFlippedStatus((prev) => {
      const newStatus = [...prev];
      newStatus[idx] = true;
      return newStatus;
    });
  }, []);

  const handleDrawAll = () => {
    setFinish(true);
    setIsDrawAll(true);
    // //  
    // const remainingCardsInGroup = unboxList[currentIndex].length - flippedCount;
    // let flipNum = 0;
    // //  
    // for (let i = 0; i < unboxList[currentIndex].length; i++) {
    //   if (flippedStatus[currentIndex * 5 + i]) continue;
    //   let flippedNum = ++flipNum;
    //   setTimeout(
    //     () => {
    //       setIsAutoRunning(true);
    //       handleCardFlip(currentIndex * 5 + i);
    //       //  
    //       if (flippedNum === remainingCardsInGroup) {
    //         setTimeout(() => {
    //           setFinish(true);
    //         }, 2000); //  
    //       }
    //     },
    //     1000 * (flippedNum - 1),
    //   ); //  
    // }
  };

  useEffect(() => {
    if (isAutoRunning) return;
    //  
    const currentGroupSize = unboxList[currentIndex]?.length || 0;

    if (flippedCount === currentGroupSize && currentIndex < unboxList.length - 1) {
      //  
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1); //  
        setFlippedCount(0); //  
      }, 1000);
    } else if (flippedCount === currentGroupSize && currentIndex === unboxList.length - 1) {
      //  
      setTimeout(() => {
        setFinish(true); //  
      }, 2000);
    }
  }, [flippedCount, currentIndex, unboxList, isAutoRunning]);

  return (
    <Dialog
      open={isOpen}
      showCloseButton={false}
      isDismiss={!isFinish}
      className={clsxm('w-[37.6vw] md:h-auto md:max-h-[80%] xl:w-[470px]', 'border-none bg-transparent backdrop-blur-unset')}
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <AnimatePresence mode="popLayout">
          {isFinish && (
            <motion.div
              key="finish-card"
              className="relative z-20 flex border border-gray-600 bg-black/60 p-[2.88vw] xl:p-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <CloseSvg
                onClick={() => setIsOpen(false)}
                className="absolute right-[2.4vw] top-[2.4vw] h-[1.12vw] w-[1.12vw] xl:right-7.5 xl:top-7 xl:h-3.5 xl:w-3.5"
              />
              <FinishCard values={unboxValues} />
            </motion.div>
          )}
          {isDrawAll && (
            <motion.video
              key="egg-all-video"
              preload="auto"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              playsInline
              muted
              autoPlay
              disablePictureInPicture
              src={`${CDN_URL}/egg-all-shatter.webm`}
              className="pointer-events-none fixed inset-0 z-10 h-full w-full scale-[1.2] object-cover"
            />
          )}
          {!isFinish && (
            <motion.div
              key="egg-list"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex w-full flex-col items-center gap-[2.4vw] text-center xl:gap-7.5"
            >
              {unboxList?.length
                ? unboxList.map(
                    (arr, idx) =>
                      currentIndex === idx && (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 80 }}
                          transition={{ duration: 1, stiffness: 300, damping: 80, type: 'spring' }}
                          className="flex items-center justify-center gap-[2.4vw] xl:gap-7.5"
                        >
                          {arr?.length
                            ? arr.map(({ type, value }, idx) => (
                                <DragonCard
                                  key={idx}
                                  type={type}
                                  value={value}
                                  onClick={() => {
                                    if (isAutoRunning) return;
                                    handleCardFlip(currentIndex * 5 + idx);
                                  }}
                                  isFlippedExternally={flippedStatus[currentIndex * 5 + idx]}
                                />
                              ))
                            : null}
                        </motion.div>
                      ),
                  )
                : null}
              {dragonBoxUnboxNum > 5 && (
                <Button
                  onClick={handleDrawAll}
                  disabled={!remainingNum}
                  type="yellow"
                  className={clsxm(
                    'shadow-text-unbox mt-[1.6vw] flex h-[4.8vw] flex-col items-center justify-center gap-[0.32vw] self-stretch text-[1.6vw]/[1.6vw] font-semibold xl:mt-5 xl:h-15 xl:gap-1 xl:text-xl/5',
                  )}
                >
                  Hatch all
                  {remainingNum ? (
                    <span className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Available Hatch(s): {remainingNum}</span>
                  ) : null}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    />
  );
}
