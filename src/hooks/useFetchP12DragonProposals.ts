import { fetchDragonProposals } from '@/apis';
import { DragonProposalSortField } from '@/constants/enum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonProposals = (sortField?: DragonProposalSortField) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_dragon_proposals', sortField],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      let res = await fetchDragonProposals({ sortField, page: pageParam + 1, size: 16 });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 16) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );
};
