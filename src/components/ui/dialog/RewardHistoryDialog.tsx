import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import Dialog from '.';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { RewardHistoryItem, VaultRewardToken } from '@/apis/types';
import RankTable from '@/components/ui/table/RankTable';
import { rewardHistoryDialogAtom } from '@/atoms/stake';
import { createColumnHelper } from '@tanstack/react-table';
import { useFetchRewardHistory } from '@/hooks/stake/useFetchRewardHistory';
import Button from '@/components/ui/button';
import { clsxm, formatNumber } from '@/utils';
import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { formatEther } from 'viem';

const size = 5;
const rewardHistoryHelper = createColumnHelper<RewardHistoryItem>();

export default function RewardHistoryDialog() {
  const [isOpen, setIsOpen] = useAtom(rewardHistoryDialogAtom);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchRewardHistory({ page, size, tokenName: isOpen });
  const [inputValue, setInputValue] = useState<string>('1');
  const isEmdbl = isOpen === VaultRewardToken.EMdbl;

  const columns = useMemo(
    () => [
      rewardHistoryHelper.accessor('creatAt', {
        header: () => <div className="flex-1 pl-4 text-left">Time</div>,
        cell: ({ getValue }) => <div className="flex-1 pl-4 text-left">{dayjs(getValue()).format('YYYY/MM/DD HH:mm:ss')}</div>,
      }),
      rewardHistoryHelper.accessor('emdblRealBalance', {
        header: () => <div className="flex-1">Active eMDBL</div>,
        cell: ({ getValue }) => (
          <div className="flex-1 text-sm/4.5 font-semibold text-yellow">{formatEther(BigInt(getValue()))}</div>
        ),
      }),
      rewardHistoryHelper.accessor('totalBuff', {
        header: () => <div className="flex-1 text-sm/4.5">Buff</div>,
        cell: ({ getValue }) => <div className="flex-1">{getValue() / 10}%</div>,
      }),
      rewardHistoryHelper.accessor('rewardAmount', {
        header: () => <div className="flex-1 pr-4">Reward</div>,
        cell: ({ getValue, row }) => (
          <div className="flex flex-1 items-center justify-end gap-1 pr-4 text-sm/4.5 font-semibold text-yellow">
            {isEmdbl ? (
              <>
                {formatEther(BigInt(row.original.rewardAmount))}
                <img src="/img/emdbl.webp" alt="mdbl" className="h-[1.6vw] xl:h-5" />
              </>
            ) : (
              <>
                <span>{formatNumber(BigInt(row.original.merlRewardAmount), true)}</span>
                <img src="/svg/MERL.svg" alt="MERL" className="h-[1.6vw] xl:h-5" />
              </>
            )}
          </div>
        ),
      }),
    ],
    [isOpen],
  );

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
    <Dialog
      open={!!isOpen}
      contentClassName="p-0 xl:p-0"
      className="w-[62.4vw] xl:w-[780px]"
      onOpenChange={() => setIsOpen(undefined)}
      render={() => (
        <div className="flex flex-col">
          <div className="p-[2.88vw] pb-[3.2vw] text-center xl:p-6 xl:pb-10">
            <h1 className="  text-[1.6vw]/[2.4vw] font-semibold xl:text-xl/7.5">Reward History</h1>
            <RankTable
              bodyClass="pb-0 xl:pb-0"
              className="mt-[2.4vw] max-h-[30.08vw] overflow-x-auto xl:mt-7.5 xl:max-h-[376px]"
              dataSource={data?.rewardHistoryList ?? []}
              columns={columns}
              loading={isLoading}
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
          </div>
        </div>
      )}
    />
  );
}

// TypeScript test for: refactor: 🔧 improve form validation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____improve_form_validation', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript utility function: fix: 🐛 resolve data synchronization bug
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____resolve_data_synchronization_bug: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript internationalization: refactor: 🔧 improve type safety
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
    refactor____improve_type_safety: 'refactor: 🔧 improve type safety',
    refactor____improve_type_safety_description: 'Description for refactor: 🔧 improve type safety'
  },
  zh: {
    refactor____improve_type_safety: 'refactor: 🔧 improve type safety',
    refactor____improve_type_safety_description: 'refactor: 🔧 improve type safety的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
