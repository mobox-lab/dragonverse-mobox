import { fetchNumberOfDragonProposals } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';

export const useFetchP12DragonProposalNum = () => {
  const { address } = useAccount();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetch_number_of_dragon_proposals', address],
    queryFn: () => fetchNumberOfDragonProposals(address),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!address,
  });

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};
