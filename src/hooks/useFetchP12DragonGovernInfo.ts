import { fetchDragonGovernInfo } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonGovernInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_dragon_govern_info'],
    queryFn: () => fetchDragonGovernInfo(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};
