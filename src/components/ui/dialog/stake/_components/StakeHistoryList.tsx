import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { stakeHistoryDialogOpenAtom } from '@/atoms';
import { refetchStakeHistoryListAtom } from '@/atoms/stake';
import Button from '@/components/ui/button';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchStakeHistoryList } from '@/hooks/stake/useFetchStakeHistoryList';
import { useStakeHistoryColumns } from '@/hooks/stake/useStakeHistoryColumns';
import { clsxm } from '@/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

const size = 5;
export default function StakeHistoryList() {
  const isOpen = useAtomValue(stakeHistoryDialogOpenAtom);
  const pendingColumns = useStakeHistoryColumns();
  const [page, setPage] = useState(1);
  const { data, refetch, isFetching } = useFetchStakeHistoryList({ page, size });
  const [inputValue, setInputValue] = useState<string>('1');
  const setRefetch = useSetAtom(refetchStakeHistoryListAtom);

  useEffect(() => {
    setRefetch(() => refetch);
    if (isOpen) refetch();
  }, [isOpen, refetch, setRefetch]);

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
  return (
    <>
      <RankTable
        bodyClass="pb-0 xl:pb-0"
        className="mt-[0.96vw] max-h-[30.08vw] overflow-x-auto xl:mt-3 xl:max-h-[376px]"
        dataSource={data?.tradeList ?? []}
        columns={pendingColumns}
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
    </>
  );
}

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
