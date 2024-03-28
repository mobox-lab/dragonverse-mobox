'use client';

import DragonBorder from '../_components/DragonBorder';
import { CDN_URL } from '@/constants';
import DragonGameRank from '../_components/DragonGameRank';
import clsx from 'clsx';

interface HallOfFameProps {}

const HallOfFame: React.FunctionComponent<HallOfFameProps> = (props) => {
  return (
    <div className={clsx('px-[5vw] pb-12 sm:px-[20px]')}>
      <img src={`${CDN_URL}/dragon-banner-03.jpg`} alt="dragon" className="absolute left-0 top-10 -z-10 h-auto w-full" />
      <img
        src="/img/rank-title.webp"
        alt="Hall of Fame"
        className="absolute left-1/2 top-[4.8vw] w-[40.48vw] -translate-x-1/2 transform xl:top-15 xl:w-[506px]"
      />
      <div className="relative mt-[24.56vw] w-full border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-[307px]">
        <DragonBorder className="inset-[0.64vw] -z-10 xl:inset-2" />
        <DragonGameRank />
      </div>
    </div>
  );
};

export default HallOfFame;
