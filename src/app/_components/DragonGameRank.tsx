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
    <div className="flex flex-col items-center px-[3.2vw] pb-[4.16vw] pt-[3vw] text-center xl:px-10 xl:pb-13 xl:pt-6">
      <div className="flex w-full items-end justify-between">
        <p className="text-[1.12vw]/[1.76vw] font-semibold xl:text-sm/5.5">Leaderboard of Dash of Dawn(Beta)</p>
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
