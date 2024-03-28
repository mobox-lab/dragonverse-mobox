import { fetchMDBLShares } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchShares({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_mdbl_shares', address],
    queryFn: () => fetchMDBLShares(address),
    select: (res) => (res.code === 200 ? res.data : { myShare: '0' }),
    enabled: !!address,
  });
}
