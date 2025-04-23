import { stakeHistoryDialogOpenAtom } from '@/atoms';
import { refetchPendingCountAtom } from '@/atoms/stake';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import Dialog from '..';
import StakeHistoryList from './_components/StakeHistoryList';
import StakePendingList from './_components/StakePendingList';

export default function StakeHistoryDialog() {
  const [isOpen, setIsOpen] = useAtom(stakeHistoryDialogOpenAtom);
  const refetchPendingCount = useAtomValue(refetchPendingCountAtom);

  useEffect(() => {
    if (isOpen) refetchPendingCount?.();
  }, [isOpen, refetchPendingCount]);

  return (
    <Dialog
      open={isOpen}
      className="h-[62.88vw] w-[80vw] xl:h-[786px] xl:w-[1000px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div>
          <h1 className="text-[1.6vw]/[2.4vw] font-semibold xl:text-xl/7.5">Pending</h1>
          <StakePendingList />
          <h1 className="mt-[2.88vw] text-[1.6vw]/[2.4vw] font-semibold xl:mt-9 xl:text-xl/7.5">History</h1>
          <StakeHistoryList />
        </div>
      )}
    />
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
