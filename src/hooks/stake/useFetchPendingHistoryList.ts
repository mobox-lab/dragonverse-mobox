import { fetchStakePendingHistoryList } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useMainAccount } from '../wallet';

export const useFetchPendingHistoryList = ({ page, size }: { page: number; size: number }) => {
  const { majorAddress } = useMainAccount();

  const { isPending, isError, error, refetch, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['fetch_stake_pending_history_list', page, size, majorAddress],
    queryFn: () => fetchStakePendingHistoryList({ page, size }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(
    () => ({ isPending, isError, refetch, error, data, isFetching, isPlaceholderData }),
    [isPending, isError, refetch, error, data, isFetching, isPlaceholderData],
  );
};
