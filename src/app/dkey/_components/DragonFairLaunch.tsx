import DragonBorder from '@/app/_components/DragonBorder';
import { clsxm } from '@/utils';
import React from 'react';
import RightIntro from './RightIntro';
import MintedReferralBonus from './MintedReferralBonus';
import MintRecords from './MintRecords';

const isMinted = false;
export default function DragonFairLaunch({ className }: { className?: string }) {
  return (
    <div className={clsxm('flex flex-col', className)}>
      <div className="relative self-start border border-gray-600 bg-black/60 p-[1.28vw] text-sm/6 font-semibold backdrop-blur-sm xl:p-4">
        <p className="flex items-center gap-1.5">
          <span className="text-green">Feb 1:&nbsp;&nbsp;</span> DBALL QI
          <img src="/img/dbal_qi.png" alt="" className="aspect-square w-[1.6vw] xl:w-5" /> launch
        </p>
        <p className="flex items-center gap-1.5">
          <span className="text-green">Feb 21: </span> Claim DBAL
          <img src="/img/dbal.png" alt="" className="aspect-square w-[1.6vw] xl:w-5" /> on Merlin Chain Mainnet
        </p>
        <p className="flex items-center gap-1.5">
          <span className="text-green">Feb 21: </span> Dragonverse Neo Bitcoin Native Version Launch
        </p>
      </div>
      {isMinted ? (
        <div className="relative mt-[1.12vw] flex flex-wrap border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-3.5">
          <div className="relative flex-grow px-[3vw] py-[3.52vw] xl:px-7.5 xl:py-11">DBALL QI</div>
          <MintedReferralBonus />
          <MintRecords className="basis-full" />
        </div>
      ) : (
        <div className="relative mt-[1.12vw] flex flex-wrap border border-gray-600 bg-black/60 backdrop-blur-sm xl:mt-3.5">
          <div className="relative flex-grow px-[3vw] py-[3.52vw] xl:px-7.5 xl:py-11">
            <DragonBorder className="inset-2 -z-10" />
            DBALL QI
          </div>
          <RightIntro />
          <MintRecords className="basis-full" />
        </div>
      )}
    </div>
  );
}
