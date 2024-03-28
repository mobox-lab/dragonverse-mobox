import { LBPRewardDialogOpenAtom } from '@/atoms';
import { useAtom } from 'jotai';
import Dialog from '.';
import RankTable from '../table/RankTable';
import { generateRewardData } from '@/constants/reward';
import { useRewardColumns } from '@/hooks/useRewardColums';

export default function LBPRewardDialog() {
  const [isOpen, setIsOpen] = useAtom(LBPRewardDialogOpenAtom);
  const rewardData = generateRewardData();
  const columns = useRewardColumns();
  return (
    <Dialog
      open={isOpen}
      className="h-auto w-[62.4vw] xl:h-[700px] xl:w-[780px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div>
          <h1 className="text-center text-[1.6vw]/[1.6vw] font-medium xl:text-xl/5">LBP Reward Chart</h1>
          <div className="mt-[2.56vw] text-center text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">
            Snapshot of your $MDBL balance will be taken by the end of the LBP, rewards displayed on the following chart will be
            distributed based on the Snapshot. Details:
          </div>
          <div className="mt-[1.92vw] px-[1.28vw] text-center text-[1.12vw]/[1.92vw] italic text-yellow xl:mt-5 xl:px-6 xl:text-sm/6">
            {'Get 1 M-Bluebox for every 0.6% share holding; Get 1 M-Musicbox for every 0.1% share holding'}
            <br />
            (i.e. 0.6% = 1 M-Bluebox; 0.8% = 1 M-Bluebox + 2 M-Musicboxes)
          </div>
          <div className="mt-[2.72vw] text-center text-[1.6vw]/[1.92vw] font-medium xl:mt-[34px] xl:text-xl/6">
            Reward Chart
          </div>
          <div className="mt-[0.64vw] text-center text-[0.96vw]/[1.6vw] text-gray-300 xl:mt-2 xl:text-xs/5">
            Partial data only, swipe down to view more
          </div>

          <RankTable
            className="mt-[1.6vw] max-h-[35.68vw] overflow-x-auto xl:mt-5 xl:max-h-[340px]"
            dataSource={rewardData}
            columns={columns}
            renderBottom={() => (
              <div className="pt-[0.96vw] text-center text-[0.96vw]/[1.92vw] font-medium xl:pt-3 xl:text-xs/7">
                And so forth.
              </div>
            )}
          />
        </div>
      )}
    />
  );
}
