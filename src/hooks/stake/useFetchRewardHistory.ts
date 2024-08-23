import { useAtomValue } from 'jotai/index';
import { accessTokenAtom } from '@/atoms';
import { useQuery } from '@tanstack/react-query';
import { fetchStakeRewardHistory } from '@/apis';
import { VaultRewardToken } from '@/apis/types';

export const useFetchRewardHistory = ({ page, size, tokenName }: { page: number; size: number, tokenName?: VaultRewardToken }) => {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_stake_reward_history', accessToken, page, size, tokenName],
    queryFn: () => fetchStakeRewardHistory({ page, size, tokenName }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken && !!tokenName,
  });
};
