import LoadingSvg from '@/../public/svg/loading.svg?component';
import RefreshSvg from '@/../public/svg/refresh.svg?component';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchP12GameRank } from '@/hooks/rank/useFetchP12GameRank';
import { useDragonGameRankColumns } from '@/hooks/useDragonGameRankColumns';
import { clsxm } from '@/utils';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export default function DragonGameRank({ className, round = 1 }: { className?: string; round?: number }) {
  const columns = useDragonGameRankColumns();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchP12GameRank();
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
    <div className={clsxm('flex w-full flex-col gap-[0.8vw] xl:gap-2.5', className)}>
      <div className="flex justify-between">
        <p className="flex items-center gap-[0.96vw] text-[1.28vw]/[1.44vw] xl:gap-3 xl:text-base/4.5">
          Season: {round}
          <span>6d 20h 44s</span>
          <span className="ml-[2.24vw] xl:ml-7">Prize Pool</span>
          <span className="text-yellow">
            3,278
            <img src="/img/mobox.png" alt="mobox" className="ml-[0.48vw] inline-block w-[1.6vw] xl:ml-1.5 xl:w-5" />
          </span>
        </p>
        <div
          onClick={() => refetch()}
          className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer rounded bg-white/10 backdrop-blur-xl xl:h-10 xl:w-10"
        >
          <RefreshSvg className="h-[1.6vw] w-[1.6vw] fill-gray-300 stroke-gray-300 xl:h-5 xl:w-5" />
        </div>
      </div>
      <RankTable
        loading={isLoading}
        className="max-h-[35.68vw] overflow-x-auto xl:max-h-[446px]"
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

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
