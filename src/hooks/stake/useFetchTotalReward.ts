import { fetchTotalReward } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';

export function useFetchTotalReward() {
  const { evmAddress } = useMainAccount();

  return useQuery({
    queryKey: ['fetch_total_reward', evmAddress],
    queryFn: () => fetchTotalReward(evmAddress),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!evmAddress,
  });
}
