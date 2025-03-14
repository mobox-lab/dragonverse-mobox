import Chart from '@/app/mdbl/_components/charts/Chart';
import LBPPriceDetail from '@/app/mdbl/_components/charts/LBPPriceDetail';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { clsxm } from '@/utils';
import { isMobile } from 'react-device-detect';

export default function LBPPriceChart({ className }: { className?: string }) {
  return (
    <div
      className={clsxm(
        'relative z-10 h-[39.28vw] flex-grow border border-gray-600 bg-[#111111]/60 px-[1.6vw] py-[1.92vw] backdrop-blur-sm xl:h-[491px] xl:px-5 xl:py-7.5',
        className,
      )}
    >
      <PatternWithoutLine />
      <LBPPriceDetail />
      <div
        className={clsxm('h-[22.4vw] w-full overflow-visible text-[0.96vw]/[1.6vw] xl:h-70 xl:text-xs/5 xs:h-44', {
          'h-[32.5vw]': isMobile,
        })}
      >
        <Chart />
      </div>
      <div className={clsxm('flex-center mt-[1.28vw] gap-[1.92vw] xl:mt-4 xl:gap-6', { '-mt-[15vw]': isMobile })}>
        <div className="flex items-center gap-[0.48vw] text-[0.96vw]/[0.96vw] xl:gap-1.5 xl:text-xs/3">
          <div className="h-[0.8vw] w-[0.8vw] rounded-full bg-gradient-chart-yellow xl:h-2.5 xl:w-2.5" />
          Historical Price
        </div>
        <div className="flex items-center gap-[0.48vw] text-[0.96vw]/[0.96vw] xl:gap-1.5 xl:text-xs/3">
          <div className="h-[0.8vw] w-[0.8vw] rounded-full bg-gradient-chart-yellow opacity-35 xl:h-2.5 xl:w-2.5" />
          Future Price (if no new demand)
        </div>
      </div>
    </div>
  );
}
