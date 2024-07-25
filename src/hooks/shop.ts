import { useAtomValue } from 'jotai';
import { fetchBuyGameAsset, fetchGameAssetLog } from '@/apis';
import { FetchBuyGameAsset } from '@/apis/types';
import { gameAssetsLogDrawerAtom } from '@/atoms/assets';
import { dvGameIdAtom } from '@/atoms/rank';
import { GameAssetID } from '@/constants/gameAssets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useMutationBuyGameAsset() {
  return useMutation({
    mutationFn(data: FetchBuyGameAsset) {
      return fetchBuyGameAsset(data);
    },
  });
}

export function useFetchGameAssetLog(resId: GameAssetID, page = 1, pageSize = 20) {
  const isOpen = useAtomValue(gameAssetsLogDrawerAtom);
  const gameId = useAtomValue(dvGameIdAtom);

  const result = useQuery({
    queryKey: ['game_asset_log', resId, page, pageSize],
    queryFn() {
      return fetchGameAssetLog({
        resId,
        page,
        pageSize,
        gameId: gameId!.MerlinGameId,
      });
    },
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      result.refetch();
    }
  }, [isOpen]);

  return result;
}
