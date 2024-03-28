import { fetchTradeHistoryList } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useMainAccount } from './wallet';
import { TradeHistoryListItemData } from '@/apis/types';
import { Response } from '@/apis/request';

export enum TradeSortField {
  ALL = 'all',
  MY = 'my',
}
export const useFetchTradeHistoryList = ({ type, page, size }: { type: TradeSortField; page: number; size: number }) => {
  const { evmAddress } = useMainAccount();

  const fetchTradeHistoryListByPage = ({ type, page, size }: { type: TradeSortField; page: number; size: number }) => {
    const emptyData: Response<TradeHistoryListItemData> = { code: 200, data: { totalCount: 0, tradeList: [] }, message: '' };
    if (type === TradeSortField.MY && !evmAddress) return Promise.resolve(emptyData);
    return fetchTradeHistoryList({
      evmAddress: type === TradeSortField.MY ? evmAddress : undefined,
      page,
      size,
    });
  };

  const { isPending, isError, error, refetch, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['fetch_trade_history_list_by_page', page, type, size],
    queryFn: () => fetchTradeHistoryListByPage({ type, page, size }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(
    () => ({ isPending, isError, refetch, error, data, isFetching, isPlaceholderData }),
    [isPending, isError, refetch, error, data, isFetching, isPlaceholderData],
  );
};
