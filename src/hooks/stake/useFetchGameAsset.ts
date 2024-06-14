import { fetchGameAsset } from '@/apis';
import { accessTokenAtom } from '@/atoms';
import { useAtomValue } from 'jotai/index';
import { useQuery } from '@tanstack/react-query';

export function useFetchGameAsset(gameId?: string) {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['use_fetch_game_asset', accessToken, gameId],
    queryFn: () => fetchGameAsset(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
    enabled: !!accessToken,
  });
}
