import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import { fetchBindAddress, fetchBoundAddress } from '@/apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BindAddressParams } from '@/apis/types';

export const useFetchBoundAddress = () => {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_bound_address', accessToken],
    queryFn: () => fetchBoundAddress(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken,
  });
};

export const useMutationBindAddress = () => {
  const { refetch } = useFetchBoundAddress();

  return useMutation({
    mutationFn: (data: BindAddressParams) => fetchBindAddress(data),
    onSuccess: () => refetch(),
  });
};
