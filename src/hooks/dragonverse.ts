import { fetchCode, fetchDawnBringerStatus, generateCode } from '@/apis';
import { getAccessToken } from '@/utils/authorization';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

export const useFetchDragonKeyDetail = () => {
  const { address } = useAccount();
  const { data, isLoading, refetch } = useQuery({
    enabled: !!address,
    queryKey: ['fetch_dragon_key_detail'],
    queryFn: () => fetchCode(),
    select: (res) => (res.code === 200 ? res.data : null),
  });
  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};

export const useMutationGenerateCode = () => {
  return useMutation({
    mutationFn: () => generateCode(),
    onError: (error: any) => {
      if (error.code === 401 && error.data?.[0] === 'TokenNotExist') {
        toast.error('Token does not exist. Please sign with your wallet. ');
      } else {
        toast.error(error.data[0]);
      }
    },
  });
};

export const useFetchDawnBringerStatus = () => {
  const { address } = useAccount();
  const token = getAccessToken({ address });
  const { data, isLoading, refetch } = useQuery({
    enabled: !!token,
    queryKey: ['fetch_dawn_bringer_status'],
    queryFn: () => fetchDawnBringerStatus(),
    select: (res) => (res.code === 200 ? res.data : undefined),
  });
  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};
