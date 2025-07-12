import { fetchBuffData } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchBuffData(gameId?: string) {
  return useQuery({
    queryKey: ['use_fetch_buff_data', gameId],
    queryFn: () => fetchBuffData(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
