import Arrow2Svg from '@/../public/svg/arrow-02.svg?component';
import { GameRound } from '@/apis/types';
import Popover from '@/components/ui/popover';
import { clsxm } from '@/utils';
import { useState } from 'react';

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
      className="xl"
      render={() => (
        <div className="w-[16vw] items-start border border-gray-600 bg-gray-750 px-[0.48vw] xl:w-[200px] xl:p-1.5">
          {roundList.map((item) => {
            return (
              <div
                key={item.round}
                className={clsxm(
                  'cursor-pointer rounded-[0.16vw] px-[0.8vw] py-[0.64vw] text-left hover:bg-white/10 xl:rounded-sm xl:px-2.5 xl:py-2',
                  { 'bg-white/10': currentRound?.round === item.round },
                )}
                onClick={() => {
                  onChange?.(item);
                  setIsOpen(false);
                }}
              >
                Round {item.round}
              </div>
            );
          })}
        </div>
      )}
    >
      <div className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer rounded bg-white/10 backdrop-blur-xl xl:h-10 xl:w-10">
        <Arrow2Svg className={clsxm('w-2.5 transition-all', isOpen ? 'rotate-0' : 'rotate-180')} />
      </div>
    </Popover>
  );
}
