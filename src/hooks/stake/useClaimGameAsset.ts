import { claimGameAsset } from '@/apis';
import { useMutation } from '@tanstack/react-query';

export function useClaimGameAsset() {
  return useMutation({ mutationFn: (type: 'DragonEgg' | 'CaptureBall') => claimGameAsset(type) });
}
