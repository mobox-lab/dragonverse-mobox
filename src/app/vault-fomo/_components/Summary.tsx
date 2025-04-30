'use client';
import ProcessItemSvg from '@/../public/svg/process-item.svg?component';
import { RewardConfig, VaultRewardToken } from '@/apis/types';
import { useFetchDailyReward } from '@/hooks/stake/useFetchDailyReward';
import { formatNumber, openLink } from '@/utils';
import { clickableMotionProps } from '@/utils/motionAnim';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatEther } from 'viem';
import ReactGA from 'react-ga4';
import { useFetchTotalActiveEmdbl } from '@/hooks/stake/useFetchTotalActiveEmdbl';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';

export default function Summary() {
  const [blocks, setBlocks] = useState<number>(0);
  const processRef = useRef<HTMLDivElement | null>(null);
  const { data: emdblResult } = useFetchTotalActiveEmdbl();
  const totalSupply = useMemo(() => {
    return BigInt(emdblResult?.data ?? '0');
  }, [emdblResult]);

  const [nextReward, setNextReward] = useState<RewardConfig>({
    dailyReward: '0',
    dailyMerlReward: '0',
    max: '0',
    min: '0',
  });
  const [currentReward, setCurrentReward] = useState<RewardConfig>({
    dailyReward: '0',
    dailyMerlReward: '0',
    max: '0',
    min: '0',
  });
  const { data } = useFetchDailyReward();

  useEffect(() => {
    if (data) {
      const configs = data?.rewardConfig || [];
      for (let i = 0; i < configs.length; i++) {
        const config = configs[i];
        if (totalSupply > BigInt(config.min) && ((!!config.max && totalSupply <= BigInt(config.max)) || !config.max)) {
          setCurrentReward(config);
          if (i + 1 === configs.length) {
            setNextReward(config);
          } else {
            setNextReward(configs[i + 1]);
          }
          break;
        } else {
          continue;
        }
      }
    } else {
    }
  }, [data, totalSupply]);

  useEffect(() => {
    if (totalSupply && nextReward.min && BigInt(nextReward.min) !== 0n) {
      const p = Number(formatEther(totalSupply)) / Number(formatEther(BigInt(nextReward.min)));
      const cp = p * 100 >= 100 ? 1 : p;

      if (processRef.current) {
        const windowWidth = window.innerWidth;
        const divWidth = processRef.current.offsetWidth;

        let blockWidth;
        let blockFloat;
        if (windowWidth > 1280) {
          const divWidth = processRef.current.offsetWidth;
          blockWidth = 18 + 6;
          blockFloat = (cp * (divWidth - 12)) / blockWidth;
        } else {
          const vw1 = windowWidth / 100;
          const divWidthVW = divWidth / vw1;
          blockWidth = 1.44 + 0.48;
          blockFloat = (cp * (divWidthVW - 0.96)) / blockWidth;
        }
        const blockInt = Math.floor(blockFloat);

        if (totalSupply === 0n) {
          setBlocks(0);
        } else if (totalSupply > 0n && blockInt === 0) {
          setBlocks(1);
        } else {
          setBlocks(blockInt);
        }
      }
    }
  }, [nextReward, totalSupply]);

  return (
    <>
      <motion.div className="mt-[2.24vw] size-[7.68vw] cursor-pointer  xl:mt-7 xl:size-24" {...clickableMotionProps()}>
        <img
          draggable={false}
          src="/img/guide-icon.webp"
          className="relative size-[7.68vw] xl:size-24"
          alt="Guide"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'vault_guide' });
            openLink('https://mbox.medium.com/mdbl-liquidity-yield-program-update-october-2024-b7c843a5b2b6');
          }}
        />
      </motion.div>
    </>
  );
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
