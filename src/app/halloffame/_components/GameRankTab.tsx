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
    top30Key: 'petTopReward' | 'fightTopReward';
    allKey: 'petBasicReward' | 'fightBasicReward';
  }[] = [
    {
      label: 'Dream Pet',
      value: GameRankType.PetOdyssey,
      icon: '/img/game-pet-simulate-icon.png',
      rewardKey: 'PetReward',
      top30Key: 'petTopReward',
      allKey: 'petBasicReward',
    },
    // {
    //   label: 'Infinite Rumble',
    //   value: GameRankType.Rumble,
    //   icon: '/img/game-infinite-ramble-icon.png',
    //   rewardKey: 'FightReward',
    //   top30Key: 'fightTopReward',
    //   allKey: 'fightBasicReward',
    // },
    {
      label: 'Dragon Defense',
      value: GameRankType.Defense,
      icon: '/img/game-dragon-defense-icon.png',
      rewardKey: 'FightReward',
      top30Key: 'fightTopReward',
      allKey: 'fightBasicReward',
    },
  ];

  return (
    <div className={clsxm('grid grid-cols-2', className)}>
      {tabs.map(({ value, label, icon, rewardKey, top30Key, allKey }, index) => {
        const isActive = value === rankType;
        const sumAllReward =
          (roundInfo?.gameRoundInfo?.[top30Key]?.mdbl || 0) +
          (roundInfo?.gameRoundInfo?.[allKey]?.mdbl || 0);
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
                'flex-center gap-[0.48vw] bg-white/10 py-[0.48vw] text-[1.28vw]/[1.28vw] font-semibold xl:gap-1.5 xl:py-1.5 xl:text-base/4',
                {
                  'bg-[#4d442e]/50 text-yellow': isActive,
                },
              )}
            >
              <img src={icon} className="size-[2.4vw] xl:size-7.5" alt="" />
              {label}{' '}
              <span className="text-[1.6vw]/[1.6vw] font-semibold xl:text-xl/5">
                {formatNumber(parseEther(sumAllReward.toString()))}
              </span>
            </h2>
            <div
              className={clsxm('flex items-center justify-center px-[1.28vw] py-[1.6vw] xl:px-5 xl:py-4', {
                'gap-[1.2vw] xl:gap-9': rewardKey === 'PetReward',
                'relative grid grid-cols-2': rewardKey === 'FightReward',
              })}
            >
              {/* <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Season {roundInfo?.gameRoundInfo.round || 1}</p>
                <p className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">{timeLeft}</p>
              </div> */}

              <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">For Top30</p>
                <div className="flex items-center justify-center gap-4">
                  {(roundInfo?.gameRoundInfo?.[top30Key]?.mdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[top30Key].mdbl.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$MDBL</span>
                    </p>
                  )}
                </div>
              </div>
              {top30Key === 'fightTopReward' && (
                <div
                  className={clsxm(
                    'absolute left-1/2 top-1/2 h-[2.88vw] w-[1px] -translate-x-1/2 -translate-y-1/2 transform bg-[#4E4E50] xl:h-9',
                    {
                      'bg-[#938561]': isActive,
                    },
                  )}
                ></div>
              )}
              {top30Key === 'petTopReward' && (
                <div
                  className={clsxm('h-[2.88vw] w-[1px] bg-[#4E4E50] xl:h-9', {
                    'bg-[#938561]': isActive,
                  })}
                ></div>
              )}
              <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="whitespace-nowrap text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">For all including Top30</p>
                <div className="flex items-center justify-center gap-4">
                  {(roundInfo?.gameRoundInfo?.[allKey]?.mdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[allKey].mdbl.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$MDBL</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
