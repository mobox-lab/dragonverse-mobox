import { useMemo } from 'react';
import { GameCfg } from '@/constants/mobox/gamecfg';
import { DragonAttrs } from '@/hooks/useMoboxDragonHelp';
import { elementColors } from '@/constants/mobox/element-colors';
import { parsingElements } from '../_utils/parsing-elements';

type DragonItemProps = {
  data: DragonAttrs;
};
export default function DragonItem({ data }: DragonItemProps) {
  const DragonCfg = useMemo(() => GameCfg.DragonCfg as any, []);
  const elements = useMemo(() => parsingElements(data.elements), [data.elements]);

  return (
    <div className="flex-none border border-gray-600/50 p-[0.32vw] xl:p-1">
      <img
        className="h-[9.44vw] w-[9.2vw] xl:h-[118px] xl:w-[115px]"
        src={`https://img.soulchainz.com/dragonico/${data.prototype}.png`}
        alt="dragon"
      />
      <div className="p-[0.32vw] xl:p-1">
        <div className="flex items-center justify-between">
          <p className="text-[1.12vw]/[1.12vw] font-medium xl:text-sm/[0.875rem]">{DragonCfg[data.prototype].enName}</p>
          <img
            src={`/svg/dragon/element/e${elements[0]}.svg`}
            className="w-[1.12vw] rounded-sm border xl:w-3.5"
            style={{ borderColor: elementColors[elements[0]] }}
            alt="element"
          />
        </div>
        <p className="mt-[0.32vw] text-[0.96vw]/[0.96vw] text-gray-300 xl:mt-1 xl:text-xs/3">#{data.tokenId}</p>
      </div>
    </div>
  );
}
