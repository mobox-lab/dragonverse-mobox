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
    <div className="flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6">
      <PetOdysseyGameRank
        className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.PetOdyssey })}
        roundInfo={roundInfo}
      />
      <InfinityRumbleGameRank
        className={clsxm('mt-[1.44vw] xl:mt-4.5', { 'clip-hidden': rankType !== GameRankType.Rumble })}
        roundInfo={roundInfo}
      />
    </div>
  );
}
