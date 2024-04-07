import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { clsxm } from '@/utils';

export default function Summary() {
  return (
    <div className="mt-[4vw] flex items-center justify-between xl:mt-12.5">
      <img src="/img/stake.webp" alt="stake to earn" className="w-[34.24vw] xl:w-[428px]" />
      <div
        className={clsxm(
          'relative  h-[10.24vw] w-[48vw]  border border-yellow/50 bg-black/60 backdrop-blur-sm xl:h-[128px] xl:w-[600px]',
        )}
      >
        <PatternWithoutLine className="stroke-yellow" />
        <div className="absolute left-1/2 top-1/2 h-[3.84vw] w-[1px] -translate-x-1/2 -translate-y-1/2 transform bg-yellow/50 xl:h-12"></div>
        <div className="relative grid h-full grid-cols-2">
          <div className="flex-center h-full flex-col">
            <div className="text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">Total eMDBL</div>
            <div className="mt-[0.48vw] text-[1.92vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-2xl/7.5">
              800,009,887
            </div>
            <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] text-gray-300 xl:mt-1 xl:text-sm/6">$ 3,200,039.82</div>
          </div>
          <div className="flex-center h-full flex-col">
            <div className="text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">Daily Reward</div>
            <div className="mt-[0.48vw] text-[1.92vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-2xl/7.5">
              800,009,887
            </div>
            <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] text-gray-300 xl:mt-1 xl:text-sm/6">$ 3,200,039.82</div>
          </div>
        </div>
      </div>
    </div>
  );
}
