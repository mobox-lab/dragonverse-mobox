import { fetchTradeHistoryList } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export enum LogSortField {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  All = 'all',
}
export const useFetchLogHistoryList = ({ type, page, size }: { type: LogSortField; page: number; size: number }) => {
  const { isPending, isError, error, refetch, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['fetch_log_history_list_by_page', page, type, size],
    queryFn: () =>
      // TODO: fetch Log API
      fetchTradeHistoryList({
        page,
        size,
      }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(
    () => ({ isPending, isError, refetch, error, data, isFetching, isPlaceholderData }),
    [isPending, isError, refetch, error, data, isFetching, isPlaceholderData],
  );
};
