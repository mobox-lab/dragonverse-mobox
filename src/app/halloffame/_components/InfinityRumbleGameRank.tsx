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
