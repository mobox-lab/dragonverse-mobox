import { fetchBuffData } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBuffData() {
  return useQuery({
    queryKey: ['use_fetch_buff_data'],
    queryFn: () => fetchBuffData(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });
}
