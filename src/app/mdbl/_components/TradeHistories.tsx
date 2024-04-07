import ArrowSvg from '@/../public/svg/arrow.svg?component';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import Segmented from '@/components/ui/segmented';
import RankTable from '@/components/ui/table/RankTable';
import { TradeSortField, useFetchTradeHistoryList } from '@/hooks/useFetchTradeHistoryList';
import { useTradeHistoryColumns } from '@/hooks/useTradeHistoryColumns';
import { clsxm } from '@/utils';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo, useState } from 'react';

const size = 20;
const opts = [
  { label: 'All Trades', value: TradeSortField.ALL },
  { label: 'My Trades', value: TradeSortField.MY },
];
export default function TradeHistories({ className }: { className?: string }) {
  const columns = useTradeHistoryColumns();
  const [type, setType] = useState<TradeSortField>(TradeSortField.ALL);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const { data, refetch, isFetching } = useFetchTradeHistoryList({ page, type, size });

  const hasMore = useMemo(() => {
    return page * size < (data?.totalCount ?? 0);
  }, [data?.totalCount, page]);

  const changePage = useCallback(
    (page: number) => {
      const hasMore = (page - 1) * size < (data?.totalCount ?? 0);
      if (page === 0 || !hasMore) return;
      setPage(page);
      setInputValue(page + '');
    },
    [data?.totalCount],
  );

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (type === TradeSortField.ALL) return; // block all input change
      try {
        const newPage = Number(e.target.value);
        if (isNaN(newPage)) return;
        setInputValue(e.target.value);
      } catch (e) {
        console.error(e);
        return;
      }
    },
    [type],
  );

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (type === TradeSortField.ALL) return; // block all input change
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
    [changePage, type],
  );

  return (
    <div className={clsxm('relative px-[3vw] py-[3.52vw] xl:px-7.5 xl:py-11', className)}>
      <PatternWithoutLine />
      <div className="flex items-center justify-between">
        <h1 className="text-[1.28vw]/[1.76vw] font-medium xl:text-base/5.5">LBP Trade History</h1>
        <Segmented
          className="h-[3.04vw] whitespace-nowrap text-[1.12vw]/[1.28vw] font-medium xl:h-[38px] xl:text-sm/4"
          defaultValue={type}
          onChange={(value) => {
            setType(value as TradeSortField);
            setPage(1);
            setInputValue('1');
            refetch();
          }}
          options={opts}
        />
      </div>
      <RankTable
        loading={isFetching}
        className="mt-[0.96vw] max-h-[30.08vw] overflow-x-auto xl:mt-3 xl:max-h-[376px]"
        bodyClass="xl:pb-0 pb-0"
        dataSource={data?.tradeList ?? []}
        columns={columns}
      />
      <div className="flex-center mt-[1.28vw] gap-[0.64vw] text-[0.96vw]/[1.44vw] xl:mt-4 xl:gap-2 xl:text-xs/4.5">
        <Button
          className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
        >
          <ArrowSvg
            className={clsxm('h-[0.96vw] w-[0.96vw] -rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
              'fill-gray-300/50': page === 1,
            })}
          />
        </Button>
        <input
          value={inputValue}
          disabled={type === TradeSortField.ALL}
          className="h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-transparent text-center text-white xl:h-6 xl:w-6"
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
        <span className="-mb-[0.1vw] -ml-[0.32vw] text-gray-300 xl:-mb-px xl:-ml-1">
          / {Math.ceil((data?.totalCount ?? 0) / size)}
        </span>
        <Button
          className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
          onClick={() => changePage(page + 1)}
          disabled={!hasMore}
        >
          <ArrowSvg
            className={clsxm('h-[0.96vw] w-[0.96vw] rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
              'fill-gray-300/50': !hasMore,
            })}
          />
        </Button>
      </div>
    </div>
  );
}
