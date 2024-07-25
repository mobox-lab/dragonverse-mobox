'use client';

import { RankCurrentRound } from '@/apis/types';
import { gameRankTypeAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm } from '@/utils';
import { useAtomValue } from 'jotai';
import InfinityRumbleGameRank from './InfinityRumbleGameRank';
import PetOdysseyGameRank from './PetOdysseyGameRank';
export default function GameRank({ roundInfo }: { roundInfo?: RankCurrentRound }) {
  const rankType = useAtomValue(gameRankTypeAtom);

  return (
      <div className='flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6'>
      {/* 
      <div className="flex w-full items-end justify-between border-b border-gray">
        <div className="flex text-[1.12vw]/[1.76vw] font-semibold text-gray-300 xl:text-sm/5.5">
          <div
            className={clsxm(
              'flex-center w-[11.84vw] cursor-pointer bg-white/10 py-[0.96vw] transition duration-300 hover:bg-white/[0.16] xl:w-[148px] xl:py-3',
              { 'bg-gray text-white hover:bg-gray': rankType === GameRankType.PetOdyssey },
            )}
            onClick={() => setRankType(GameRankType.PetOdyssey)}
          >
            DreamPet Odyssey
          </div>
          <div
            className={clsxm(
              'flex-center w-[11.84vw] cursor-pointer bg-white/10 py-[0.96vw] transition duration-300 hover:bg-white/[0.16] xl:w-[148px] xl:py-3',
              { 'bg-gray text-white hover:bg-gray': rankType === GameRankType.Rumble },
            )}
            onClick={() => setRankType(GameRankType.Rumble)}
          >
            Infinity Rumble
          </div>
          {/* <div
            className={clsxm(
              'flex-center w-[11.84vw] cursor-pointer bg-white/10 py-[0.96vw] transition duration-300 hover:bg-white/[0.16] xl:w-[148px] xl:py-3',
              { 'bg-gray text-white hover:bg-gray': rankType === GameRankType.RainbowLeap },
            )}
            onClick={() => setRankType(GameRankType.RainbowLeap)}
          >
            Rainbow Leap
          </div> 
          <div
            className={clsxm(
              'flex-center w-[11.84vw] cursor-pointer bg-white/10 py-[0.96vw] transition duration-300 hover:bg-white/[0.16] xl:w-[148px] xl:py-3',
              { 'bg-gray text-white hover:bg-gray': rankType === GameRankType.Dragon },
            )}
            onClick={() => setRankType(GameRankType.Dragon)}
          >
            Dash of Dawn
          </div>
        </div>
      </div> */}
      <PetOdysseyGameRank
        className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.PetOdyssey })}
        roundInfo={roundInfo}
      />
      <InfinityRumbleGameRank
        className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Rumble })}
        roundInfo={roundInfo}
      />
      {/* <DragonGameRank className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Dragon })} /> */}
    </div>
  );
}
