import { fetchObtain } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMainAccount } from '../wallet';

export function useFetchObtain() {
  const { evmAddress } = useMainAccount();
  return useQuery({
    queryKey: ['use_fetch_obtain', evmAddress],
    queryFn: () => fetchObtain(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
    enabled: !!evmAddress,
  });
}
