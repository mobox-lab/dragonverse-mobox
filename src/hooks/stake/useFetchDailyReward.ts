import { fetchDailyReward } from '@/apis';
import { DailyReward } from '@/apis/types';
import { convertScientificToNormal } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useFetchDailyReward() {
  const { data, refetch } = useQuery({
    queryKey: ['use_fetch_daily_reward'],
    queryFn: () => fetchDailyReward(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });

  return useMemo(() => {
    if (data) {
      const jsonString = JSON.stringify(data, (key, value) => {
        if (typeof value === 'number') {
          return convertScientificToNormal(value);
        }
        return value;
      });
      const jsonData: DailyReward = JSON.parse(jsonString);
      return { data: jsonData, refetch };
    } else {
      return { data: undefined, refetch };
    }
  }, [data, refetch]);
}
