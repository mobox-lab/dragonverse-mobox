import { fetchBurnRank } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBurnRankData() {
  return useQuery({
    queryKey: ['use_fetch_burn_rank'],
    queryFn: () => fetchBurnRank(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });
}
