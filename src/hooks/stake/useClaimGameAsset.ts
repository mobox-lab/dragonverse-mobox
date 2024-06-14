import { claimGameAsset } from '@/apis';
import { useMutation } from '@tanstack/react-query';

export function useClaimGameAsset() {
  return useMutation({
    mutationFn: ({ type, gameId }: { type: 'DragonEgg' | 'CaptureBall'; gameId?: string }) => claimGameAsset(type, gameId),
  });
}
