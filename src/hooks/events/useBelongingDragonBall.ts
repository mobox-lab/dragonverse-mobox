import { useQuery } from '@tanstack/react-query';
import { fetchBelongingDragonBall } from '@/apis';
import { useAtomValue } from 'jotai/index';
import { accessTokenAtom } from '@/atoms';

export function useBelongingDragonBall() {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_belonging_dragon_dall', accessToken],
    queryFn: () => fetchBelongingDragonBall(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken,
  });
}
