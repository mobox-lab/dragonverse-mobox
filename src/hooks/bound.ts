import { useAccount } from 'wagmi';
import { fetchBindAddress } from '@/apis';
import { BindAddressParams } from '@/apis/types';
import { useMutation } from '@tanstack/react-query';
import { useFetchBuffAddress } from '@/hooks/events/useBuffAddress';
import { useBelongingDragonBall } from '@/hooks/events/useBelongingDragonBall';

export const useMutationBindAddress = () => {
  const { address } = useAccount();
  const { refetch } = useFetchBuffAddress({ address });
  const { refetch: refetchDragonBall } = useBelongingDragonBall();

  return useMutation({
    mutationFn: (data: BindAddressParams) => fetchBindAddress(data),
    onSuccess: () => {
      refetch().then();
      refetchDragonBall().then();
    },
  });
};
