'use client';

import ReactGA from 'react-ga4';
import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import { rewardDetailDialogAtom } from '@/atoms/stake';
import { VaultRewardToken } from '@/apis/types';
import { EMDBLABI, TokenRewardDistribution } from '@/abis';
import { ClientOnly } from '@/components/common/ClientOnly';
import RewardCountdown from './RewardCountdown';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useVaultClaimSignature } from '@/hooks/stake/useVaultClaimSignature';
import { useMainAccount, useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { formatNumber } from '@/utils';
import { ALLOW_CHAINS } from '@/constants';
import Reward from './Reward';
import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { useVaultMerlReward } from '@/hooks/useVaultMerlReward';

export default function MyReward() {
  const setRewardDetailDialog = useSetAtom(rewardDetailDialogAtom);
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const { evmAddress } = useMainAccount();
  const { totalAccruedBalance, accruedBalance, refetch } = useStakeContractRead();
  const { balance: merlBalance, total: totalMerlBalance, refetch: refetchMerlReward } = useVaultMerlReward();

  const { mutateAsync, isLoading } = useVaultClaimSignature(VaultRewardToken.EMdbl);
  const { mutateAsync: mutateMerlClaim, isLoading: merlClaimLoading } = useVaultClaimSignature(VaultRewardToken.Merl);
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

  const { writeContract: writeClaimMerlContract, isLoading: claimMerlContractLoading } = useMainWriteContract({
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
      refetchMerlReward();
    },
  });

  const claimAccrued = async () => {
    if (!evmAddress || !accruedBalance) return;
    if (!isMerlinChain) {
      switchMainChain(ALLOW_CHAINS[0]).then();
      return;
    }
    ReactGA.event({ category: 'merlin', action: 'claim_emdbl' });
    const res = await mutateAsync();
    if (res?.code === 200) {
      const data = res.data;
      await writeContract({
        abi: EMDBLABI,
        functionName: 'permitMint',
        args: [evmAddress, BigInt(data?.balance || '0'), data?.deadline, data?.v, data?.r, data?.s],
        address: CONTRACT_ADDRESSES.emdbl,
      });
    } else {
      toast.error('Error request.');
    }
  };

  const onClaimMerl = useCallback(async () => {
    if (!evmAddress || !merlBalance) return;

    if (!isMerlinChain) {
      switchMainChain(ALLOW_CHAINS[0]).then();
      return;
    }

    ReactGA.event({ category: 'merlin', action: 'claim_merl' });

    const res = await mutateMerlClaim();

    if (res?.code === 200) {
      const data = res.data;

      await writeClaimMerlContract({
        abi: TokenRewardDistribution,
        functionName: 'permitTransfer',
        args: [CONTRACT_ADDRESSES.merl, evmAddress, data?.balance, data?.deadline, data?.v, data?.r, data?.s],
        address: CONTRACT_ADDRESSES.tokenRewardDistribution,
      });
    } else {
      toast.error('Error request.');
    }
  }, [mutateMerlClaim, merlClaimLoading, merlBalance]);
  // const { data } = useFetchBuffData();

  // const groupConfig = useMemo(() => {
  //   if (data && data.dragonPalConfigList) {
  //     const groupByCategory = groupBy(data.dragonPalConfigList, 'category_id');
  //     return groupByCategory;
  //   } else {
  //     return {};
  //   }
  // }, [data]);

  // const claimAsset = async (id: GameAssetIds) => {
  //   try {
  //     if (id === 10002) {
  //       setEggClaimLoading(true);
  //     } else if (id === 10001) {
  //       setCaptureClaimLoading(true);
  //     }
  //     const res = await claimGameAsset({ id });
  //     if (res.code === 200) {
  //       refetchGameAsset();
  //       toast.success('Claim Successfully.');
  //     } else {
  //       toast.error('Claim Failed.');
  //     }
  //   } catch (error) {
  //   } finally {
  //     if (id === 10002) {
  //       setEggClaimLoading(false);
  //     } else if (id === 10001) {
  //       setCaptureClaimLoading(false);
  //     }
  //   }
  // };
  return (
    <div className="mt-[2.88vw] xl:mt-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Reward</p>
          <ClientOnly>
            <RewardCountdown />
          </ClientOnly>
        </div>
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
      <div className="mt-[0.96vw] grid h-[14.24vw] grid-cols-2 gap-[1.92vw] xl:mt-3 xl:h-[178px] xl:gap-6">
        <Reward
          token={VaultRewardToken.EMdbl}
          balance={accruedBalance}
          total={totalAccruedBalance}
          onClaim={claimAccrued}
          loading={isLoading || writeLoading}
        />
        <Reward
          token={VaultRewardToken.Merl}
          balance={merlBalance}
          total={totalMerlBalance}
          onClaim={onClaimMerl}
          loading={merlClaimLoading || claimMerlContractLoading}
        />
        {/* <Reward token={VaultRewardToken.Merl}  /> */}
      </div>
      {/*<p className="mt-[2.88vw] text-[1.28vw]/[1.76vw] font-semibold xl:mt-9 xl:text-base/5.5">My Inventory</p>*/}
      {/*<div className="mt-[0.96vw] grid grid-cols-3 gap-[1.6vw] xl:mt-3 xl:gap-5">*/}
      {/*  <div className="button-yellow-dark relative h-[14.4vw] bg-gradient-buff-card py-[1.6vw] xl:h-[180px] xl:py-5">*/}
      {/*    <PatternWithoutLine className="stroke-yellow" />*/}
      {/*    <div className="text-center text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:text-sm/6">Stamina</div>*/}
      {/*    <div className="flex-center mt-[1.92vw] xl:mt-6">*/}
      {/*      <img src="/img/game-power.webp" alt="game power" className="w-[1.6vw] xl:w-5" />*/}
      {/*      <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">*/}
      {/*        {obtain?.stamina || 0}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    {(obtain?.basicStamina || 0) === 0 ? (*/}
      {/*      <div className="mt-[2.88vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-9 xl:text-xs/5">*/}
      {/*        You are not in the whitelist of this season.*/}
      {/*      </div>*/}
      {/*    ) : nextLevel ? (*/}
      {/*      <div className="mt-[2.88vw] flex justify-center text-center text-[0.96vw]/[1.6vw] font-medium xl:mt-9 xl:text-xs/5">*/}
      {/*        Next Level: {formatNumber(BigInt(nextLevel?.eMDBL || 0), false)} active eMDBL {'->'}*/}
      {/*        <img src="/img/game-power.webp" alt="game power" className="mx-[0.32vw] w-[1.6vw] xl:mx-1 xl:w-5" />*/}
      {/*        <span className="font-semibold text-yellow">*/}
      {/*          +{nextLevel ? Number(nextLevel?.stamina || 0) - (obtain?.basicStamina || 0) - (obtain?.boostStamina || 0) : 0}*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    ) : null}*/}
      {/*  </div>*/}
      {/*  <div className="button-yellow-dark relative h-[14.4vw] bg-gradient-buff-card py-[1.6vw] xl:h-[180px] xl:py-5">*/}
      {/*    <PatternWithoutLine className="stroke-yellow" />*/}
      {/*    <div className="text-center text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:text-sm/6">Blue Snitch</div>*/}
      {/*    <div className="mt-[0.96vw] flex items-center justify-center xl:mt-3">*/}
      {/*      <img src="/img/capture-ball.png" alt="capture ball" className="h-[2.24vw] xl:h-7" />*/}
      {/*      <div className="ml-[0.32vw] mt-[0.32vw] text-[1.92vw]/[1.92vw] font-semibold text-yellow xl:ml-1 xl:mt-1 xl:text-2xl/6">*/}
      {/*        {gameAsset?.DragonCaptureBall.unclaim || 0}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium xl:mt-1 xl:text-xs/5">*/}
      {/*      Total: {gameAsset?.DragonCaptureBall.total || 0}*/}
      {/*    </div>*/}
      {/*    <div className="flex-center">*/}
      {/*      <Button*/}
      {/*        className="mt-[1.12vw] h-[2.88vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-3.5 xl:h-9 xl:w-[160px] xl:rounded-sm xl:text-sm/4"*/}
      {/*        type="yellow-shallow"*/}
      {/*        loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"*/}
      {/*        disabled={(gameAsset?.DragonCaptureBall.unclaim || 0) === 0}*/}
      {/*        onClick={() => {*/}
      {/*          ReactGA.event({ category: 'merlin', action: 'blue_snitch_claim' });*/}
      {/*          claimAsset('CaptureBall');*/}
      {/*        }}*/}
      {/*        loading={captureClaimLoading}*/}
      {/*      >*/}
      {/*        Claim*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="button-yellow-dark relative h-[14.4vw] bg-gradient-buff-card py-[1.6vw] xl:h-[180px] xl:py-5">*/}
      {/*    <PatternWithoutLine className="stroke-yellow" />*/}
      {/*    <div className="text-center text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:text-sm/6">Dargonpal</div>*/}
      {/*    <div className="flex-center mt-[2.72vw] gap-[1.92vw] xl:mt-8.5 xl:gap-6">*/}
      {/*      <Tooltip*/}
      {/*        title={*/}
      {/*          <div className="w-[33.92vw] xl:w-[424px]">*/}
      {/*            <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Light DragonPal Buff</div>*/}
      {/*            <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">*/}
      {/*              {(groupConfig['1'] || []).map((item) => {*/}
      {/*                const eleBuff = data?.dreamPetBuff.light.list || [];*/}
      {/*                const groupByAttr = groupBy(eleBuff, 'attributeType');*/}
      {/*                return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className="flex cursor-pointer flex-col items-center">*/}
      {/*          <img src="/svg/light-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />*/}
      {/*          <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">*/}
      {/*            {data?.dreamPetBuff?.light?.list?.length || 0}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Tooltip>*/}
      {/*      <Tooltip*/}
      {/*        title={*/}
      {/*          <div className="w-[33.92vw] xl:w-[424px]">*/}
      {/*            <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Dark DragonPal Buff</div>*/}
      {/*            <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">*/}
      {/*              {(groupConfig['2'] || []).map((item) => {*/}
      {/*                const eleBuff = data?.infinityBuff.dark.list || [];*/}
      {/*                const groupByAttr = groupBy(eleBuff, 'attributeType');*/}
      {/*                return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="infinityRambleBuff" />;*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className="flex cursor-pointer flex-col items-center">*/}
      {/*          <img src="/svg/dark-buff.svg" alt="dark" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />*/}
      {/*          <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">*/}
      {/*            {data?.infinityBuff?.dark?.list?.length || 0}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Tooltip>*/}
      {/*      <Tooltip*/}
      {/*        title={*/}
      {/*          <div className="w-[33.92vw] xl:w-[424px]">*/}
      {/*            <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Fire DragonPal Buff</div>*/}
      {/*            <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">*/}
      {/*              {(groupConfig['4'] || []).map((item) => {*/}
      {/*                const eleBuff = data?.dreamPetBuff.fire.list || [];*/}
      {/*                const groupByAttr = groupBy(eleBuff, 'attributeType');*/}
      {/*                return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className="flex cursor-pointer flex-col items-center">*/}
      {/*          <img src="/svg/fire-buff.svg" alt="dark" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />*/}
      {/*          <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">*/}
      {/*            {data?.dreamPetBuff?.fire?.list?.length || 0}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Tooltip>*/}
      {/*      <Tooltip*/}
      {/*        title={*/}
      {/*          <div className="w-[33.92vw] xl:w-[424px]">*/}
      {/*            <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Water DragonPal Buff</div>*/}
      {/*            <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">*/}
      {/*              {(groupConfig['3'] || []).map((item) => {*/}
      {/*                const eleBuff = data?.dreamPetBuff.water.list || [];*/}
      {/*                const groupByAttr = groupBy(eleBuff, 'attributeType');*/}
      {/*                return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className="flex cursor-pointer flex-col items-center">*/}
      {/*          <img src="/svg/water-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />*/}
      {/*          <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">*/}
      {/*            {data?.dreamPetBuff?.water?.list?.length || 0}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Tooltip>*/}
      {/*      <Tooltip*/}
      {/*        title={*/}
      {/*          <div className="w-[33.92vw] xl:w-[424px]">*/}
      {/*            <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Wood DragonPal Buff</div>*/}
      {/*            <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">*/}
      {/*              {(groupConfig['5'] || []).map((item) => {*/}
      {/*                const eleBuff = data?.dreamPetBuff.wood.list || [];*/}
      {/*                const groupByAttr = groupBy(eleBuff, 'attributeType');*/}
      {/*                return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className="flex cursor-pointer flex-col items-center">*/}
      {/*          <img src="/svg/forest-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />*/}
      {/*          <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">*/}
      {/*            {data?.dreamPetBuff?.wood?.list?.length || 0}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Tooltip>*/}
      {/*      <Tooltip*/}
      {/*        title={*/}
      {/*          <div className="w-[33.92vw] xl:w-[424px]">*/}
      {/*            <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Earth DragonPal Buff</div>*/}
      {/*            <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">*/}
      {/*              {(groupConfig['6'] || []).map((item) => {*/}
      {/*                const eleBuff = data?.dreamPetBuff.ground.list || [];*/}
      {/*                const groupByAttr = groupBy(eleBuff, 'attributeType');*/}
      {/*                return <DragonBuffItem info={item} key={item.id} groupByAttr={groupByAttr} type="dreamPetBuff" />;*/}
      {/*              })}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className="flex cursor-pointer flex-col items-center">*/}
      {/*          <img src="/svg/mountain-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />*/}
      {/*          <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">*/}
      {/*            {data?.dreamPetBuff?.ground?.list?.length || 0}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Tooltip>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/* <div className="mt-[0.96vw] grid grid-cols-2 gap-[1.92vw] xl:mt-3 xl:gap-6">
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
                <img src="/img/capture-ball.png" alt="capture ball" className="h-[2.24vw] xl:h-7" />
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
          <div className="relative h-[14.24vw] border border-gray-600 bg-black/60 backdrop-blur-sm xl:h-[178px]">
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
          </div>
        </div>
      </div> */}
    </div>
  );
}
