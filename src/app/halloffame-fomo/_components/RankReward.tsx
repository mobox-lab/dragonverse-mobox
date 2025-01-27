'use client';

import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { formatNumber } from '@/utils';
import Button from '@/components/ui/button';
import { useRankEmdblRewardClaim, useRankMdblRewardClaim } from '@/hooks/rank/useRankRewardClaim';
import { useFetchRankMdblProof, useFetchRankRewardBalance, useReadLeaderboardRewards } from '@/hooks/rank/useFetchRankReward';

export default function RankReward() {
  const { address } = useAccount();
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
          src="/img/rank-reward-bg.webp"
          className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">eMDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/img/emdbl.webp" alt="emdbl" className="h-[2.24vw] xl:h-7" />
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
    </>
  );
}
