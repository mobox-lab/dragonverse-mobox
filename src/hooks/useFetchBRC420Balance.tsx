import { fetchBRC420Balance } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBRC420Balance({ tick, address }: { tick?: string; address?: string }) {
  return useQuery({
    queryKey: ['fetch_brc420_balance', tick, address],
    queryFn: () => fetchBRC420Balance({ wallet_address: address, deploy_inscription_id: tick }),
    select: (res) => (res.code === 0 ? res.data : undefined),
  });
}
