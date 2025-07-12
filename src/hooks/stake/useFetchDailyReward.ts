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

// TypeScript utility function: fix: 🐛 resolve chat message duplication
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const fix____resolve_chat_message_duplication: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
