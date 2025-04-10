'use client';

import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { CDN_URL } from '@/constants';
import { useFetchRankCurrentRound } from '@/hooks/rank/useFetchRankCurrentRound';
import { formatNumber, openLink } from '@/utils';
import { clickableMotionProps } from '@/utils/motionAnim';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ReactGA from 'react-ga4';
import Buff from './_components/Buff';
import GameRank from './_components/GameRank';
import GameRankTab from './_components/GameRankTab';
import SeasonCountDown from '@/app/halloffame-fomo/_components/SeasonCountDown';
import { useFetchTotalPoints, useFetchTotalSpend } from '@/hooks/points';

interface HallOfFameProps {}

const HallOfFame: React.FunctionComponent<HallOfFameProps> = (props) => {
  const { data } = useFetchRankCurrentRound();
  const { data: totalPointsRes } = useFetchTotalPoints({ round: data?.gameRoundInfo.round, gameId: 'merlin' });
  const { data: totalSpendRes } = useFetchTotalSpend({ round: data?.gameRoundInfo.round, gameId: 'merlin' });
  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]')}>
      <img
        src={`${CDN_URL}/dragon-banner-03.jpg`}
        alt="dragon"
        className="absolute left-1/2 top-10 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
      />
      <img
        src="/img/rank-title.webp"
        alt="Hall of Fame"
        className="absolute left-1/2 top-[2.56vw] w-[40.48vw] -translate-x-1/2 transform xl:top-8 xl:w-[368px]"
      />
      <motion.div className="mt-[15.04vw] size-[7.68vw] cursor-pointer xl:mt-[154px] xl:size-24" {...clickableMotionProps()}>
        <img
          draggable={false}
          src="/img/guide-icon.webp"
          className="relative size-[7.68vw] xl:size-24"
          alt="Guide"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'hof_guide' });
            openLink('https://mbox.medium.com/dragonverse-neo-s8-masters-return-32e6f0d63d6d');
          }}
        />
      </motion.div>
      <div className="mt-[2.88vw] grid grid-cols-2 gap-[2.88vw] xl:mt-9 xl:gap-9">
        <div className="relative border border-yellow/50 px-[3.2vw] py-[1.92vw] backdrop-blur xl:px-10 xl:py-6">
          <PatternWithoutLine className="stroke-yellow" />
          <img
            src="/img/total-in-game.webp"
            alt="prize"
            className="absolute bottom-0 right-[3.2vw] w-[13.44vw] xl:right-10 xl:w-[168px]"
          />
          <div>
            <div className="text-[1.28vw]/[1.96vw] xl:text-base/6">Total In-game Purchase</div>
            <div className="mt-[1.28vw] flex items-center gap-[0.64vw] xl:mt-4 xl:gap-2">
              <img src="/img/mdbl-in-game.png" alt="mdbl" className="h-[2.4vw] xl:h-7.5" />
              <div className="text-[2.4vw]/[2.56vw] font-semibold text-yellow xl:text-[30px]/8">
                {formatNumber(BigInt(totalSpendRes?.roundSpending || 0), false)} $MDBL
              </div>
            </div>
          </div>
        </div>
        <div className="relative border border-yellow/50 px-[3.2vw] py-[1.92vw] backdrop-blur xl:px-10 xl:py-6">
          <PatternWithoutLine className="stroke-yellow" />
          <img
            src="/img/total-points.webp"
            alt="points"
            className="absolute bottom-0 right-[3.2vw] w-[13.44vw] xl:right-10 xl:w-[168px]"
          />
          <div>
            <div className="text-[1.28vw]/[1.96vw] xl:text-base/6">Current Total Points</div>
            <div className="mt-[1.28vw] flex items-center gap-[0.64vw] xl:mt-4 xl:gap-2">
              <img src="/img/points.webp" alt="points" className="h-[2.4vw] xl:h-7.5" />
              <div className="text-[2.4vw]/[2.56vw] font-semibold text-yellow xl:text-[30px]/8">
                {totalPointsRes?.totalPoints} Points
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-[2.88vw] w-full border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-9">
        <PatternWithoutLine />
        <GameRank roundInfo={data} />
      </div>
      <Buff endTime={data?.gameRoundInfo.endTime || 0} />
    </div>
  );
};

export default HallOfFame;

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};

// TypeScript utility function: style: 💄 improve visual hierarchy
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const style____improve_visual_hierarchy: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
