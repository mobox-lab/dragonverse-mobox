import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { stakeHistoryDialogOpenAtom } from '@/atoms';
import { refetchPendingHistoryListAtom } from '@/atoms/stake';
import Button from '@/components/ui/button';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchPendingHistoryList } from '@/hooks/stake/useFetchPendingHistoryList';
import { useStakePendingHistoryColumns } from '@/hooks/stake/useStakePendingHistoryColumns';
import { clsxm } from '@/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

const size = 5;
export default function StakePendingList() {
  const isOpen = useAtomValue(stakeHistoryDialogOpenAtom);
  const [page, setPage] = useState(1);
  const { data, refetch, isFetching } = useFetchPendingHistoryList({ page, size });
  const [inputValue, setInputValue] = useState<string>('1');
  const pendingColumns = useStakePendingHistoryColumns();
  const setRefetch = useSetAtom(refetchPendingHistoryListAtom);

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
        rowClass="py-[0.72vw] xl:py-[9px]"
        dataSource={data?.tradeList ?? []}
        columns={pendingColumns}
        gapClass="gap-[0.8vw] xl:gap-2.5"
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

<<<<<<< HEAD
// TypeScript internationalization: feat: ✨ implement cross-platform sync
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    feat____implement_cross_platform_sync: 'feat: ✨ implement cross-platform sync',
    feat____implement_cross_platform_sync_description: 'Description for feat: ✨ implement cross-platform sync'
  },
  zh: {
    feat____implement_cross_platform_sync: 'feat: ✨ implement cross-platform sync',
    feat____implement_cross_platform_sync_description: 'feat: ✨ implement cross-platform sync的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
=======
// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
>>>>>>> bugfix/mobile-layout
};

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
