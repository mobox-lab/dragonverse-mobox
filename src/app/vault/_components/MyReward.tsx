'use client';

import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { EMDBLABI } from '@/abis';
import { rewardDetailDialogAtom, rewardHistoryDialogAtom } from '@/atoms/stake';
import { ClientOnly } from '@/components/common/ClientOnly';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useClaimGameAsset } from '@/hooks/stake/useClaimGameAsset';
import { useEMDBLClaimSignature } from '@/hooks/stake/useEMDBLClaimSignature';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import { useFetchObtain } from '@/hooks/stake/useFetchObtain';
import { useMainAccount, useMainChain, useMainWriteContract } from '@/hooks/wallet';
import { formatNumber } from '@/utils';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import RewardCountdown from './RewardCountdown';

export default function MyReward() {
  const setRewardDetailDialog = useSetAtom(rewardDetailDialogAtom);
  const setRewardHistoryDialog = useSetAtom(rewardHistoryDialogAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();
  const { evmAddress } = useMainAccount();
  const { totalAccruedBalance, accruedBalance, refetch } = useStakeContractRead();

  const { data: obtain, nextLevel } = useFetchObtain();
  const { data: gameAsset, refetch: refetchGameAsset } = useFetchGameAsset();
  const { mutateAsync: claimGameAsset } = useClaimGameAsset();
  const [captureClaimLoading, setCaptureClaimLoading] = useState<boolean>(false);
  const [eggClaimLoading, setEggClaimLoading] = useState<boolean>(false);

  const { mutateAsync, isLoading } = useEMDBLClaimSignature();
  const { writeContract, isLoading: writeLoading } = useMainWriteContract({
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
      const log = data[0];
      toast.success(`Claim ${formatNumber(log.args.value)} eMDBL succeeded`);
      refetch();
    },
  });
  const claimAccrued = async () => {
    if (!evmAddress || !accruedBalance) return;
    if (!isSupportedChain) {
      switchMainChain();
      return;
    }
    ReactGA.event({ category: 'merlin', action: 'claim_emdbl' });
    const res = await mutateAsync();
    if (res?.code === 200) {
      const data = res.data;
      const hash = await writeContract({
        abi: EMDBLABI,
        functionName: 'permitMint',
        args: [evmAddress, BigInt(data?.balance || '0'), data?.deadline, data?.v, data?.r, data?.s],
        address: CONTRACT_ADDRESSES.emdbl,
      });
    } else {
      toast.error('Error request.');
    }
  };

  const claimAsset = async (type: 'DragonEgg' | 'CaptureBall') => {
    try {
      if (type === 'DragonEgg') {
        setEggClaimLoading(true);
      } else if (type === 'CaptureBall') {
        setCaptureClaimLoading(true);
      }
      const res = await claimGameAsset(type);
      if (res.code === 200) {
        refetchGameAsset();
        toast.success('Claim Successfully.');
      } else {
        toast.error('Claim Failed.');
      }
    } catch (error) {
    } finally {
      if (type === 'DragonEgg') {
        setEggClaimLoading(false);
      } else if (type === 'CaptureBall') {
        setCaptureClaimLoading(false);
      }
    }
  };
  return (
    <div className="mt-[2.88vw] xl:mt-9">
      <div className="grid grid-cols-2 gap-[1.92vw] xl:gap-6">
        <div className="flex items-center justify-between">
          <p className="text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Reward</p>
          <p
            className="flex cursor-pointer items-center text-[1.28vw]/[1.76vw] font-semibold text-blue xl:text-base/5.5"
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'reward_detail' });
              setRewardDetailDialog(true);
            }}
          >
            Reward Detail <ArrowSvg className="h-[1.12vw] rotate-90 gap-[0.16vw] fill-blue xl:h-3.5 xl:gap-0.5" />
          </p>
        </div>
      </div>
      <div className="mt-[0.96vw] grid h-[14.24vw] grid-cols-2 gap-[1.92vw] xl:mt-3 xl:h-[178px] xl:gap-6">
        <div className="relative flex h-full items-center border border-gray-600 bg-black/60 backdrop-blur-sm">
          <PatternWithoutLine />
          <img draggable={false} src="/img/reward-bg-01_2.webp" alt="mdbl" className="absolute inset-0 -z-10 -mb-1 h-full" />
          <div className="relative flex flex-grow flex-col items-center">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">Accrued eMDBL</div>
            <div className="flex-center mt-[0.96vw] xl:mt-3">
              <img src="/svg/emdbl.svg" alt="emdbl" className="h-[2.24vw] xl:h-7" />
              <div className="ml-[0.64vw] text-[2.4vw]/[3.52vw] font-medium text-yellow xl:ml-2 xl:text-3xl/11">
                {formatNumber(accruedBalance, false)}
              </div>
            </div>
            <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-1 xl:text-xs/5">
              Total: {formatNumber(totalAccruedBalance, false)}
            </div>
          </div>
          <div className="flex flex-grow flex-col items-center">
            <ClientOnly>
              <RewardCountdown />
            </ClientOnly>
            <Button
              className="mt-[0.64vw] h-[3.52vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-2 xl:h-11 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
              type="yellow-shallow"
              onClick={claimAccrued}
              loading={isLoading || writeLoading}
              loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
              disabled={accruedBalance === 0n}
            >
              Claim
            </Button>
            <p
              className="mt-2 cursor-pointer text-[1.28vw]/[1.76vw] font-semibold text-blue xl:text-base/5.5"
              onClick={() => {
                ReactGA.event({ category: 'merlin', action: 'reward_history' });
                setRewardHistoryDialog(true);
              }}
            >
              Reward History
            </p>
          </div>
        </div>
        {/* <div className="flex-center relative h-full border border-gray-600 bg-black/60 text-[0.96vw]/[1.6vw] font-medium text-gray-300 backdrop-blur-sm xl:text-xs/5">
          <PatternWithoutLine />
          <img
            draggable={false}
            src="/img/reward-more-bg.webp"
            alt="more-reward"
            className="absolute inset-0 h-full w-full object-cover"
          />
          More rewards revealing soon
        </div> */}
        <div className="relative h-[14.24vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[178px]">
          <PatternWithoutLine />
          <img draggable={false} src="/img/reward-bg-power.webp" alt="mdbl" className="absolute left-0 top-0 h-full w-full" />
          <div className="flex h-full w-full">
            <div className="flex-center relative ml-[5.12vw] h-full flex-col xl:ml-16">
              <div className="flex items-center text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">
                Stamina
                <span className="ml-[0.64vw] text-[0.96vw]/[1.6vw] text-yellow xl:ml-2 xl:text-xs/5">
                  (Basic: {obtain?.basicStamina || 0})
                </span>
              </div>
              <div className="flex-center mt-[0.96vw] xl:mt-3">
                <img src="/img/game-power.webp" alt="game power" className="w-[2.24vw] xl:w-7" />
                <div className="ml-[0.64vw] text-[2.4vw]/[3.52vw] font-semibold text-yellow xl:ml-2 xl:text-3xl/11">
                  +{obtain?.boostStamina || 0}
                </div>
              </div>
              {(obtain?.basicStamina || 0) === 0 ? (
                <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-1 xl:text-xs/5">
                  You are not in the whitelist of this season.
                </div>
              ) : (
                <div className="mt-[0.32vw] flex text-center text-[0.96vw]/[1.6vw] font-medium xl:mt-1 xl:text-xs/5">
                  Next Level: {formatNumber(BigInt(nextLevel?.eMDBL || 0), false)} active eMDBL {'->'}
                  <img src="/img/game-power.webp" alt="game power" className="mx-[0.32vw] w-[1.6vw] xl:mx-1 xl:w-5" />
                  <span className="font-semibold text-yellow">
                    +{Number(nextLevel?.stamina || 0) - (obtain?.basicStamina || 0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-[2.88vw] text-[1.28vw]/[1.76vw] font-semibold xl:mt-9 xl:text-base/5.5">My Items</p>
      <div className="mt-[0.96vw] grid grid-cols-2 gap-[1.92vw] xl:mt-3 xl:gap-6">
        <div className="grid grid-cols-2 gap-[1.92vw] xl:gap-6">
          <div className="relative h-[14.24vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[178px]">
            <PatternWithoutLine />
            <img
              draggable={false}
              src="/img/reward-bg-snitch.webp"
              alt="snitch"
              className="absolute left-0 top-0 h-full w-full"
            />
            <div className="flex-center h-full flex-col">
              <div className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">Blue Snitch</div>
              <div className="mt-[0.96vw] flex items-center xl:mt-3">
                <img src="/svg/capture-ball.svg" alt="capture ball" className="h-[2.24vw] xl:h-7" />
                <div className="ml-[0.32vw] mt-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold text-yellow xl:ml-1 xl:mt-1 xl:text-2xl/6">
                  {gameAsset?.DragonCaptureBall.unclaim || 0}
                </div>
              </div>
              <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-1 xl:text-xs/5">
                Total: {gameAsset?.DragonCaptureBall.total || 0}
              </div>
              <Button
                className="mt-[1.12vw] h-[3.52vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-3.5 xl:h-11 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
                type="yellow-shallow"
                loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
                disabled={(gameAsset?.DragonCaptureBall.unclaim || 0) === 0}
                onClick={() => {
                  ReactGA.event({ category: 'merlin', action: 'blue_snitch_claim' });
                  claimAsset('CaptureBall');
                }}
                loading={captureClaimLoading}
              >
                Claim
              </Button>
            </div>
          </div>
          {/* <div className="relative h-[14.24vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[178px]">
            <PatternWithoutLine />
            <img draggable={false} src="/img/reward-bg-egg.webp" alt="egg" className="absolute left-0 top-0 h-full w-full" />
            <div className="flex-center h-full flex-col">
              <div className="text-[1.12vw]/[1.92vw] font-semibold xl:text-sm/6">Dragon Egg</div>
              <div className="mt-[0.96vw] flex items-center xl:mt-3">
                <img src="/img/hatch-egg-min.png" alt="egg" className="h-[2.24vw] xl:h-7" />
                <div className="ml-[0.32vw] mt-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold text-yellow xl:ml-1 xl:mt-1 xl:text-2xl/6">
                  {gameAsset?.DragonEgg.unclaim || 0}
                </div>
              </div>
              <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-1 xl:text-xs/5">
                Total: {gameAsset?.DragonEgg.total || 0}
              </div>
              <Button
                className="mt-[1.12vw] h-[3.52vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-3.5 xl:h-11 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
                type="yellow-shallow"
                loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
                disabled={(gameAsset?.DragonEgg.unclaim || 0) === 0}
                onClick={() => {
                  ReactGA.event({ category: 'merlin', action: 'dragon_egg_claim' });
                  claimAsset('DragonEgg');
                }}
                loading={eggClaimLoading}
              >
                Claim
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
