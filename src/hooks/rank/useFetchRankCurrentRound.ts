import { fetchRankCurrentRound } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchRankCurrentRound() {
  return useQuery({
    queryKey: ['use_fetch_rank_current_round'],
    queryFn: () => fetchRankCurrentRound(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });
}
