import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { tradeLogsDrawerAtom } from '@/atoms/assets';
import Button from '@/components/ui/button';
import Drawer from '@/components/ui/drawer/index';
import RankTable from '@/components/ui/table/RankTable';
import { LogSortField, useFetchLogHistoryList } from '@/hooks/useFetchLogHistoryList';
import { useLogsHistoryColumns } from '@/hooks/useLogsHistoryColumns';
import { clsxm } from '@/utils';
import { useAtom } from 'jotai';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo, useState } from 'react';

const size = 10;
export default function DrawerTradeLogs() {
  const [isOpen, setIsOpen] = useAtom(tradeLogsDrawerAtom);

  const columns = useLogsHistoryColumns();
  const [type, setType] = useState<LogSortField>(LogSortField.All);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const { data, refetch, isFetching } = useFetchLogHistoryList({ page, type, size });

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

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    try {
      const newPage = Number(e.target.value);
      if (isNaN(newPage)) return;
      setInputValue(e.target.value);
    } catch (e) {
      console.error(e);
      return;
    }
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

  // FIXME 从 Logs 返回时 菜单层级问题
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Logs"
      className="flex flex-col"
      render={() => (
        <div className="flex w-[30.4vw] flex-grow flex-col xl:w-[380px]">
          <RankTable
            loading={isFetching}
            className="max-h-[38.08vw] overflow-x-auto overflow-y-auto xl:max-h-[476px]"
            bodyClass="xl:pb-0 pb-0"
            dataSource={data?.tradeList ?? []}
            columns={columns}
          />
          <div className="flex-center mt-auto gap-[0.64vw] justify-self-end text-[0.96vw]/[1.44vw] xl:gap-2 xl:text-xs/4.5">
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
      )}
    />
  );
}
