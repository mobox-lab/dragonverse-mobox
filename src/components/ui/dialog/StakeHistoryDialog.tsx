import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { stakeHistoryDialogOpenAtom } from '@/atoms';
import { useStakeHistoryColumns } from '@/hooks/stake/useStakeHistoryColumns';
import { useStakePendingHistoryColumns } from '@/hooks/stake/useStakePendingHistoryColumns';
import { clsxm } from '@/utils';
import { useAtom } from 'jotai';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo } from 'react';
import Dialog from '.';
import Button from '../button';
import RankTable from '../table/RankTable';

export default function StakeHistoryDialog() {
  const [isOpen, setIsOpen] = useAtom(stakeHistoryDialogOpenAtom);
  const columns = useStakeHistoryColumns();
  const pendingColumns = useStakePendingHistoryColumns();

  const hasMore = useMemo(() => {
    // return page * size < (data?.totalCount ?? 0);
  }, []);

  const changePage = useCallback((page: number) => {
    //   const hasMore = (page - 1) * size < (data?.totalCount ?? 0);
    //   if (page === 0 || !hasMore) return;
    //   setPage(page);
    //   setInputValue(page + '');
  }, []);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    // try {
    //   const newPage = Number(e.target.value);
    //   if (isNaN(newPage)) return;
    //   setInputValue(e.target.value);
    // } catch (e) {
    //   console.error(e);
    //   return;
    // }
  }, []);

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        try {
          const newPage = Number(e.currentTarget.value);
          if (isNaN(newPage)) return;
          changePage(newPage);
        } catch (e) {
          console.error(e);
          return;
        }
      }
    },
    [changePage],
  );

  return (
    <Dialog
      open={isOpen}
      className="h-[60.96vw] w-[80vw] xl:h-[762px] xl:w-[1000px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div>
          <h1 className="text-[1.6vw]/[2.4vw] font-semibold xl:text-xl/7.5">Pending</h1>
          <RankTable
            bodyClass="pb-0 xl:pb-0"
            className="mt-[0.96vw] max-h-[13.28vw] overflow-x-auto xl:mt-3 xl:max-h-[166px]"
            dataSource={[]}
            columns={pendingColumns}
          />
          <h1 className="mt-[2.88vw] text-[1.6vw]/[2.4vw] font-semibold xl:mt-9 xl:text-xl/7.5">History</h1>
          <RankTable
            bodyClass="pb-0 xl:pb-0"
            className="mt-[0.96vw] max-h-[30.08vw] overflow-x-auto xl:mt-3 xl:max-h-[376px]"
            dataSource={[]}
            columns={columns}
          />
          <div className="flex-center mt-[1.28vw] gap-[0.64vw] text-[0.96vw]/[1.44vw] xl:mt-4 xl:gap-2 xl:text-xs/4.5">
            <Button
              className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
              // onClick={() => changePage(page - 1)}
              // disabled={page === 1}
            >
              <ArrowSvg
                className={clsxm('h-[0.96vw] w-[0.96vw] -rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
                  // 'fill-gray-300/50': page === 1,
                })}
              />
            </Button>
            <input
              // value={inputValue}
              className="h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-transparent text-center text-white xl:h-6 xl:w-6"
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
            />
            <span className="-mb-[0.1vw] -ml-[0.32vw] text-gray-300 xl:-mb-px xl:-ml-1">
              {/* / {Math.ceil((data?.totalCount ?? 0) / size)} */}
            </span>
            <Button
              className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
              // onClick={() => changePage(page + 1)}
              // disabled={!hasMore}
            >
              <ArrowSvg
                className={clsxm('h-[0.96vw] w-[0.96vw] rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
                  // 'fill-gray-300/50': !hasMore,
                })}
              />
            </Button>
          </div>
        </div>
      )}
    />
  );
}
