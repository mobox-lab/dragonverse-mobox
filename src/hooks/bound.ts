import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { fetchBindAddress } from '@/apis';
import { BindAddressParams } from '@/apis/types';
import { useMutation } from '@tanstack/react-query';
import { useFetchBuffAddress } from '@/hooks/events/useBuffAddress';
import { useFetchStakeBuff } from '@/hooks/stake/useFetchStakeBuff';

export const useMutationBindAddress = () => {
  const { address } = useAccount();
  const { refetch } = useFetchBuffAddress({ address });
  const { refetch: refetchStakeBuff } = useFetchStakeBuff(address);

  return useMutation({
    mutationFn: (data: BindAddressParams) => fetchBindAddress(data),
    onSuccess: () => {
      refetch().then();
      refetchStakeBuff().then();
    },
    onError: (error: any) => {
      const { data, code } = error ?? {};
      if (code === 400 && data?.[0] === 'particle service error')
        toast.error('AA Wallet service is unstable, please try again later.');
    },
  });
};
