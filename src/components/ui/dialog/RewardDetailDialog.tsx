import { rewardDetailDialogAtom } from '@/atoms/stake';
import { useAtom } from 'jotai';
import Dialog from '.';
import { useFetchDailyReward } from '@/hooks/stake/useFetchDailyReward';
import { formatNumber } from '@/utils';

export default function RewardDetailDialog() {
  const [isOpen, setIsOpen] = useAtom(rewardDetailDialogAtom);
  const { data } = useFetchDailyReward();
  return (
    <Dialog
      open={isOpen}
      contentClassName="p-0 xl:p-0"
      className="w-[48vw] xl:w-[600px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div className="flex flex-col">
          <div className="p-[2.88vw] pb-[3.2vw] text-center xl:p-6 xl:pb-10">
            <h1 className="flex items-center justify-center gap-[0.32vw] text-[1.6vw]/[2.4vw] font-semibold text-yellow xl:gap-1 xl:text-xl/7.5">
              <img src="/img/mdbl.webp" alt="mdbl" className="h-[2.4vw] w-[2.4vw] xl:h-7.5 xl:w-7.5" />
              eMDBL Reward
            </h1>

            <div className="mt-[2.4vw] flex h-[2.88vw] w-full items-center bg-blue-300/30 px-[1.28vw] text-[0.96vw]/[1.6vw] xl:mt-7.5 xl:h-9 xl:px-4 xl:text-xs/5">
              Current Daily Reward: {formatNumber(BigInt(data?.currentDayReward || 0), false)}
            </div>
            <p className="mt-[2.4vw] text-[1.12vw]/[1.92vw] font-medium xl:mt-7.5 xl:text-sm/6">
              eMDBL reward will be proportionate to the Current Daily Reward:
            </p>
            <p className="mt-[1.28vw] text-[1.12vw]/[1.92vw] font-medium italic text-yellow xl:mt-4 xl:text-sm/6">
              My Boosted eMDBL = My eMDBL * (1 + My Boost Rate)
            </p>
            <div className="mt-[0.96vw] flex items-center justify-center gap-[0.64vw] text-[1.12vw]/[1.92vw] font-medium italic text-yellow xl:mt-3 xl:gap-2 xl:text-sm/6">
              My Daily Reward =
              <div className="flex flex-col items-center">
                <span>My Boosted eMDBL</span>
                <div className="h-px w-[10.56vw] bg-yellow xl:w-[150px]" />
                <span>Total Boosted eMDBL</span>
              </div>
              * Current Daily Reward
            </div>
            {/* <div classNamce="mb-[3.2vw] mt-[2.88vw] h-px bg-white/25 xl:mb-10 xl:mt-9" /> */}
          </div>
          {/* <div className="relative h-[16vw] xl:h-[200px]">
            <img src="/img/reward-detail-bg.webp" draggable={false} className="absolute inset-0 h-[16vw] xl:h-[200px]" alt="" />
            <p className="whitespace-pre-wrap pt-[3.2vw] text-center text-[1.92vw]/[2.88vw] font-semibold tracking-[0.32vw] text-gray-300 xl:pt-10 xl:text-2xl/9 xl:tracking-[4px]">
              {'COMING\nSOON'}
            </p>
          </div> */}
        </div>
      )}
    />
  );
}
