'use client';

import InfoSVG from '@/../public/svg/info.svg?component';
import { airdropSnapshotEndAtom } from '@/atoms/lbp';
import { ClientOnly } from '@/components/common/ClientOnly';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import BindConnect from '@/components/web3/BindConnect';
import { CDN_URL } from '@/constants';
import { AIRDROP_COUNT, ETHERS, SELL_COUNT } from '@/constants/events';
import { useBelongingDragonBall } from '@/hooks/events/useBelongingDragonBall';
import { useFetchBuffAddress } from '@/hooks/events/useBuffAddress';
import { useMDBLShares } from '@/hooks/events/useMDBLShares';
import { useMainAccount } from '@/hooks/wallet';
import { clsxm, formatNumber, shortenAddress } from '@/utils';
import Decimal from 'decimal.js-light';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import AirdropCountDown from './_components/AirdropCountDown';

const canClaim = false;

export default function Events() {
  const { majorAddress } = useMainAccount();
  const { data } = useMDBLShares();
  const { data: buffAddress } = useFetchBuffAddress({ address: majorAddress });
  const { data: dragonBall } = useBelongingDragonBall();
  const airdropSnapshotEnd = useAtomValue(airdropSnapshotEndAtom);
  const percent = useMemo(() => {
    if (!data) return 0;
    const res = Number((data * 100000n) / SELL_COUNT) / 1000;
    if (res < 0.001) return '<0.001';
    return new Decimal(res).tosd(3).toNumber();
  }, [data]);
  const showTooltip = useMemo(() => (data ?? 0n) < 1000n * ETHERS, [data]);

  const part1 = useMemo(() => {
    if (!data) return 0n;
    const res = (data * AIRDROP_COUNT) / SELL_COUNT / ETHERS;
    return res ? res : 1n;
  }, [data]);

  const part2 = useMemo(() => {
    if (!data || data < 1000n * ETHERS || !dragonBall) return 0n;
    return BigInt(dragonBall.btcDragonBallCount + dragonBall.mDragonBallCount) * 105n;
  }, [data, dragonBall]);

  const totalShare = useMemo(() => {
    if (!majorAddress) return '--';
    return (part1 + part2).toLocaleString();
  }, [majorAddress, part1, part2]);

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
          <BindConnect />
        </div>
        <div
          className={clsxm(
            'relative mx-auto flex max-w-[54.4vw] items-center justify-between bg-legendary/30 px-[1.28vw] py-[0.64vw] text-[0.96vw]/[1.6vw] font-medium text-legendary backdrop-blur-2xl xl:max-w-[680px] xl:px-4 xl:py-2 xl:text-xs/5',
            {
              'bg-blue/30 text-blue': airdropSnapshotEnd,
            },
          )}
        >
          {airdropSnapshotEnd ? (
            'Snapshot completed, stay tuned for airdrop claim schedule'
          ) : (
            <>
              Snapshot Time: 8:00 AM UTC, April 12, 2024&nbsp;
              <ClientOnly>
                <AirdropCountDown />
              </ClientOnly>
            </>
          )}
        </div>
        <div className="relative mx-auto mt-[1.28vw] w-full max-w-[54.4vw] border border-gray-600 bg-black/60 px-[2.4vw] py-[3.2vw] backdrop-blur-sm xl:mt-4 xl:max-w-[680px] xl:px-7.5 xl:py-10">
          <PatternWithoutLine />
          <p className="text-center text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Airdrop</p>
          <div className="flex-center mb-[3.2vw] mt-[0.96vw] gap-[0.48vw] xl:mb-10 xl:mt-3 xl:gap-1.5">
            <img className="h-[2.88vw] xl:h-9" src="/img/mdbl.webp" alt="mdbl" />
            <p className="text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:text-3xl/7.5">{totalShare}</p>
          </div>
          {canClaim && (
            <div className="flex-center mt-[1.28vw] xl:mt-4">
              <Button
                type="yellow"
                className="h-[3.52vw] w-[18.4vw] text-[1.28vw]/[1.28vw] font-semibold xl:h-11 xl:w-57.5 xl:text-base/4"
              >
                Claim
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-[1.6vw] border border-gray-600/50 p-[1.6vw] xl:gap-5 xl:p-5">
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
                      {data ? formatNumber(data) : 0}&nbsp;
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
                  x{dragonBall?.btcDragonBallCount ?? 0}
                </span>
                <span className="ml-[1.6vw] xl:ml-5">M-Dragon Ball</span>
                <img className="w-[1.92vw] xl:w-6" src="/img/dragon-ball-merlin.webp" alt="dragon-ball" />
                <span className="ml-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold xl:ml-1 xl:text-2xl/6">
                  x{dragonBall?.mDragonBallCount ?? 0}
                </span>
              </div>
            </div>
          </div>
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
                {buffAddress?.buffAddress && (
                  <div className="flex-center gap-[0.32vw] xl:gap-1">
                    <div className="size-[1.28vw] rounded-full border bg-white xl:size-4">
                      <img src="/img/btc.webp" className="h-full w-full" alt="merlin" />
                    </div>
                    {shortenAddress(buffAddress.buffAddress)}({shortenAddress(buffAddress.buffAAAddress)})
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
