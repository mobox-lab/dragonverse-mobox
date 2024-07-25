import Arrow2Svg from '@/../public/svg/arrow-02.svg?component';
import { GameRound } from '@/apis/types';
import Popover from '@/components/ui/popover';
import { clsxm } from '@/utils';
import { useState } from 'react';
import ReactGA from 'react-ga4';

export default function ChangeRoundButton({
  roundList,
  currentRound,
  onChange,
}: {
  roundList: GameRound[];
  currentRound?: GameRound;
  onChange: (round: GameRound) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      render={() => (
        <div className="flex flex-col items-center gap-[0.32vw] border border-gray-600 bg-gray-750 p-[0.48vw] xl:gap-1 xl:p-1.5">
          {roundList.map((item) => {
            return (
              <div
                key={item.round}
                className={clsxm(
                  'cursor-pointer rounded-[0.16vw] px-[0.8vw] py-[0.64vw] text-left text-[0.96vw]/[1.44vw] hover:bg-white/10 xl:rounded-sm xl:px-2.5 xl:py-2 xl:text-xs/4.5',
                  { 'bg-white/10': currentRound?.round === item.round },
                )}
                onClick={() => {
                  ReactGA.event({ category: 'merlin', action: 'round_switch', label: item.round.toString() });
                  onChange?.(item);
                  setIsOpen(false);
                }}
              >
                Season {item.round}
              </div>
            );
          })}
        </div>
      )}
    >
      <div className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer rounded-[2px] bg-white/10 backdrop-blur-xl xl:h-10 xl:w-10">
        <Arrow2Svg className={clsxm('w-[0.8vw] fill-white transition-all xl:w-2.5', isOpen ? 'rotate-0' : 'rotate-180')} />
      </div>
    </Popover>
  );
}
