import { fetchTradeHistory } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export enum LogSortField {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  All = 'all',
}

export function useFetchTradeHistory({ page, size, enabled }: { page: number; size: number, enabled: boolean }) {
  return useQuery({
    queryKey: ['fetch_log_history_list_by_page', page, size],
    queryFn: () => fetchTradeHistory(page, size),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled,
  });
};
