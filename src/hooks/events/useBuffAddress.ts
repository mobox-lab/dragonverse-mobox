import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchBuffAddress, fetchEvmAddress, fetchUnbindAddress } from '@/apis';
import { useAccount } from 'wagmi';
import { useBelongingDragonBall } from '@/hooks/events/useBelongingDragonBall';

export function useFetchBuffAddress({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_buff_address', address],
    queryFn: () => fetchBuffAddress(address),
    staleTime: 0,
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!address,
  });
}

export function useMutationEvmAddress() {
  return useMutation({
    mutationFn: ({ address }: { address?: string }) => fetchEvmAddress(address),
  });
}

export function useMutationUnbindAddress() {
  const { address } = useAccount();
  const { refetch } = useFetchBuffAddress({ address });
  const { refetch: refetchDragonBall } = useBelongingDragonBall();

  return useMutation({
    mutationFn: () => fetchUnbindAddress(),
    onSuccess: () => {
      refetch().then();
      refetchDragonBall().then();
    },
  });
}
