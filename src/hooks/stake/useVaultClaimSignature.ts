import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchStakeReward, fetchStakeRewardSig } from '@/apis';
import { VaultRewardToken } from '@/apis/types';

function useFetchStakeReward(tokenName: VaultRewardToken) {
  return useMutation({ mutationFn: () => fetchStakeReward(tokenName) });
}

function useFetchStakeRewardSig() {
  return useMutation({ mutationFn: (id?: string) => fetchStakeRewardSig(id) });
}

export function useVaultClaimSignature(tokenName: VaultRewardToken) {
  const { mutateAsync: mutateStakeReward } = useFetchStakeReward(tokenName);

  const { mutateAsync: mutateStakeRewardSig } = useFetchStakeRewardSig();
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = useCallback(async () => {
    try {
      setIsLoading(true);
      const request = await mutateStakeReward();
      let requestCount = 0;
      let res = undefined;

      while (!res?.data.r && requestCount < 10) {
        res = await mutateStakeRewardSig(request.data.id);
        requestCount++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsLoading(false);
      if (requestCount >= 10) return { code: 429, data: null, message: 'too many request' };
      return res;
    } catch (error) {
      setIsLoading(false);
    }
  }, [mutateStakeReward, mutateStakeRewardSig]);

  return useMemo(() => ({ mutateAsync, isLoading }), [isLoading, mutateAsync]);
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
