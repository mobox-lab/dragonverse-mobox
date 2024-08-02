import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useReadContracts } from 'wagmi';
import { LeaderboardRewardsABI } from '@/abis/LeaderboardRewards';
import Button from '@/components/ui/button';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useFetchFundRewardClaim, useFetchMyRewards, useFetchRankMerlProof } from '@/hooks/rank/useFetchRankReward';
import { useMainWriteContract } from '@/hooks/wallet';
import { formatNumber } from '@/utils';

export default function MyRewards() {
  const [chainId] = ALLOW_CHAINS;
  const { claimMerl } = CONTRACT_ADDRESSES;
  const { address } = useAccount();
  const { data: rewards, refetch: refetchRewards } = useFetchMyRewards(address);
  const { data: merl, refetch: refetchMerl } = useFetchRankMerlProof(address);
  const { mutateAsync: mutateMdbl, isPaused: claimMdblLoading } = useFetchFundRewardClaim();
  const { data: rewardsReceived, refetch: refetchRewardsReceived } = useReadContracts({
    contracts: [
      {
        chainId,
        address: claimMerl,
        abi: LeaderboardRewardsABI,
        functionName: 'getUserRewardsReceived',
        args: address ? [address] : undefined,
      },
    ],
    query: { refetchInterval: 6_000, enabled: !!address },
  });
  const { writeContract, isLoading: merlClaimIsLoading } = useMainWriteContract({
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
      if (!data) return;
      toast.success('Claim succeeded');
      refetchMerl();
      refetchRewardsReceived();
    },
  });

  const mdblData = useMemo(() => {
    if (rewards?.mdbl) {
      return {
        amount: formatNumber(BigInt(rewards!.mdbl!.balance)),
        total: formatNumber(BigInt(rewards!.mdbl!.total)),
      };
    }

    return {
      amount: '0',
      total: '0',
    };
  }, [rewards]);

  const merlData = useMemo(() => {
    if (merl && rewardsReceived) {
      const total = BigInt(merl!.amount || '0');
      const received = BigInt(rewardsReceived[0]?.result?.[0] || '0');

      return {
        amount: formatNumber(total - received),
        total: formatNumber(total),
      };
    }

    return {
      amount: '0',
      total: '0',
    };
  }, [merl, rewardsReceived]);

  const onClaimMdbl = useCallback(async () => {
    if (mdblData.amount == '0' || claimMdblLoading) {
      return;
    }

    try {
      await mutateMdbl('mdbl');
      refetchRewards();
      toast.success('Claim succeeded');
    } catch (error: any) {
      toast.error(error?.message || 'Claim Failed');
    }
  }, [mdblData, claimMdblLoading]);

  const onClaimMerl = useCallback(() => {
    if (merlData.amount == '0' || merlClaimIsLoading) {
      return;
    }

    writeContract({
      abi: LeaderboardRewardsABI,
      functionName: 'usersReceiveMERLRewards',
      args: [merl!.index + 1, merl!.amount, merl!.proof],
      address: CONTRACT_ADDRESSES.claimMerl!,
    }).then();
  }, [address, writeContract, merl, merlClaimIsLoading]);

  return (
    <>
      <div className="relative flex h-[15.04vw] flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:pt-5 order-2">
        <img
          src="/img/reward-bg-04.png"
          className="absolute bottom-0 left-0 right-0 -z-10 w-full h-[75%] object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">$MDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/svg/mdbl-in-game.svg" className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
            {mdblData.amount}
          </div>
        </div>
        <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {mdblData.total}</p>
        <Button
          className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          disabled={mdblData.amount == '0'}
          loading={claimMdblLoading}
          onClick={onClaimMdbl}
        >
          Claim
        </Button>
      </div>
      <div className="relative flex h-[15.04vw] flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:pt-5 order-4">
        <img
          src="/img/reward-bg-05.png"
          className="absolute bottom-0 left-0 right-0 -z-10 w-full h-[75%] object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">$MERL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/svg/MERL.svg" className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
            {merlData.amount}
          </div>
        </div>
        <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {merlData.total}</p>
        <Button
          className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          disabled={merlData.amount == '0'}
          loading={merlClaimIsLoading}
          onClick={onClaimMerl}
        >
          Claim
        </Button>
      </div>
    </>
  );
}
