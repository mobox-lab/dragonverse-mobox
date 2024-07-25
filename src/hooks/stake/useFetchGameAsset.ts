import { fetchGameAsset } from '@/apis';
import { accessTokenAtom } from '@/atoms';
import { useAtomValue } from 'jotai/index';
import { useQuery } from '@tanstack/react-query';
import { DragonCaptureBall } from '@/apis/types';

export function useFetchGameAsset(gameId?: string) {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['use_fetch_game_asset', accessToken, gameId],
    queryFn: () => fetchGameAsset(gameId),
    select({ code, data }) {
      if (code === 200) {
        return {
          assets: data.list.reduce((data, item) => ({[item.resId]: item, ...data}), {}) as Record<string, DragonCaptureBall>,
          captureProbability: data.captureProbability,
          totalDragonPower: data.totalDragonPower,
        };
      }

      return undefined;
    },
    staleTime: 0,
    enabled: !!accessToken,
  });
}
