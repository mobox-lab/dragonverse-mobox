import { fetchGameAsset } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';

export function useFetchGameAsset() {
  const { evmAddress } = useMainAccount();
  return useQuery({
    queryKey: ['use_fetch_game_asset', evmAddress],
    queryFn: () => fetchGameAsset(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
    enabled: !!evmAddress,
  });
}
