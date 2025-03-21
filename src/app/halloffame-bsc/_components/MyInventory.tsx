import React, { useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { dvGameIdAtom } from '@/atoms/rank';
import Button from '@/components/ui/button';
import { useFetchObtain } from '@/hooks/stake/useFetchObtain';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import { useClaimGameAsset } from '@/hooks/stake/useClaimGameAsset';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import {
  useFetchRankMoboxProof,
  useRankMoboxRewardClaim,
  useReadBscLeaderboardRewards,
} from '@/hooks/rank/useFetchBscRankReward';
import { useAccount } from 'wagmi';
import { formatNumber } from '@/utils';
import { GAME_ASSETS_ID, GameAssetID } from '@/constants/gameAssets';

export default function MyInventory() {
  const gameId = useAtomValue(dvGameIdAtom);
  const { address } = useAccount();
  const { data: obtain } = useFetchObtain(gameId?.BSCGameId);
  const { mutateAsync: claimGameAsset } = useClaimGameAsset();
  const { data: gameAsset, refetch: refetchGameAsset } = useFetchGameAsset(gameId?.BSCGameId);
  const [captureClaimLoading, setCaptureClaimLoading] = useState<boolean>(false);
  const { data: moboxRes } = useFetchRankMoboxProof(address);
  const totalMobox = useMemo(() => BigInt(moboxRes?.amount ?? 0n), [moboxRes]);
  const { claimedMobox, isClaimPaused } = useReadBscLeaderboardRewards(address);
  const allowClaimMoBox = useMemo(
    () => (totalMobox > claimedMobox ? totalMobox - claimedMobox : 0n),
    [claimedMobox, totalMobox],
  );
  const { onClaimClick: onClaimMoboxClick, isLoading: isClaimMoboxLoading } = useRankMoboxRewardClaim();
  const captureBall = gameAsset?.assets?.[GAME_ASSETS_ID.CaptureBall];

  const claimAsset = async (id: GameAssetID) => {
    try {
      setCaptureClaimLoading(true);
      await claimGameAsset({ id, gameId: gameId?.BSCGameId });
      refetchGameAsset().then();
    } catch (error) {
    } finally {
      setCaptureClaimLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-[0.96vw] grid grid-cols-3 gap-[1.6vw] xl:mt-3 xl:gap-5">
        <p className="col-span-2 text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Inventory</p>
        <p className="text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Rewards</p>
        <div className="button-yellow-dark relative h-[14.4vw] bg-gradient-buff-card py-[1.6vw] xl:h-[180px] xl:py-5">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="text-center text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:text-sm/6">Stamina</div>
          <div className="flex-center mt-[1.92vw] xl:mt-6">
            <img src="/img/game-power.webp" alt="game power" className="w-[1.6vw] xl:w-5" />
            <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
              {obtain?.stamina || 0}
            </div>
          </div>
          <div className="mt-[2.88vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-9 xl:text-xs/5">
            Stamina Full Recovery in 24 Hours for All Players
          </div>
        </div>
        <div className="button-yellow-dark relative h-[14.4vw] bg-gradient-buff-card py-[1.6vw] xl:h-[180px] xl:py-5">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="text-center text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:text-sm/6">Blue Snitch</div>
          <div className="mt-[0.96vw] flex items-center justify-center xl:mt-3">
            <img src="/img/capture-ball.png" alt="capture ball" className="h-[2.24vw] xl:h-7" />
            <div className="ml-[0.32vw] mt-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold text-yellow xl:ml-1 xl:mt-1 xl:text-2xl/6">
              {captureBall?.unclaim || 0}
            </div>
          </div>
          <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium xl:mt-1 xl:text-xs/5">
            Total: {captureBall?.total || 0}
          </div>
          <div className="flex-center">
            <Button
              className="mt-[1.12vw] h-[2.88vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-3.5 xl:h-9 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
              type="yellow-shallow"
              loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
              disabled={(captureBall?.unclaim || 0) === 0}
              onClick={() => {
                ReactGA.event({ category: 'merlin', action: 'blue_snitch_claim' });
                claimAsset(10001).then();
              }}
              loading={captureClaimLoading}
            >
              Claim
            </Button>
          </div>
        </div>
        <div className="button-yellow-dark relative flex h-[14.4vw] flex-col items-center bg-gradient-buff-card py-[1.6vw] xl:h-[180px] xl:py-5">
          <PatternWithoutLine className="stroke-yellow" />
          <div className="text-center text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:text-sm/6">$MBOX</div>
          {isClaimPaused ? (
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
                className="mt-[1.12vw] h-[2.88vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-3.5 xl:h-9 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
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
    </div>
  );
}