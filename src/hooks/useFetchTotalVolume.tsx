import { fetchTotalVolume } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchTotalVolume() {
  return useQuery({
    queryKey: ['fetch_total_volume'],
    queryFn: () => fetchTotalVolume(),
    select: (res) => (res.code === 200 ? res.data : { volume: '0', assetsReserveEnd: '0', sharesReserveEnd: '0' }),
  });
}
