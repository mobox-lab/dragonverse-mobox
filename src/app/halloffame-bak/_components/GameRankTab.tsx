import { gameRankTypeAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm } from '@/utils';
import { useAtom } from 'jotai';
import GameRankTabActiveBorder from './GameRankTabActiveBorder';
import { RankCurrentRound } from '@/apis/types';
import useCountdown from '@/hooks/useCountdown';

export default function GameRankTab({ className, roundInfo }: { className?: string; roundInfo?: RankCurrentRound }) {
  const [rankType, setRankType] = useAtom(gameRankTypeAtom);

  const timeLeft = useCountdown(roundInfo?.gameRoundInfo.endTime, 1000, '');
  const tabs = [
    { label: 'DreamPet Odyssey', value: GameRankType.PetOdyssey, icon: '/img/game-pet-simulate-icon.png' },
    { label: 'Infinity Ramble', value: GameRankType.Rumble, icon: '/img/game-infinite-ramble-icon.png' },
  ];

  const renderItem = (target: GameRankType) => {
    if (target === GameRankType.PetOdyssey) {
      return {
        percent: `(${(roundInfo?.gameRoundInfo.rewardRatio.pet || 0) * 100}%)`,
        emdbl: parseInt(
          ((roundInfo?.gameRoundInfo.currentReward.emdbl || 0) * (roundInfo?.gameRoundInfo.rewardRatio.pet || 0)).toFixed(2),
        ),
        mdbl: parseInt(
          ((roundInfo?.gameRoundInfo.currentReward.mdbl || 0) * (roundInfo?.gameRoundInfo.rewardRatio.pet || 0)).toFixed(2),
        ),
      };
    } else if (target === GameRankType.Rumble) {
      return {
        percent: `(${(roundInfo?.gameRoundInfo.rewardRatio.fight || 0) * 100}%)`,
        emdbl: parseInt(
          ((roundInfo?.gameRoundInfo.currentReward.emdbl || 0) * (roundInfo?.gameRoundInfo.rewardRatio.fight || 0)).toFixed(2),
        ),
        mdbl: parseInt(
          ((roundInfo?.gameRoundInfo.currentReward.mdbl || 0) * (roundInfo?.gameRoundInfo.rewardRatio.fight || 0)).toFixed(2),
        ),
      };
    } else {
      return {
        percent: null,
        emdbl: 0,
        mdbl: 0,
      };
    }
  };
  return (
    <div className={clsxm('flex-center', className)}>
      {tabs.map(({ value, label, icon }, index) => {
        const isActive = value === rankType;
        return (
          <div
            key={value}
            className={clsxm('relative flex w-[33.6vw] cursor-pointer select-none flex-col bg-white/5 xl:w-[420px]', {
              'bg-[#4d442e]/50': isActive,
            })}
            onClick={() => setRankType(value)}
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
            <div className="flex items-center px-[1.28vw] py-[1.6vw] xl:px-5 xl:py-4">
              <div className="flex w-[9.76vw] flex-col items-center gap-[0.64vw] xl:w-[122px] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Round {roundInfo?.gameRoundInfo.round || 1}</p>
                <p className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">{timeLeft}</p>
              </div>
              <div className="flex flex-grow flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                  Prize Pool <span className="text-green">{renderItem(value).percent}</span>
                </p>
                <div className="flex items-center justify-center gap-4">
                  <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                    {renderItem(value).emdbl} <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">eMDBL</span>
                  </p>
                  <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                    {renderItem(value).mdbl} <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">$MDBL</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
