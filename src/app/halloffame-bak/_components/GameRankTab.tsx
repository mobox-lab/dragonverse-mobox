import { gameRankTypeAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm } from '@/utils';
import { useAtom } from 'jotai';
import GameRankTabActiveBorder from './GameRankTabActiveBorder';
import { RankCurrentRound } from '@/apis/types';
import useCountdown from '@/hooks/useCountdown';
import ReactGA from 'react-ga4';

export default function GameRankTab({ className, roundInfo }: { className?: string; roundInfo?: RankCurrentRound }) {
  const [rankType, setRankType] = useAtom(gameRankTypeAtom);

  const timeLeft = useCountdown(roundInfo?.gameRoundInfo.endTime, 1000, '');
  const tabs: { label: string; value: GameRankType; icon: string; rewardKey: 'PetReward' | 'FightReward' }[] = [
    {
      label: 'DreamPet Odyssey',
      value: GameRankType.PetOdyssey,
      icon: '/img/game-pet-simulate-icon.png',
      rewardKey: 'PetReward',
    },
    {
      label: 'Infinity Ramble',
      value: GameRankType.Rumble,
      icon: '/img/game-infinite-ramble-icon.png',
      rewardKey: 'FightReward',
    },
  ];

  return (
    <div className={clsxm('grid grid-cols-2', className)}>
      {tabs.map(({ value, label, icon, rewardKey }, index) => {
        const isActive = value === rankType;
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
                'flex-center gap-[0.48vw] bg-white/10 py-[0.32vw] text-[1.28vw]/[1.28vw] font-semibold xl:gap-1.5 xl:py-1 xl:text-base/4',
                {
                  'bg-[#4d442e]/50 text-yellow': isActive,
                },
              )}
            >
              <img src={icon} className="size-[2.4vw] xl:size-7.5" alt="" />
              {label}
            </h2>
            <div
              className={clsxm('flex items-center justify-center px-[1.28vw] py-[1.6vw] xl:px-5 xl:py-4', {
                'gap-[2.88vw] xl:gap-9': rewardKey === 'PetReward',
                'relative grid grid-cols-2': rewardKey === 'FightReward',
              })}
            >
              <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Round {roundInfo?.gameRoundInfo.round || 1}</p>
                <p className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">{timeLeft}</p>
              </div>
              {rewardKey === 'FightReward' && (
                <div className="absolute left-1/2 top-1/2 h-[2.88vw] w-[1px] -translate-x-1/2 -translate-y-1/2 transform bg-[#4E4E50] xl:h-9"></div>
              )}

              <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Prize Pool</p>
                <div className="flex items-center justify-center gap-4">
                  {(roundInfo?.gameRoundInfo?.[rewardKey]?.emdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[rewardKey].emdbl}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;eMDBL</span>
                    </p>
                  )}
                  {(roundInfo?.gameRoundInfo?.[rewardKey]?.mdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[rewardKey].mdbl}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$MDBL</span>
                      {rewardKey === 'PetReward' && <span className="text-green">(Top 30)</span>}
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
