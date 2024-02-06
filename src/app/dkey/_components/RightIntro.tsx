import DragonBorder from '@/app/_components/DragonBorder';
import { clsxm } from '@/utils';

export default function RightIntro({ className }: { className?: string }) {
  return (
    <div
      className={clsxm(
        'relative flex max-w-[31.36vw] flex-col items-center gap-[3.2vw] px-[3vw] py-[3.52vw] text-center xl:max-w-[392px] xl:gap-10 xl:px-7.5 xl:py-11',
        className,
      )}
    >
      <DragonBorder className="inset-2 -z-10" />
      <div className="flex flex-col items-center">
        <img src="/img/merlin-chain.png" alt="" className="aspect-square w-[3.84vw] xl:w-12" />
        <h1 className="mt-4 text-base/5 font-bold">Merlin Chain</h1>
        <p className="mt-2 text-xs/5 font-medium">
          EVM-compatible Bitcoin Layer2 solution. Merlin Chain is committed to driving innovation and unleashing the potential
          of BTC Layer1 assets on Layer2, to Make Bitcoin Fun Again.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/img/dbal.png" alt="" className="aspect-square w-[3.84vw] xl:w-12" />
        <h1 className="mt-4 text-base/5 font-bold">DBAL</h1>
        <p className="mt-2 text-xs/5 font-medium">
          EVM-compatible Bitcoin Layer2 solution. Merlin Chain is committed to driving innovation and
        </p>
      </div>
      <div className="flex flex-col items-center">
        <img src="/img/dbal_qi.png" alt="" className="aspect-square w-[3.84vw] xl:w-12" />
        <h1 className="mt-4 text-base/5 font-bold">DBAL QI</h1>
        <p className="mt-2 text-xs/5 font-medium">
          EVM-compatible Bitcoin Layer2 solution. Merlin Chain is committed to driving innovation and
        </p>
      </div>
    </div>
  );
}
