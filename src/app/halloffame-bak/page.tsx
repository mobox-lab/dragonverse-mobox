'use client';

import { CDN_URL } from '@/constants';
import clsx from 'clsx';
import DragonBorder from '../_components/DragonBorder';
import GameRank from './_components/GameRank';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Buff from './_components/Buff';
import Process from './_components/Process';
import { useFetchRankCurrentRound } from '@/hooks/rank/useFetchRankCurrentRound';
import GameRankTab from './_components/GameRankTab';
import { motion } from 'framer-motion';
import { clickableMotionProps } from '@/utils/motionAnim';
import { openLink } from '@/utils';
import ReactGA from 'react-ga4';

interface HallOfFameProps {}

const HallOfFame: React.FunctionComponent<HallOfFameProps> = (props) => {
  const { data } = useFetchRankCurrentRound();
  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]')}>
      <img src={`${CDN_URL}/dragon-banner-03.jpg`} alt="dragon" className="absolute left-0 top-10 -z-10 h-auto w-full" />
      <img
        src="/img/rank-title.webp"
        alt="Hall of Fame"
        className="absolute left-1/2 top-[2.56vw] w-[40.48vw] -translate-x-1/2 transform xl:top-8 xl:w-[506px]"
      />
      {/* <div className="mt-[15.68vw] flex justify-between xl:mt-[196px]">
        <div className="flex flex-col">
          <div className="text-left text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">Current Reward</div>
          <div className="ml-[0.32vw] flex items-center text-yellow xl:ml-1">
            <div className="flex items-end font-semibold">
              <div className="text-[1.92vw]/[2.4vw] xl:text-2xl/7.5">{data?.gameRoundInfo.currentReward.mdbl || 0}</div>
              <div className="ml-[0.32vw] text-[1.28vw]/[2.4vw] xl:ml-1 xl:text-base/7.5">$MDBL</div>
              <div className="ml-[0.48vw] text-[1.92vw]/[2.4vw] xl:ml-1.5 xl:text-2xl/7.5">
                {data?.gameRoundInfo.currentReward.emdbl || 0}
              </div>
              <div className="ml-[0.32vw] text-[1.28vw]/[2.4vw] xl:ml-1 xl:text-base/7.5">eMDBL</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-right text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">Next Reward</div>
          <div className="ml-[0.32vw] flex items-center text-yellow xl:ml-1">
            <div className="flex items-end font-semibold">
              <div className="text-[1.92vw]/[2.4vw] xl:text-2xl/7.5">{data?.gameRoundInfo.nextReward.mdbl || 0}</div>
              <div className="ml-[0.32vw] text-[1.28vw]/[2.4vw] xl:ml-1 xl:text-base/7.5">$MDBL</div>
              <div className="ml-[0.48vw] text-[1.92vw]/[2.4vw] xl:ml-1.5 xl:text-2xl/7.5">
                {data?.gameRoundInfo.nextReward.emdbl || 0}
              </div>
              <div className="ml-[0.32vw] text-[1.28vw]/[2.4vw] xl:ml-1 xl:text-base/7.5">eMDBL</div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <Process type="pet" total={data?.gameRoundInfo.nextParticipantCnt} current={data?.gameRoundInfo.participantCnt} /> */}

      <motion.div className="mt-[16.64vw] size-[7.68vw] cursor-pointer xl:mt-[208px] xl:size-24" {...clickableMotionProps()}>
        <img
          draggable={false}
          src="/img/guide-icon.webp"
          className="relative size-[7.68vw] xl:size-24"
          alt="Guide"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'hof_guide' });
            openLink('https://mbox.medium.com/');
          }}
        />
      </motion.div>
      <GameRankTab className="mb-7.5 mt-[2.88vw] xl:mt-9" roundInfo={data} />
      <div className="relative mt-[2.88vw] w-full border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-9">
        <PatternWithoutLine />
        <GameRank roundInfo={data} />
      </div>
      <Buff />
    </div>
  );
};

export default HallOfFame;
