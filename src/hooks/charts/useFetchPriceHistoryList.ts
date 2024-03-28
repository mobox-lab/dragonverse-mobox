import { fetchPriceHistoryList } from '@/apis';
import { latestMDBLChartPriceAtom } from '@/atoms/lbp';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { formatEther } from 'viem';

export const useFetchPriceHistoryList = () => {
  const setLatestMDBLChartPrice = useSetAtom(latestMDBLChartPriceAtom);
  const { data, isLoading } = useQuery({
    queryKey: ['fetch_price_history_list'],
    queryFn: () => fetchPriceHistoryList(),
    select: (res) =>
      res.code === 200
        ? res.data.map(({ sharePrice, createdAt }) => ({
            price: Number(formatEther(BigInt(sharePrice))),
            date: new Date(createdAt),
          }))
        : [],
  });

  useEffect(() => {
    if (!data?.length) return;
    setLatestMDBLChartPrice(data[data.length - 1]?.price);
  }, [data, setLatestMDBLChartPrice]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({ data, isLoading }), [data?.length, isLoading]);
};
