import { fetchStakeHistoryList } from '@/apis';
import { stakeHistoryTypeOrderAtom } from '@/atoms/stake';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMainAccount } from '../wallet';

export const useFetchStakeHistoryList = ({ page, size }: { page: number; size: number }) => {
  const { majorAddress } = useMainAccount();
  const order = useAtomValue(stakeHistoryTypeOrderAtom);
  const { isPending, isError, error, refetch, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['fetch_stake_history_list', page, size, majorAddress, order],
    queryFn: () => fetchStakeHistoryList({ page, size, order }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(
    () => ({ isPending, isError, refetch, error, data, isFetching, isPlaceholderData }),
    [isPending, isError, refetch, error, data, isFetching, isPlaceholderData],
  );
};
