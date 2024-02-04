import { fetchDragonUserBag } from '@/apis/mobox';
import { useQuery } from '@tanstack/react-query';

export function useFetchDragonBag({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_dragon_bad', address],
    queryFn: () => fetchDragonUserBag(address),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}
