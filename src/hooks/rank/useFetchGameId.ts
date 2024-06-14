import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { fetchPgeGameId } from '@/apis';
import { dvGameIdAtom } from '@/atoms/rank';
import { useQuery } from '@tanstack/react-query';

export function useFetchGameId() {
  const setGameId = useSetAtom(dvGameIdAtom);

  const { data } = useQuery({
    queryKey: ['fetch_pge_game_id'],
    queryFn: () => fetchPgeGameId(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });

  useEffect(() => setGameId(data), [data, setGameId]);
}
