import { useAtomValue } from 'jotai/index';
import { accessTokenAtom } from '@/atoms';
import { useQuery } from '@tanstack/react-query';
import { fetchStakeRewardHistory } from '@/apis';

export const useFetchRewardHistory = ({ page, size }: { page: number; size: number }) => {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_stake_reward_history', accessToken, page, size],
    queryFn: () => fetchStakeRewardHistory({ page, size }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken,
  });
};
