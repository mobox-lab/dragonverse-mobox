'use client';

import { useMemo } from 'react';
import { formatEther } from 'viem';
import { CDN_URL } from '@/constants';
import Decimal from 'decimal.js-light';
import { toast } from 'react-toastify';
import Button from '@/components/ui/button';
import { formatNumber, shortenAddress } from '@/utils';
import { ETHERS, SELL_COUNT } from '@/constants/events';
import InfoSVG from '@/../public/svg/info.svg?component';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useSnapshotData } from '@/hooks/events/useSnapshotData';
import { useMainAccount, useMainChain, useMainWriteContract } from '@/hooks/wallet';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import SnapShotWalletButton from '@/app/events/_components/SnapShotWalletButton';
import { AIRDROP_CLAIM_ABI, useAirdropIsClaimed, useFetchAirdropProof } from '@/hooks/events/useAirdropClaim';

export default function Events() {
  const { data } = useSnapshotData();
  const { majorAddress } = useMainAccount();
  const { isSupportedChain } = useMainChain();
  const percent = useMemo(() => {
    if (!data) return 0;
    const res = Number((BigInt(data.mdblBalance) * 100000n) / SELL_COUNT) / 1000;
    if (res < 0.001) return '<0.001';
    return new Decimal(res).tosd(3).toNumber();
  }, [data]);
  const { data: proofData } = useFetchAirdropProof(majorAddress);
  const { data: isClaimed, refetch: refetchIsClaimed } = useAirdropIsClaimed(proofData?.index);
  const { isLoading, writeContract } = useMainWriteContract({
    onSuccess: () => {
      refetchIsClaimed().then();
      toast.success('claimed successfully.');
    },
    onError: (error) => {
      if (error?.name === 'EstimateGasExecutionError') {
        toast.error(error.message);
        return;
      }
    },
  });
  const showTooltip = useMemo(() => BigInt(data?.mdblBalance ?? 0n) < 1000n * ETHERS, [data]);

  const part1 = useMemo(() => Number(formatEther(BigInt(data?.rewardByBalance ?? 0n))), [data?.rewardByBalance]);

  const part2 = useMemo(() => Number(formatEther(BigInt(data?.rewardByBall ?? 0n))), [data?.rewardByBall]);

  const myAirdrop = useMemo(() => Number(formatEther(BigInt(data?.airdropMdblBalance ?? 0n))), [data?.airdropMdblBalance]);

  const onClaim = () => {
    if (!proofData) return;
    writeContract({
      abi: AIRDROP_CLAIM_ABI,
      functionName: 'claim',
      args: [proofData.index + 1, proofData.amount, proofData.proof],
      address: CONTRACT_ADDRESSES.airdrop,
    }).then();
  };

  return (
    <div className="pb-[3.84vw] xl:pb-12">
      <img
        src={`${CDN_URL}/dragon-banner-07.webp`}
        alt=""
        className="absolute left-1/2 top-0 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
      />
      <div className="pt-[1.92vw] xl:pt-6">
        <div className="flex-center gap-[0.8vw] xl:gap-2.5">
          <img className="h-[4.8vw] xl:h-15" src="/img/mdbl.webp" alt="mdbl" />
          <img className="h-[4.96vw] xl:h-15.5" src="/img/events/title_fair_launch.webp" alt="title" />
        </div>
        <img
          className="mx-auto mt-[0.96vw] h-[3.36vw] xl:mt-3 xl:h-10.5"
          src="/img/events/subtitle_airdrop.webp"
          alt="subtitle"
        />
      </div>
      <div className="mt-[14.4vw] xl:mt-45">
        <div className="flex-center pb-[2.4vw] xl:pb-7.5">
          <SnapShotWalletButton data={data} />
        </div>
        <div className="relative mx-auto mt-[1.28vw] w-full max-w-[54.4vw] border border-gray-600 bg-black/60 px-[2.4vw] py-[3.2vw] backdrop-blur-sm xl:mt-4 xl:max-w-[680px] xl:px-7.5 xl:py-10">
          <PatternWithoutLine />
          <p className="text-center text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Airdrop</p>
          <div className="flex-center mb-[1.6vw] mt-[0.96vw] gap-[0.48vw] xl:mb-5 xl:mt-3 xl:gap-1.5">
            <img className="h-[2.88vw] xl:h-9" src="/img/mdbl.webp" alt="mdbl" />
            <p className="text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:text-3xl/7.5">
              {majorAddress ? myAirdrop.toLocaleString() : '--'}
            </p>
          </div>
          {isSupportedChain && isClaimed !== undefined ? (
            <div className="flex-center">
              <Button
                type="yellow"
                loading={isLoading}
                disabled={isClaimed}
                onClick={onClaim}
                className="h-[3.52vw] w-[18.4vw] text-[1.28vw]/[1.28vw] font-semibold xl:h-11 xl:w-57.5 xl:text-base/4"
              >
                {isClaimed ? 'Claimed' : 'Claim'}
              </Button>
            </div>
          ) : null}
          <div className="mt-[3.2vw] flex flex-col gap-[1.6vw] border border-gray-600/50 p-[1.6vw] xl:mt-10 xl:gap-5 xl:p-5">
            <p className="flex items-center gap-[0.96vw] align-middle text-[1.12vw]/[1.92vw] font-semibold xl:gap-3 xl:text-sm/6">
              <span className="text-[1.6vw]/[1.92vw] text-green xl:text-xl/6">Part I:</span> LBP $MDBL Holding Airdrop
            </p>
            <div className="flex justify-between">
              <div className="flex-center h-[2.88vw] gap-[0.48vw] text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:h-9 xl:gap-1.5 xl:text-3xl/7.5">
                <img src="/img/mdbl.webp" alt="mdbl" className="h-[2.88vw] xl:h-9" />
                {majorAddress ? part1.toLocaleString() : '--'}
              </div>
              <div className="flex items-center gap-[0.32vw] text-center text-[1.28vw]/[1.76vw] font-semibold xl:gap-1 xl:text-base/5.5">
                <img src="/img/mdbl.webp" alt="mdbl" className="mr-[0.16vw] h-[1.92vw] xl:mr-0.5 xl:h-6" />
                $MDBL Balance :
                <div className="ml-[1.28vw] flex justify-end text-[1.92vw]/[1.92vw] font-semibold text-yellow xl:ml-4 xl:text-2xl/6">
                  {majorAddress ? (
                    <>
                      {data ? formatNumber(BigInt(data.mdblBalance)) : 0}&nbsp;
                      {percent ? <p className="text-[1.12vw]/[1.92vw] xl:text-sm/6">({percent}%)</p> : null}
                    </>
                  ) : (
                    '--'
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[0.96vw] flex flex-col border border-gray-600/50 p-[1.6vw] xl:mt-3 xl:p-5">
            {majorAddress
              ? showTooltip && (
                  <div className="mb-[1.28vw] flex gap-[0.48vw] bg-blue/20 px-[1.28vw] py-[0.64vw] text-[0.96vw]/[1.6vw] xl:mb-4 xl:gap-1.5 xl:px-4 xl:py-2 xl:text-xs/5">
                    <InfoSVG className="w-[1.12vw] xl:w-3.5" />
                    To be eligible: you must hold ≥ 1000 $MDBL
                  </div>
                )
              : null}
            <div className="flex justify-between text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">
              <p className="flex items-center gap-[0.96vw] align-middle text-[1.12vw]/[1.92vw] font-semibold xl:gap-3 xl:text-sm/6">
                <span className="text-[1.6vw]/[1.92vw] text-green xl:text-xl/6">Part II:</span> Dragon Ball Holders Airdrop
              </p>
              <p className="flex items-center gap-[0.16vw] xl:gap-0.5">
                (1
                <img className="w-[1.6vw] xl:w-5" src="/img/dragon-ball.webp" alt="dragon-ball" />
                &nbsp;or 1&nbsp;
                <img className="w-[1.6vw] xl:w-5" src="/img/dragon-ball-merlin.webp" alt="dragon-ball-merlin" />
                = 105
                <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.6vw] xl:h-5" /> )
              </p>
            </div>
            <div className="mt-[1.6vw] flex justify-between xl:mt-5">
              <div className="flex-center h-[2.88vw] gap-[0.48vw] text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:h-9 xl:gap-1.5 xl:text-3xl/7.5">
                <img src="/img/mdbl.webp" alt="mdbl" className="h-[2.88vw] xl:h-9" />
                {majorAddress ? part2.toLocaleString() : '--'}
              </div>
              <div className="flex-center gap-[0.32vw] text-[1.28vw]/[1.76vw] font-semibold xl:gap-1 xl:text-base/5.5">
                Dragon Ball <img className="w-[1.92vw] xl:w-6" src="/img/dragon-ball.webp" alt="dragon-ball" />
                <span className="ml-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold xl:ml-1 xl:text-2xl/6">
                  x{data?.btcDragonBallCount ?? 0}
                </span>
                <span className="ml-[1.6vw] xl:ml-5">M-Dragon Ball</span>
                <img className="w-[1.92vw] xl:w-6" src="/img/dragon-ball-merlin.webp" alt="dragon-ball" />
                <span className="ml-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold xl:ml-1 xl:text-2xl/6">
                  x{data?.mDragonBallCount ?? 0}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs/5 text-gray-300">Snapshot Time: 8: 00 AM UTC, April 12, 2024</p>
          <div className="flex-center mt-[1.6vw] h-[1.6vw] gap-[0.96vw] text-[0.96vw]/[1.6vw] xl:mt-5 xl:h-5 xl:gap-3 xl:text-xs/5">
            {majorAddress ? (
              <>
                Calculated via wallet:
                <div className="flex-center gap-[0.32vw] xl:gap-1">
                  <div className="size-[1.28vw] rounded-full border bg-white xl:size-4">
                    <img src="/img/merlin-chain.png" className="h-full w-full" alt="merlin" />
                  </div>
                  {shortenAddress(majorAddress)}
                </div>
                {data?.buffAddress && (
                  <div className="flex-center gap-[0.32vw] xl:gap-1">
                    <div className="size-[1.28vw] rounded-full border bg-white xl:size-4">
                      <img src="/img/btc.webp" className="h-full w-full" alt="merlin" />
                    </div>
                    {shortenAddress(data.buffAddress)}({shortenAddress(data.buffAAAddress)})
                  </div>
                )}
              </>
            ) : (
              <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">Connect your wallet to check eligibility</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
