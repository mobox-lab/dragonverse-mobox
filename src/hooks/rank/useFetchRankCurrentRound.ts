import { fetchRankCurrentRound } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchRankCurrentRound(gameId?: string) {
  return useQuery({
    queryKey: ['use_fetch_rank_current_round', gameId],
    queryFn: () => fetchRankCurrentRound(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}
