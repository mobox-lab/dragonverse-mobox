'use client';

import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { CDN_URL } from '@/constants';
import { useFetchRankCurrentRound } from '@/hooks/rank/useFetchRankCurrentRound';
import { openLink } from '@/utils';
import { clickableMotionProps } from '@/utils/motionAnim';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ReactGA from 'react-ga4';
import Buff from './_components/Buff';
import GameRank from './_components/GameRank';
import GameRankTab from './_components/GameRankTab';
import SeasonCountDown from '@/app/halloffame/_components/SeasonCountDown';

interface HallOfFameProps {}

const HallOfFame: React.FunctionComponent<HallOfFameProps> = (props) => {
  const { data } = useFetchRankCurrentRound();

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
            openLink('https://mbox.medium.com/dragonverse-neo-season-2-is-live-5b413c7e9613');
          }}
        />
      </motion.div>
      <div className="mt-[2.88] flex items-center text-[1.28vw]/[1.6vw] xl:mt-9 xl:text-base/5">
        Season {data?.gameRoundInfo?.round || 1}
        <SeasonCountDown endTime={data?.gameRoundInfo.endTime} />
      </div>
      <GameRankTab className="mb-[2.4vw] mt-[1.28vw] xl:mb-7.5 xl:mt-4" roundInfo={data} />
      <div className="relative z-10 mt-[2.88vw] w-full border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-9">
        <PatternWithoutLine />
        <GameRank roundInfo={data} />
      </div>
      <Buff />
    </div>
  );
};

export default HallOfFame;
