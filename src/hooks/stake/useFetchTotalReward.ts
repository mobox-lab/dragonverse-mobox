import { fetchTotalReward } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';
import { VaultRewardToken } from '@/apis/types';

export function useFetchTotalReward(token?: VaultRewardToken) {
  const { evmAddress } = useMainAccount();

  return useQuery({
    queryKey: ['fetch_total_reward', evmAddress, token],
    queryFn: () => fetchTotalReward(token, evmAddress),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!evmAddress,
  });
}
