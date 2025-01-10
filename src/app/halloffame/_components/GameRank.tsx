'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import { GameRound, RankCurrentRound } from '@/apis/types';
import { gameRankTypeAtom, rankAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm, openLink } from '@/utils';
import { useFetchGameRoundList } from '@/hooks/rank/useFetchGameRoundList';
import InfinityRumbleGameRank from './InfinityRumbleGameRank';
import PetOdysseyGameRank from './PetOdysseyGameRank';
import ChangeRoundButton from './ChangeRoundButton';
import DefenseGameRank from './DefenseGameRank';

export default function GameRank({ roundInfo }: { roundInfo?: RankCurrentRound }) {
  const rankType = useAtomValue(gameRankTypeAtom);
  const { data: roundList } = useFetchGameRoundList();
  const [currentRound, setCurrentRound] = useAtom(rankAtom);

  const roundChange = (round: GameRound) => {
    if (round.round > 8) {
      openLink('/halloffame');
    } else {
      setCurrentRound(round);
    }
  };

  useEffect(() => {
    if (roundList?.list && roundList?.list.length) {
      // const roundMax = roundList?.list.find((round) => round.round === 8);
      setCurrentRound(roundList.list[roundList.list.length - 1]);
    }
  }, [roundList]);

  return (
    <div className="flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6">
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
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <div className="flex select-none items-center gap-[0.96vw] text-[1.28vw]/[1.44vw] xl:gap-3 xl:text-base/4.5">
            Season {currentRound?.round} :{' '}
            {currentRound
              ? `${dayjs(currentRound.startTime * 1000).format('MMM DD')} - ${dayjs(currentRound.endTime * 1000).format('MMM DD')}`
              : null}
            <ChangeRoundButton roundList={roundList?.list ?? []} currentRound={currentRound} onChange={roundChange} />
          </div>
          <p className="text-[0.96vw]/[1.6vw] font-medium xl:text-xs/5">Updated every 5 minutes</p>
        </div>
        <PetOdysseyGameRank
          className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.PetOdyssey })}
          round={currentRound?.round}
        />
        <InfinityRumbleGameRank
          className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Rumble })}
          round={currentRound?.round}
        />
        <DefenseGameRank
          className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Defense })}
          round={currentRound?.round}
        />
        {/* <DragonGameRank className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Dragon })} /> */}
      </div>
    </div>
  );
}
