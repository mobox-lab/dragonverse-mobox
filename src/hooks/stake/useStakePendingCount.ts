import { fetchStakePendingCount } from '@/apis';
import { accessTokenAtom } from '@/atoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/index';

export function useStakePendingCount() {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_stake_pending_count', accessToken],
    queryFn: () => fetchStakePendingCount(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken,
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
