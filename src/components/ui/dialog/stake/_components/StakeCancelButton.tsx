import LoadingSvg from '@/../public/svg/loading.svg?component';
import { EMDBLABI } from '@/abis';
import { refetchPendingCountAtom, refetchPendingHistoryListAtom, refetchStakeHistoryListAtom } from '@/atoms/stake';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useMainChain, useMainWriteContract } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import { useAtomValue } from 'jotai';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';

export default function StakeCancelButton({ redeemIndex }: { redeemIndex?: number }) {
  const refetchPending = useAtomValue(refetchPendingHistoryListAtom);
  const refetchStake = useAtomValue(refetchStakeHistoryListAtom);
  const refetchPendingCount = useAtomValue(refetchPendingCountAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();
  const { inactiveRefetch } = useStakeContractRead();

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
      toast.success('Cancelled successfully');
      setTimeout(() => {
        refetchPending?.();
        refetchStake?.();
        refetchPendingCount?.();
        inactiveRefetch?.();
      }, 6000);
    },
  });

  const cancel = async (index?: number) => {
    ReactGA.event({ category: 'merlin', action: 'confirm_redeem' });
    const hash = await writeContract({
      abi: EMDBLABI,
      functionName: 'cancelRedemption',
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
      cancel(redeemIndex);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <a
      onClick={onClick}
      className={clsxm(
        'text-link flex-center w-[3.84vw] flex-grow-[2] select-none justify-end pr-[1.28vw] text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pr-4 xl:text-sm/4.5',
        { 'cursor-default hover:no-underline': isLoading },
      )}
    >
      Cancel
      {isLoading ? <LoadingSvg className="ml-[0.32vw] size-[1.12vw] animate-spin fill-blue xl:ml-1 xl:size-3.5" /> : null}
    </a>
  );
}
