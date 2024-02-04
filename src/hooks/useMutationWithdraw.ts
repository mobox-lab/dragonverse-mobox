import { withdrawMobox } from '@/apis/mobox';
import { WithdrawData } from '@/apis/types';
import { useMutation } from '@tanstack/react-query';

export const useMutationWithdraw = () => {
  return useMutation({
    mutationFn: (data: WithdrawData) => withdrawMobox(data),
  });
};
