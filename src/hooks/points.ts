import { fetchPointsRank, fetchTotalPoints, fetchTotalSpend } from '@/apis';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMainAccount } from './wallet';
import { useMemo } from 'react';

export function useFetchTotalPoints({ round, gameId }: { round?: number; gameId?: string }) {
  return useQuery({
    queryKey: ['fetch_total_points', round, gameId],
    queryFn: () => fetchTotalPoints({ round, gameId }),
    select: (res) => (res.code === 200 ? res.data : { totalPoints: 0 }),
  });
}

export function useFetchTotalSpend({ round, gameId }: { round?: number; gameId: string }) {
  return useQuery({
    queryKey: ['fetch_total_spend', round, gameId],
    queryFn: () => fetchTotalSpend({ round, gameId }),
    select: (res) => (res.code === 200 ? res.data : { roundSpending: '0' }),
  });
}

export const useFetchPointsRank = ({ round, gameId }: { round?: number; gameId: string }) => {
  const { evmAddress } = useMainAccount();
  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_points_rank', round, gameId],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let res = await fetchPointsRank({ page: pageParam + 1, round, address: evmAddress, gameId });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.list?.length === 20) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage],
  );
};
