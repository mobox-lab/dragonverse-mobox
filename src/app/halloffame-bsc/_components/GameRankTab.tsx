import { gameRankTypeAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm, formatNumber } from '@/utils';
import { useAtom } from 'jotai';
import GameRankTabActiveBorder from './GameRankTabActiveBorder';
import { RankCurrentRound } from '@/apis/types';
import ReactGA from 'react-ga4';
import { parseEther } from 'viem';

export default function GameRankTab({ className, roundInfo }: { className?: string; roundInfo?: RankCurrentRound }) {
  const [rankType, setRankType] = useAtom(gameRankTypeAtom);

  const tabs: {
    label: string;
    value: GameRankType;
    icon: string;
    rewardKey: 'PetReward' | 'FightReward';
    top30Key: 'bscPetTopReward' | 'bscFightTopReward';
    allKey: 'bscPetBasicReward' | 'bscFightBasicReward';
  }[] = [
    {
      label: 'Dream Pet',
      value: GameRankType.PetOdyssey,
      icon: '/img/game-pet-simulate-icon.png',
      rewardKey: 'PetReward',
      top30Key: 'bscPetTopReward',
      allKey: 'bscPetBasicReward',
    },
    {
      label: 'Infinite Rumble',
      value: GameRankType.Rumble,
      icon: '/img/game-infinite-ramble-icon.png',
      rewardKey: 'FightReward',
      top30Key: 'bscFightTopReward',
      allKey: 'bscFightBasicReward',
    },
  ];

  return (
    <div className={clsxm('grid grid-cols-2', className)}>
      {tabs.map(({ value, label, icon, rewardKey, top30Key, allKey }, index) => {
        const isActive = value === rankType;
        const sumAllReward =
          (roundInfo?.gameRoundInfo?.[top30Key]?.mbox || 0) + (roundInfo?.gameRoundInfo?.[allKey]?.mbox || 0);
        return (
          <div
            key={value}
            className={clsxm('relative flex-grow cursor-pointer select-none flex-col bg-white/5', {
              'bg-[#4d442e]/50': isActive,
            })}
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'game_tab', label: value });
              setRankType(value);
            }}
          >
            {isActive && <GameRankTabActiveBorder />}
            <h2
              className={clsxm(
                'flex-center gap-[0.48vw] bg-white/10 py-[0.96vw] text-[1.28vw]/[1.28vw] font-semibold xl:gap-1.5 xl:py-3 xl:text-base/4',
                {
                  'bg-[#4d442e]/50 text-yellow': isActive,
                },
              )}
            >
              <img src={icon} className="size-[2.4vw] xl:size-7.5" alt="" />
              {label}&nbsp;&nbsp;
              <span className="text-[1.6vw]/[1.6vw] font-semibold xl:text-xl/5">
                {formatNumber(parseEther(sumAllReward.toString()))}
                &nbsp;$MBOX
              </span>
            </h2>
          </div>
        );
      })}
    </div>
  );
}
