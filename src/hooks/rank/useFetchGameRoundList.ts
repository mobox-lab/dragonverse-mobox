import { fetchGameRoundList } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchGameRoundList() {
  return useQuery({
    queryKey: ['use_fetch_game_round_list'],
    queryFn: () => fetchGameRoundList(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });
}
