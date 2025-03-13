import { useMemo } from 'react';
import { formatEther } from 'viem';
import { fetchPriceHistoryList } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useFetchPriceHistoryList = () => {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({ data, isLoading }), [data?.length, isLoading]);
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
