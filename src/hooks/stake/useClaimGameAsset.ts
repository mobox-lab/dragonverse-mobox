import { toast } from 'react-toastify';
import { claimGameAsset } from '@/apis';
import { GameAssetID } from '@/constants/gameAssets';
import { useMutation } from '@tanstack/react-query';

export function useClaimGameAsset() {
  return useMutation({
    mutationFn: ({ id, gameId }: { id: GameAssetID; gameId?: string }) => claimGameAsset(id, gameId),
    onSuccess() {
      toast.success('Claim Successfully.');
    },
    onError(error) {
      toast.error(error?.message ?? 'Claim Failed.');
    }
  });
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
