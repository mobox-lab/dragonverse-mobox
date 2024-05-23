'use client';

import { clsxm } from '@/utils';
import { CDN_URL } from '@/constants';
import { isMobile } from 'react-device-detect';
import Swap from '@/app/mdbl/_components/swap/Swap';
import RewardV3 from '@/app/mdbl/_components/RewardV3';
import WeightInfo from '@/app/mdbl/_components/WeightInfo';
import { Countdown } from '@/app/mdbl/_components/Countdown';
import useLBPContractReads from '@/hooks/lbp/useLBPContractReads';
import TradeHistories from '@/app/mdbl/_components/TradeHistories';
import LBPPriceChart from '@/app/mdbl/_components/charts/LBPPriceChart';

export default function MDBL() {
  useLBPContractReads();

  return (
    <main className="px-[3.2vw] pb-[3.84vw] xl:pb-12">
      <video
        className="absolute left-1/2 top-0 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        src={`${CDN_URL}/dragon-banner-04.webm`}
        poster="/img/mdbl-banner.webp"
      />
      <div className="relative flex flex-col">
        <img
          src="/img/mdbl-title.webp"
          alt="fair launch"
          className="absolute -top-[4.8vw] left-0 w-[40.4vw] xl:-top-15 xl:w-[505px]"
        />
        <div className="mt-[17.92vw] flex justify-between xl:mt-[224px]">
          <Countdown />
          <WeightInfo />
        </div>
        <div
          className={clsxm('mt-[1.92vw] flex w-full items-center gap-[1.6vw] xl:mt-6 xl:gap-5', {
            'flex-wrap items-stretch': isMobile,
          })}
        >
          <LBPPriceChart className={clsxm({ 'h-auto w-full overflow-hidden': isMobile })} />
          <div className={clsxm({ 'grid flex-grow grid-cols-3 gap-[1.6vw] xl:gap-5': isMobile }, 'relative z-10')}>
            <Swap className={clsxm('w-[28.16vw] xl:w-[352px]', { 'h-auto': isMobile })} />
            {isMobile && <RewardV3 className="col-span-2 mt-0 h-auto" />}
          </div>
        </div>
        {!isMobile && <RewardV3 />}
        <div className="mt-[1.6vw] border border-gray-600 bg-[#111111]/60 backdrop-blur-sm xl:mt-5">
          <TradeHistories className="basis-full" />
        </div>
      </div>
    </main>
  );
}
