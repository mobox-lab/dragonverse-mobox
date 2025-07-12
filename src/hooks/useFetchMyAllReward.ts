import { fetchMyAllRewards } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchMyAllReward() {
  return useQuery({
    queryKey: ['fetch_my_all_rewards'],
    queryFn: () => fetchMyAllRewards(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
