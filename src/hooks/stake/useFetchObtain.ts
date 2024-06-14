import { useMemo } from 'react';
import { fetchObtain } from '@/apis';
import { accessTokenAtom } from '@/atoms';
import { useAtomValue } from 'jotai/index';
import { useQuery } from '@tanstack/react-query';

export function useFetchObtain(gameId?: string) {
  const accessToken = useAtomValue(accessTokenAtom);
  const isEnabled = useMemo(() => !!accessToken && !!gameId, [accessToken, gameId]);

  const { data, refetch } = useQuery({
    queryKey: ['use_fetch_obtain', accessToken, gameId],
    queryFn: () => fetchObtain(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: isEnabled,
  });

  return useMemo(() => ({ data, refetch }), [data, refetch]);
}
