import { EMDBLABI } from '@/abis';
import { refetchPendingCountAtom, refetchPendingHistoryListAtom, refetchStakeHistoryListAtom } from '@/atoms/stake';
import Button from '@/components/ui/button';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useMainChain, useMainWriteContract } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import { useAtomValue } from 'jotai';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';

export default function StakeClaimButton({ redeemIndex, className }: { redeemIndex?: number; className?: string }) {
  const refetchPending = useAtomValue(refetchPendingHistoryListAtom);
  const refetchStake = useAtomValue(refetchStakeHistoryListAtom);
  const refetchPendingCount = useAtomValue(refetchPendingCountAtom);
  const { inactiveRefetch } = useStakeContractRead();
  const { isSupportedChain, switchMainChain } = useMainChain();

  const { writeContract, isLoading } = useMainWriteContract({
    onError: (error) => {
      if (error?.name === 'UserRejected') {
        return;
      }
      if (error?.name === 'EstimateGasExecutionError') {
        toast.error(error.message);
        return;
      }
      toast.error('Network error, please try again later');
    },
    onSuccess: (data) => {
      toast.success('Claimed successfully');
      setTimeout(() => {
        refetchPending?.();
        refetchStake?.();
        refetchPendingCount?.();
        inactiveRefetch?.();
      }, 6000);
    },
  });

  const claim = async (index?: number) => {
    ReactGA.event({ category: 'merlin', action: 'redeem_claim' });
    const hash = await writeContract({
      abi: EMDBLABI,
      functionName: 'completeRedemption',
      args: [BigInt(index ?? 0)],
      address: CONTRACT_ADDRESSES.emdbl,
    });
  };

  const onClick = async () => {
    if (isLoading) return;
    try {
      if (!isSupportedChain) {
        await switchMainChain();
      }
      claim(redeemIndex);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      loading={isLoading}
      className={clsxm(
        'flex-center h-[1.92vw] w-[7.84vw] text-[0.96vw]/[0.96vw] font-bold text-yellow xl:h-6 xl:w-[98px] xl:text-xs/3',
        className,
      )}
      type="yellow-dark"
      onClick={onClick}
    >
      Claim
    </Button>
  );
}
