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
import {
  useFetchRankMoboxProof,
  useRankMoboxRewardClaim,
  useReadBscLeaderboardRewards,
} from '@/hooks/rank/useFetchBscRankReward';

import { useRankEmdblRewardClaim, useRankMdblRewardClaim } from '@/hooks/rank/useRankRewardClaim';
import { useFetchRankMdblProof, useFetchRankRewardBalance, useReadLeaderboardRewards } from '@/hooks/rank/useFetchRankReward';

export default function MyRewards() {
  const [chainId] = ALLOW_CHAINS;
  const { claimMerl } = CONTRACT_ADDRESSES;
  const { address } = useAccount();
  const { data: rewards, refetch: refetchRewards } = useFetchMyRewards(address);
  const { data: merl, refetch: refetchMerl } = useFetchRankMerlProof(address);
  const { data: moboxRes } = useFetchRankMoboxProof(address);
  const { mutateAsync: mutateMdbl, isPaused: claimMdblLoading } = useFetchFundRewardClaim();

  const totalMobox = useMemo(() => BigInt(moboxRes?.amount ?? 0n), [moboxRes]);
  const { claimedMobox, isClaimPaused: isClaimPausedBsc } = useReadBscLeaderboardRewards(address);
  const { onClaimClick: onClaimMoboxClick, isLoading: isClaimMoboxLoading } = useRankMoboxRewardClaim();
  const allowClaimMoBox = useMemo(
    () => (totalMobox > claimedMobox ? totalMobox - claimedMobox : 0n),
    [claimedMobox, totalMobox],
  );

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
        amount: formatNumber(BigInt(rewards!.mdbl!.balance), false),
        total: formatNumber(BigInt(rewards!.mdbl!.total), false),
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
        amount: formatNumber(total - received, false),
        total: formatNumber(total, false),
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

  const { data: emdblRes } = useFetchRankRewardBalance(address);
  const { claimedEmdbl, claimedMdbl, isClaimPaused } = useReadLeaderboardRewards(address);
  const { data: mdblRes } = useFetchRankMdblProof(address);
  const totalEmdbl = useMemo(() => BigInt(emdblRes?.rewardBalance ?? 0n), [emdblRes]);
  const totalMdbl = useMemo(() => BigInt(mdblRes?.amount ?? 0n), [mdblRes]);
  const allowClaimEmdbl = useMemo(
    () => (totalEmdbl > claimedEmdbl ? totalEmdbl - claimedEmdbl : 0n),
    [claimedEmdbl, totalEmdbl],
  );
  const allowClaimMdbl = useMemo(() => (totalMdbl > claimedMdbl ? totalMdbl - claimedMdbl : 0n), [claimedMdbl, totalMdbl]);
  const { onClaimClick: onClaimEmdblClick, isLoading: isClaimEmdblLoading } = useRankEmdblRewardClaim();
  const { onClaimClick: onClaimMdblClick, isLoading: isClaimMdblLoading } = useRankMdblRewardClaim();

  return (
    <>
      <div className="relative flex h-[15.04vw] w-[190.4vw] flex-shrink-0 flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:w-[238px] xl:pt-5">
        <img
          src="/img/reward-bg-04.png"
          className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">$MDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/img/mdbl-in-game.png" className="h-[2.24vw] xl:h-7" />
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
      <div className="relative flex h-[15.04vw] w-[190.4vw] flex-shrink-0 flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:w-[238px] xl:pt-5">
        <img
          src="/img/rank-reward-bg.webp"
          className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">eMDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/svg/emdbl.svg" alt="emdbl" className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
            {formatNumber(allowClaimEmdbl, false)}
          </div>
        </div>
        <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {formatNumber(totalEmdbl, false)}</p>
        <Button
          className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          loading={isClaimEmdblLoading}
          disabled={!allowClaimEmdbl}
          onClick={() => {
            if (!allowClaimEmdbl) return;
            onClaimEmdblClick().then();
          }}
        >
          {allowClaimEmdbl === 0n && totalEmdbl > 0n ? 'Claimed' : 'Claim'}
        </Button>
      </div>
      <div className="relative flex h-[15.04vw] w-[190.4vw] flex-shrink-0 flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:w-[238px] xl:pt-5">
        <img
          src="/img/rank-reward-bg.webp"
          alt="mdbl"
          className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">$MDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/img/mdbl.webp" alt="mdbl" className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
            {formatNumber(allowClaimMdbl, false)}
          </div>
        </div>
        <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {formatNumber(totalMdbl, false)}</p>
        <Button
          className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          loading={isClaimMdblLoading}
          disabled={!allowClaimMdbl}
          onClick={() => {
            if (!allowClaimMdbl || !mdblRes) return;
            onClaimMdblClick(mdblRes).then();
          }}
        >
          {allowClaimMdbl === 0n && totalMdbl > 0n ? 'Claimed' : 'Claim'}
        </Button>
      </div>
      <div className="flex-center gap-[1.76vw] xl:col-end-4 xl:gap-5.5">
        <div className="relative flex h-[15.04vw] w-[190.4vw] flex-shrink-0 flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:w-[238px] xl:pt-5">
          <img
            src="/img/reward-bg-05.png"
            className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
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
        <div className="relative flex h-[15.04vw] w-[190.4vw] flex-shrink-0 flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:w-[238px] xl:pt-5">
          <img
            src="/img/reward-bg-06.png"
            className="absolute bottom-0 left-0 -z-10 h-full object-cover object-center"
            alt=""
          />
          <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">MBOX</div>
          {/* <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
            <img src="/img/mobox.png" className="h-[2.24vw] xl:h-7" alt="mobox" />
            <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
              {formatNumber(allowClaimMoBox, false)}
            </div>
          </div> 
          <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {formatNumber(totalMobox, false)}</p>*/}
          {isClaimPausedBsc ? (
            <div className="flex-center flex-1 text-center text-[1.12vw]/[1.6vw] text-gray-300 xl:text-sm/5">
              Revealing at the end of season
            </div>
          ) : (
            <>
              <div className="mt-[0.96vw] flex items-center justify-center xl:mt-3">
                <img src="/img/mobox.png" alt="mobox" className="h-[2.24vw] xl:h-7" />
                <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
                  {formatNumber(allowClaimMoBox, false)}
                </div>
              </div>
              <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium xl:mt-1 xl:text-xs/5">
                Total: {formatNumber(totalMobox, false)}
              </div>
              <Button
                className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
                type="yellow-shallow"
                loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
                loading={isClaimMoboxLoading}
                disabled={!allowClaimMoBox}
                onClick={() => {
                  if (!allowClaimMoBox || !moboxRes) return;
                  onClaimMoboxClick(moboxRes).then();
                }}
              >
                {allowClaimMoBox === 0n && totalMobox > 0n ? 'Claimed' : 'Claim'}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
