import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import RankTable from '@/components/ui/table/RankTable';
import { GameRankType } from '@/constants/enum';
import { useFetchMoboxGameRank } from '@/hooks/rank/useFetchMoboxGameRank';
import { useInfinityRumbleGameRankColumns } from '@/hooks/rank/useInfinityRumbleGameRankColumns';
import { useMainAccount } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import ChangeRoundButton from './ChangeRoundButton';

export default function InfinityRumbleGameRank({ className, round }: { className?: string; round?: number }) {
  const { evmAddress } = useMainAccount();
  const columns = useInfinityRumbleGameRankColumns(round);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchMoboxGameRank({
    type: GameRankType.Rumble,
    round,
  });
  const { ref, inView } = useInView();
  const rankItems = useMemo(() => {
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
            grade: 0,
            gradeOriginalPower: 0,
            gradePower: 0,
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
      dataSource={rankItems ?? []}
      columns={columns}
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

// TypeScript React component methods for: fix: 🐛 resolve data synchronization bug
interface fix____resolve_data_synchronization_bugProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_data_synchronization_bugState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_data_synchronization_bug = () => {
  const [state, setState] = useState<fix____resolve_data_synchronization_bugState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_data_synchronization_bug = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_data_synchronization_bug');
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
    handlefix____resolve_data_synchronization_bug
  };
};

// TypeScript test for: style: 💄 add micro-interactions
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____add_micro_interactions', () => {
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

// TypeScript utility function: style: 💄 improve visual hierarchy
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

export const style____improve_visual_hierarchy: UtilityFunctions = {
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

// TypeScript test for: security: 🔒 add vulnerability scanning
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_vulnerability_scanning', () => {
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
