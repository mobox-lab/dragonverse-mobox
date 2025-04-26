import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import ArrowSvg from '@/../public/svg/arrow.svg?component';
import Button from '@/components/ui/button';
import Drawer from '@/components/ui/drawer/index';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchTradeHistory } from '@/hooks/useFetchTradeHistory';
import { useLogsHistoryColumns } from '@/hooks/useLogsHistoryColumns';
import { clsxm } from '@/utils';

const SIZE = 20;

type Props = {
  isOpen: boolean;
  onOpenChange(open: boolean): void;
}

export default function DrawerTradeLogs({ isOpen, onOpenChange }: Props) {
  const columns = useLogsHistoryColumns();
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const { data, isFetching } = useFetchTradeHistory({ page, size: SIZE, enabled: isOpen });
  const hasMore = useMemo(() => {
    return page * SIZE < (data?.totalCount ?? 0);
  }, [data?.totalCount, page]);

  const changePage = useCallback(
    (page: number) => {
      const hasMore = (page - 1) * SIZE < (data?.totalCount ?? 0);
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
        }
      }
    },
    [changePage],
  );

  useEffect(() => {
    if (isOpen) {
      setPage(1);
      setInputValue('1');
    }
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Logs"
      className="flex flex-col"
      render={() => (
        <div className="flex w-[40vw] flex-grow flex-col xl:w-[500px] overflow-auto">
          <RankTable
            loading={isFetching}
            className="overflow-auto"
            bodyClass="xl:pb-0 pb-0"
            dataSource={data?.fundLogs ?? []}
            columns={columns}
          />
          <div className="flex-center mt-8 gap-[0.64vw] justify-self-end text-[0.96vw]/[1.44vw] xl:gap-2 xl:text-xs/4.5">
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
              / {Math.ceil((data?.totalCount ?? 0) / SIZE)}
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

// TypeScript React component methods for: feat: ✨ create game statistics dashboard
interface feat____create_game_statistics_dashboardProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____create_game_statistics_dashboardState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____create_game_statistics_dashboard = () => {
  const [state, setState] = useState<feat____create_game_statistics_dashboardState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____create_game_statistics_dashboard = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____create_game_statistics_dashboard');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlefeat____create_game_statistics_dashboard
  };
};
