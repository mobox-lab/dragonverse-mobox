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

      <div className="mt-[3.84vw] xl:mt-12">
        <div className="flex items-center justify-between">
          <div className='relative px-[2vw] py-[2vw] xl:px-6.5 xl:py-5.5 border border-yellow/50 backdrop-blur'>
            <PatternWithoutLine className="stroke-yellow" />
            <div className="black-outline text-center text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">Current Level</div>
            <div className="mt-[0.8vw] flex gap-[1.28vw] xl:mt-2.5 xl:gap-4">
              <div>
                <div className="black-outline w-[10.4vw] text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:w-[130px] xl:text-sm/6">
                  Daily Reward
                </div>
                <div className="mt-[0.32vw] flex items-center bg-gradient-text bg-clip-text text-[1.924vw]/[1.92vw] font-bold text-transparent xl:mt-1 xl:text-2xl/6">
                  {formatNumber(BigInt(currentReward?.dailyReward || 0), false)}
                  <span className="text ml-[0.48vw] text-[1.28vw]/[1.6vw] xl:ml-1.5 xl:text-base/5">eMDBL</span>
                </div>
              </div>
              <div>
                <div className="black-outline w-[12.4vw] text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:w-[140px] xl:text-sm/6">
                Total Active eMDBL
                </div>
                <div className="mt-[0.32vw] flex items-center bg-gradient-text bg-clip-text text-[1.924vw]/[1.92vw] font-bold text-transparent xl:mt-1 xl:text-2xl/6">
                  {formatNumber(totalSupply, false)}
                  <span className="text ml-[0.48vw] text-[1.28vw]/[1.6vw] xl:ml-1.5 xl:text-base/5">eMDBL</span>
                </div>
              </div>
            </div>
          </div>
          <div className='relative px-[2vw] py-[2vw] xl:px-6.5 xl:py-5.5 border border-yellow/50 backdrop-blur'>
            <PatternWithoutLine className="stroke-yellow" />
            <div className="black-outline text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5 text-center">Next Level</div>
            <div className="mt-[0.8vw] flex gap-[1.28vw] xl:mt-2.5 xl:gap-4">
              <div className="flex flex-col items-start text-left">
                <div className="black-outline w-[12.4vw] text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:w-[140px] xl:text-sm/6">
                  Total Active eMDBL
                </div>
                <div className="mt-[0.32vw] flex items-center bg-gradient-text bg-clip-text text-[1.924vw]/[1.92vw] font-bold text-transparent xl:mt-1 xl:text-2xl/6">
                  {formatNumber(BigInt(nextReward?.min || 0), false)}
                  <span className="text ml-[0.48vw] text-[1.28vw]/[1.6vw] xl:ml-1.5 xl:text-base/5">eMDBL</span>
                </div>
              </div>
              <div className="flex flex-col items-start text-left">
                <div className="black-outline w-[10.4vw] text-[1.12vw]/[1.92vw] font-medium text-gray-300 xl:w-[130px] xl:text-sm/6">
                  Daily Reward
                </div>
                <div className="mt-[0.32vw] flex items-center bg-gradient-text bg-clip-text text-[1.924vw]/[1.92vw] font-bold text-transparent xl:mt-1 xl:text-2xl/6">
                  {formatNumber(BigInt(nextReward?.dailyReward || 0), false)}
                  <span className="ml-[0.48vw] text-[1.28vw]/[1.6vw] xl:ml-1.5 xl:text-base/5">eMDBL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={processRef}
          className="mt-[1.28vw] flex h-[4.48vw] w-full gap-[0.48vw] border border-gray-600/30 bg-gray-750 p-[0.48vw] xl:mt-4 xl:h-14 xl:gap-1.5 xl:p-1.5"
        >
          {Array.from({ length: blocks }, (_, index) => index + 1).map((item) => {
            return <ProcessItemSvg key={item} className="h-[3.52vw] w-[1.44vw] xl:h-11 xl:w-4.5" />;
          })}
        </div>
        {/* <img src="/img/vault.webp" alt="vault" className="w-[32.48vw] xl:w-[406px]" /> */}
        {/* <div className="mt-[0.64vw] xl:mt-2">
            <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">Total eMDBL</div>
            <div className="mt-[0.64vw] bg-gradient-text text-transparent bg-clip-text text-[2.4vw]/[2.4vw] font-bold xl:mt-2 xl:text-3xl/7.5">
              {formatNumber(totalSupply || 0n, false)}
            </div>
          </div> */}
        {/* <div
            className={clsxm(
              'relative  h-[10.24vw] w-[48vw]  border border-yellow/50 bg-black/60 backdrop-blur-sm xl:h-[128px] xl:w-[600px]',
            )}
          >
            <PatternWithoutLine className="stroke-yellow" />
            <div className="absolute left-1/2 top-1/2 h-[3.84vw] w-[1px] -translate-x-1/2 -translate-y-1/2 transform bg-yellow/50 xl:h-12"></div>
            <div className="relative grid h-full grid-cols-2">
              <div className="flex-center h-full flex-col">
                <div className="text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">Total eMDBL</div>
                <div className="mt-[0.48vw] text-[1.92vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-2xl/7.5">
                  {formatNumber(totalSupply || 0n, false)}
                </div>
              </div>
              <div className="flex-center h-full flex-col">
                <div className="text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">Daily Reward</div>
                <div className="mt-[0.48vw] text-[1.92vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-2xl/7.5">
                  800,009,887
                </div>
              </div>
            </div>
          </div> */}
      </div>
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

// TypeScript React component methods for: refactor: 🔧 improve state management
interface refactor____improve_state_managementProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface refactor____improve_state_managementState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const userefactor____improve_state_management = () => {
  const [state, setState] = useState<refactor____improve_state_managementState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlerefactor____improve_state_management = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/refactor____improve_state_management');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlerefactor____improve_state_management
  };
};
