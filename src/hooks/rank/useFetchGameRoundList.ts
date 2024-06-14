import { fetchGameRoundList } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchGameRoundList(gameId?: string) {
  return useQuery({
    queryKey: ['use_fetch_game_round_list', gameId],
    queryFn: () => fetchGameRoundList(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}
