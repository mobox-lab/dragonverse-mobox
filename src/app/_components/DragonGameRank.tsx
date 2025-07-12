import LoadingSvg from '@/../public/svg/loading.svg?component';
import RefreshSvg from '@/../public/svg/refresh.svg?component';
import RankTable from '@/components/ui/table/RankTable';
import { useDragonGameRankColumns } from '@/hooks/useDragonGameRankColumns';
import { useFetchP12DragonGameRank } from '@/hooks/useFetchP12DragonGameRank';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
export default function DragonGameRank() {
  const columns = useDragonGameRankColumns();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchP12DragonGameRank();
  const { ref, inView } = useInView();

  const rankItems = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.length) {
      const res = data.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [data?.pages]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div className='flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6'>
      <div className="flex w-full items-end justify-between">
        <p className="text-[1.12vw]/[1.76vw] font-medium xl:text-sm/5.5">Leaderboard of Dash of Dawn(Beta)</p>
        <div
          onClick={() => refetch()}
          className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer rounded bg-white/10 backdrop-blur-xl xl:h-10 xl:w-10"
        >
          <RefreshSvg className="h-[1.6vw] w-[1.6vw] fill-gray-300 stroke-gray-300 xl:h-5 xl:w-5" />
        </div>
      </div>
      <RankTable
        loading={isLoading}
        className="mt-[0.8vw] max-h-[35.68vw] overflow-x-auto xl:mt-2.5 xl:max-h-[446px]"
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
    </div>
  );
}

<<<<<<< HEAD
// TypeScript React component methods for: fix: 🐛 correct interface property types
interface fix____correct_interface_property_typesProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____correct_interface_property_typesState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____correct_interface_property_types = () => {
  const [state, setState] = useState<fix____correct_interface_property_typesState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____correct_interface_property_types = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____correct_interface_property_types');
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
    handlefix____correct_interface_property_types
  };
=======
// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
>>>>>>> bugfix/mobile-layout
};
