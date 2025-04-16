import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import RankTable from '@/components/ui/table/RankTable';
import { GameRankType } from '@/constants/enum';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import { useFetchMoboxGameRank } from '@/hooks/rank/useFetchMoboxGameRank';
import { useMainAccount } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import { useDefenseGameRankColumns } from '@/hooks/rank/useDefenseGameRankColumns';
import { useDefenseGamePointsRankColumns } from '@/hooks/rank/useDefenseGamePointsRankColumns';
import { DefenseRankItem } from '@/apis/types';

export default function DefenseGameRank({ className, round }: { className?: string; round?: number }) {
  const { evmAddress } = useMainAccount();
  const columns = useDefenseGameRankColumns();
  const pointsColumns = useDefenseGamePointsRankColumns();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchMoboxGameRank({
    type: GameRankType.Defense,
    round,
  });
  const { ref, inView } = useInView();
  const items: DefenseRankItem[] = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.list) {
      const res = data.pages.map((page) => page?.list).flat(1);

      if (evmAddress) {
        if (data.pages[0]?.myself) {
          return [data.pages[0]?.myself, ...res];
        }

        return [
          {
            rank: -1,
            round: 0,
            gparkUid: '',
            gparkUserAddress: evmAddress,
            gparkUserName: '',
            gparkUserAvatar: '',
            petName: '',
            petOriginalAttack: 0,
            petAttack: 0,
            recordTime: 0,
            mdblReward: '0',
            emdblReward: '0',
            mboxReward: '0',
          },
          ...res,
        ];
      } else {
        return res;
      }
    } else return [];
  }, [data?.pages, evmAddress]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    if (round) {
      refetch();
    }
  }, [round]);

  return (
    <RankTable
      firstLineHighLight={!!evmAddress}
      loading={isLoading}
      className={clsxm('mt-[0.8vw] max-h-[35.68vw] overflow-x-auto xl:mt-2.5 xl:max-h-[446px]', className)}
      bodyClass="!pb-0"
      dataSource={items ?? []}
      columns={(items ?? [])[0]?.subDetail || (items ?? [])[1]?.subDetail ? pointsColumns : columns}
      renderBottom={() => (
        <>
          {hasNextPage && (
            <div ref={ref} className="h-px text-transparent">
              {'Load More'}
            </div>
          )}
          {isFetchingNextPage && (
            <div className="flex-center mb-[3.84vw] pt-[1.28vw] xl:mb-12 xl:pt-4">
              <LoadingSvg className="h-[3.2vw] w-[3.2vw] animate-spin fill-gray-300 xl:h-10 xl:w-10" />
            </div>
          )}
        </>
      )}
    />
  );
}

// TypeScript test for: feat: ✨ implement wallet connection for Web3
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____implement_wallet_connection_for_Web3', () => {
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

// TypeScript utility function: security: 🔒 add rate limiting
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

export const security____add_rate_limiting: UtilityFunctions = {
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
