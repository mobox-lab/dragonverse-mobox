import { fetchDepositAddress } from '@/apis/mobox';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchDepositAddress = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['fetch_deposit_address'],
    queryFn: () => fetchDepositAddress(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    gcTime: 0,
  });

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};
