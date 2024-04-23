import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchStakeReward, fetchStakeRewardSig } from '@/apis';

function useFetchStakeReward() {
  return useMutation({ mutationFn: () => fetchStakeReward() });
}

function useFetchStakeRewardSig() {
  return useMutation({ mutationFn: (id?: string) => fetchStakeRewardSig(id) });
}

export function useEMDBLClaimSignature() {
  const { mutateAsync: mutateStakeReward } = useFetchStakeReward();

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
