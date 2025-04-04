import { fetchStakeBuff } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchStakeBuff(address?: string) {
  return useQuery({
    queryKey: ['use_fetch_stake_buff', address],
    queryFn: () => fetchStakeBuff(address),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
    enabled: !!address,
  });
}

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
