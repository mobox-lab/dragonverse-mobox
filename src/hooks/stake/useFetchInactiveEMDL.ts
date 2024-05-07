import { fetchInactiveEMDBL } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';

export function useFetchInactiveEMDL() {
  const { evmAddress } = useMainAccount();

  return useQuery({
    queryKey: ['fetch_inactive_emdbl', evmAddress],
    queryFn: () => fetchInactiveEMDBL(evmAddress),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!evmAddress,
  });
}
