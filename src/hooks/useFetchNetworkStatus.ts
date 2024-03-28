import { fetchNetworkStatus } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export default function useFetchNetworkStatus() {
  return useQuery({
    queryKey: ['fetch_network_status'],
    queryFn: () => fetchNetworkStatus(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}
