import ArrowSvg from '@/../public/svg/arrow-03.svg?component';
import Arrow2Svg from '@/../public/svg/arrow-02.svg?component';

export default function StakeBuff() {
  return (
    <div>
      <div className="flex items-center justify-between font-medium">
        <p className="text-sm">My Buff:</p>
        <p className="flex-center text-yellow">
          Total&nbsp;<span className="text-2xl/6">0%</span>
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between border border-gray-600/50 bg-gray-700/60 p-3.5">
          <div className="flex items-center gap-2">
            <img src="/img/dragon-ball.webp" className="w-5" alt="modragon" />
            <a
              href="https://brc420.io/market?tick=5c08b897e129bef286d9d8be8cc36a09e4eccbe81b12e22cd50de413d12d836ci0"
              target="_blank"
              className="text-link flex items-center gap-0.5 text-sm font-medium"
            >
              Dragon Ball/M-Dragon Ball <ArrowSvg className="w-3.5" />
            </a>
          </div>
          <p className="pr-4 text-base font-medium text-yellow">1.1%</p>
        </div>
        <div className="flex items-center justify-between border border-gray-600/50 bg-gray-700/60 p-3.5">
          <div className="flex items-center gap-2">
            <img src="/img/modragon-nft-rare.webp" className="w-5" alt="modragon" />
            <a
              href="https://www.mobox.io/#/iframe/dragonmo"
              target="_blank"
              className="text-link flex items-center gap-0.5 text-sm font-medium"
            >
              Get MODragon <ArrowSvg className="w-3.5" />
            </a>
          </div>
          <div>
            <div className="flex-center gap-1.5">
              <p className="text-base font-medium text-yellow">1.1%</p>
              <Arrow2Svg className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <a className="text-link text-xs/4.5" href="https://www.mobox.io/#/iframe/dragonmo" target="_blank">
          Check MODragon Details
        </a>
      </div>
    </div>
  );
}
