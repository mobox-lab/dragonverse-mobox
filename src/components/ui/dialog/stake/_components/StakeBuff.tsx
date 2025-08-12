import Arrow2Svg from '@/../public/svg/arrow-02.svg?component';
import ArrowSvg from '@/../public/svg/arrow-03.svg?component';
import { useFetchStakeBuff } from '@/hooks/stake/useFetchStakeBuff';
import { useMainAccount } from '@/hooks/wallet';
import { clsx } from 'clsx';
import { useState } from 'react';

const DRAGON_BUFF = [
  { icon: '/img/modragon-common.webp', text: 'Common', style: 'text-common' },
  { icon: '/img/modragon-uncommon.webp', text: 'Uncommon', style: 'text-uncommon' },
  { icon: '/img/modragon-rare.webp', text: 'Rare', style: 'text-rare' },
  { icon: '/img/modragon-epic.webp', text: 'Epic', style: 'text-epic' },
];

export default function StakeBuff() {
  const { majorAddress } = useMainAccount();
  const { data: stakeBuff } = useFetchStakeBuff(majorAddress);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const onDetailClick = () => setIsShowDetail((status) => !status);

  return (
    <div>
      <div className="flex items-center justify-between font-medium">
        <p className="text-sm">My Boost Rate:</p>
        <p className="flex-center text-yellow">
          Total&nbsp;&nbsp;<span className="text-2xl/6">{(stakeBuff?.totalBuff ?? 0) / 10}%</span>
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between border border-gray-600/50 bg-gray-700/60 p-3.5">
          <div className="flex items-center gap-2">
            <img src="/img/dragon-ball.webp" className="w-5" alt="modragon" />
            {stakeBuff?.dragonBallCount ? (
              <div className="flex items-center gap-3 text-sm font-medium">
                <span>Dragon Ball</span>
                <span>x{stakeBuff.dragonBallCount}</span>
              </div>
            ) : (
              <a
                href="https://brc420.io/market?tick=5c08b897e129bef286d9d8be8cc36a09e4eccbe81b12e22cd50de413d12d836ci0"
                target="_blank"
                className="text-link flex items-center gap-0.5 text-sm font-medium"
              >
                Get Dragon Ball/M-Dragon Ball <ArrowSvg className="w-3.5" />
              </a>
            )}
          </div>
          {stakeBuff?.dragonBallBuff ? (
            <p className="pr-4 text-base font-medium text-yellow">{(stakeBuff?.dragonBallBuff ?? 0) / 10}%</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between border border-gray-600/50 bg-gray-700/60 p-3.5">
          <div className="flex items-center gap-2">
            <img src="/img/modragon-nft-rare.webp" className="w-5" alt="modragon" />
            {stakeBuff?.dragonCount ? (
              <div className="flex items-center gap-3 text-sm font-medium">
                <span>MODragon</span>
                <span>x{stakeBuff.dragonCount}</span>
              </div>
            ) : (
              <a
                href="https://www.mobox.io/#/iframe/dragonmo"
                target="_blank"
                className="text-link flex items-center gap-0.5 text-sm font-medium"
              >
                Get MODragon <ArrowSvg className="w-3.5" />
              </a>
            )}
          </div>
          <div>
            {stakeBuff?.dragonTotalBuff ? (
              <div className="flex-center cursor-pointer gap-1.5 pl-8" onClick={onDetailClick}>
                <p className="text-base font-medium text-yellow">{(stakeBuff?.dragonTotalBuff ?? 0) / 10}%</p>
                <Arrow2Svg
                  className={clsx('w-[0.64vw] fill-white transition-all xl:w-2', isShowDetail ? 'rotate-180' : 'rotate-0')}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={clsx('origin-top overflow-hidden transition-all duration-300', isShowDetail ? 'max-h-[500px]' : 'max-h-0')}
        >
          {stakeBuff?.dragonBuffDetail.map((item) => (
            <div
              key={item.quality}
              className="flex items-center justify-between border-b border-gray px-3.5 py-2.5 text-sm font-medium"
            >
              <div className="flex items-center text-sm">
                <img src={DRAGON_BUFF[item.quality - 1].icon} className="w-5" alt={item.quality.toString()} />
                <p className={clsx('ml-1.5 w-24', DRAGON_BUFF[item.quality - 1].style)}>{DRAGON_BUFF[item.quality - 1].text}</p>
                x{item.dragonCount}
              </div>
              <div className="mr-3">
                Total Hash Rate <span className="text-yellow">{item.dragonPower}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
