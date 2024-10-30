import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import {
  balancesAtom,
  depositWithdrawDrawerAtom,
  depositWithdrawType,
  gameAssetsLogDrawerAtom,
  gameReferralHistoryDrawerAtom,
  shopDialogAtom,
  walletAssetsDrawerAtom,
} from '@/atoms/assets';
import DrawerDepositWithdraw from '@/components/ui/drawer/DrawerDepositWithdraw';
import Drawer from '@/components/ui/drawer/index';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { formatNumber, shortenAddress, shortenDigits } from '@/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import DrawerTradeLogs from './DrawerTradeLogs';
import { useAccount } from 'wagmi';
import HistorySVG from '@/../public/svg/history-2.svg?component';
import DepositSVG from '@/../public/svg/deposit.svg?component';
import WithdrawSVG from '@/../public/svg/withdraw.svg?component';
import StakeSVG from '@/../public/svg/stake-2.svg?component';
import { userGameInfoAtom } from '@/atoms/user';
import { useMutateWithdraw, useQueryBalance } from '@/hooks/user';
import { useClaimGameAsset } from '@/hooks/stake/useClaimGameAsset';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import { GAME_ASSETS_ID, GameAssetID } from '@/constants/gameAssets';
import GameAssetsLog from './GameAssetsLog';
import ShopDialog from '../dialog/ShopDialog';
import CopySVG from '@/../public/svg/copy.svg?component';
import GameReferralHistory from './GameReferralHistory';
import { useFetchDrawerInvitationInfo, useMutationClaimReferralReward } from '@/hooks/invite';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import { formatEther } from 'viem';

const assets = [
  {
    id: GAME_ASSETS_ID.CaptureBall,
    icon: '/svg/capture-ball.svg',
    name: 'Blue Snitch',
    describe: 'Capture DragonPal',
  },
  {
    id: GAME_ASSETS_ID.StaminaPotion,
    icon: '/svg/senzu-bean.svg',
    name: 'Senzu Potion',
    describe: 'Instant Stamina Recovery',
  },
];

export default function DrawerAssets() {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useAtom(walletAssetsDrawerAtom);
  const setDWOpen = useSetAtom(depositWithdrawDrawerAtom);
  const setDWType = useSetAtom(depositWithdrawType);
  const setGameAssetsLogDrawer = useSetAtom(gameAssetsLogDrawerAtom);
  const userGameInfo = useAtomValue(userGameInfoAtom);
  const setShowShopDialog = useSetAtom(shopDialogAtom);
  const [isOpenTradeLogs, setOpenTradeLogs] = useState(false);
  const router = useRouter();
  const { mutateAsync: claimGameAsset, isPending: isClaimPending } = useClaimGameAsset();
  const { data: gameAsset, refetch: refetchGameAsset } = useFetchGameAsset();
  const { emdblBalance, mdblBalance } = useStakeContractRead();
  const balances = useAtomValue(balancesAtom);

  const onOpenShop = useCallback(() => {
    setShowShopDialog(true);
  }, [setShowShopDialog]);
  const refetchBalance = useQueryBalance();

  const onOpenGameAssetLog = useCallback(() => {
    setGameAssetsLogDrawer(true);
  }, [setGameAssetsLogDrawer]);

  const onClaimGameAsset = useCallback(
    async (id: GameAssetID) => {
      if (isClaimPending) {
        return;
      }

      await claimGameAsset({ id });
      refetchGameAsset();
    },
    [isClaimPending],
  );

  const openDWDrawer = (type: 'Deposit' | 'Withdraw') => {
    setDWOpen(true);
    setDWType(type);
  };

  const onStakeClick = () => {
    setIsOpen(false);
    router.push('/vault');
  };

  useEffect(() => {
    if (isOpen) {
      refetchBalance();
    }
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      className="xl:p-[30px]"
      title={
        <div className="flex items-center gap-3">
          <div className="size-15 overflow-hidden rounded-full bg-gray">
            <img className="h-full w-full" src={userGameInfo?.gparkUserAvatar} alt="gparkUserAvatar" />
          </div>
          <div>
            <p className="max-w-[10vw] truncate text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6">
              {userGameInfo?.gparkUserName || shortenAddress(address)}
            </p>
            {userGameInfo?.gparkUserName ? (
              <p className="mt-1 text-[1.12vw]/[1.6vw] font-normal xl:text-sm">{shortenAddress(address)}</p>
            ) : null}
          </div>
        </div>
      }
      render={() => (
        <div className="w-[30.4vw] xl:w-[380px]">
          <div className="flex items-center justify-between">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">My Token</div>
            <div
              className="flex cursor-pointer select-none items-center gap-1 text-[1.12vw]/[1.12vw] font-semibold text-blue xl:text-sm/3.5"
              onClick={() => setOpenTradeLogs(true)}
            >
              Transaction History
              <HistorySVG className="w-[1.28vw] xl:w-4" />
            </div>
          </div>
          <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3"></div>
          <div className="mt-[2.4vw] xl:mt-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/img/mdbl.webp" alt="mdbl" className="size-[3.2vw] xl:size-10" />
                <div>
                  <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">$MDBL</p>
                  <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">Merlin Chain</p>
                </div>
              </div>
              <div className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                {formatNumber(mdblBalance || 0n, false)}
              </div>
            </div>
          </div>
          <div className="mt-[1.92vw] xl:mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/svg/mdbl-in-game.svg" alt="mdbl" className="size-[3.2vw] xl:size-10" />
                <div>
                  <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">$MDBL</p>
                  <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">Dragonverse</p>
                </div>
              </div>
              <div className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                {formatNumber(BigInt(balances.mdbl ?? '0'), false)}
              </div>
            </div>
          </div>
          <div className="mt-[1.92vw] xl:mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/svg/emdbl.svg" alt="emdbl" className="size-[3.2vw] xl:size-10" />
                <div>
                  <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">eMDBL</p>
                  <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">Vault</p>
                </div>
              </div>
              <div className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                {formatNumber(emdblBalance || 0n, false)}
              </div>
            </div>
          </div>

          <div className="mt-[2.4vw] grid grid-cols-3 gap-[0.96vw] xl:mt-7.5 xl:gap-3">
            <Button
              type="yellow-shallow-2"
              className="flex-center h-[3.2vw] gap-1 text-[1.12vw]/[1.12vw] font-semibold text-yellow xl:h-10 xl:text-sm/3.5"
              onClick={() => openDWDrawer('Deposit')}
            >
              <DepositSVG className="size-[1.28vw] xl:size-4" />
              Deposit
            </Button>
            <Button
              type="yellow-shallow-2"
              className="flex-center h-[3.2vw] gap-1 text-[1.12vw]/[1.12vw] font-semibold text-yellow xl:h-10 xl:text-sm/3.5"
              onClick={() => openDWDrawer('Withdraw')}
            >
              <WithdrawSVG className="size-[1.28vw] xl:size-4" />
              Withdraw
            </Button>
            <Button
              type="yellow-shallow-2"
              className="flex-center h-[3.2vw] gap-1 text-[1.12vw]/[1.12vw] font-semibold text-yellow xl:h-10 xl:text-sm/3.5"
              onClick={onStakeClick}
            >
              <StakeSVG className="size-[1.28vw] xl:size-4" />
              Stake
            </Button>
          </div>
          {/* <div className="mt-[3.84vw] text-[1.28vw]/[1.92vw] font-semibold xl:mt-12 xl:text-base/6">My Inventory</div> */}
          <div className="mt-[3.84vw] flex items-center justify-between xl:mt-12">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">My Inventory</div>
            <div
              className="flex cursor-pointer select-none items-center gap-1 text-[1.12vw]/[1.12vw] font-semibold text-blue xl:text-sm/3.5"
              onClick={onOpenGameAssetLog}
            >
              History
              <HistorySVG className="w-[1.28vw] xl:w-4" />
            </div>
          </div>
          <div className="mb-[2.4vw] mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mb-7.5 xl:mt-3"></div>
          {assets.map((item) => (
            <div className="mb-[1.92vw] xl:mb-6" key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.icon} alt="capture-ball" className="h-[3.2vw] xl:size-10" />
                  <div className="mx-2">
                    <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">{item.name}</p>
                    <p className="w-[13vw] text-[0.96vw]/[1.6vw] text-gray-300 xl:w-[160px] xl:text-xs/5">{item.describe}</p>
                  </div>
                  {gameAsset?.assets?.[item.id]?.unclaim ? (
                    <Button
                      type="yellow-shallow-2"
                      className="relative h-[2.56vw] w-[8vw] overflow-visible text-[1.12vw]/[1.12vw] font-medium text-yellow xl:h-8 xl:w-25 xl:text-sm/3.5"
                      onClick={() => onClaimGameAsset(item.id)}
                    >
                      Claim
                      <div className="absolute right-0 top-0 flex h-4 min-w-4 translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-[#F13361] px-1.5 text-[12px] text-white">
                        {gameAsset?.assets?.[item.id]?.unclaim}
                      </div>
                    </Button>
                  ) : null}
                </div>
                <div className="text-[1.6vw]/[1.6vw] font-semibold text-yellow xl:text-xl/5">
                  {gameAsset?.assets?.[item.id]?.unuse?.toLocaleString() ?? 0}
                </div>
              </div>
            </div>
          ))}
          <Button type="yellow-dark" className="mt-10 flex w-full items-center justify-center" onClick={onOpenShop}>
            <img src="/svg/shop.svg" className="mr-1 w-[2vw] xl:w-[1.5vw]" alt="" />
            <span>Dragonverse Market</span>
          </Button>
          <MyReferral />

          <DrawerDepositWithdraw />
          <DrawerTradeLogs isOpen={isOpenTradeLogs} onOpenChange={setOpenTradeLogs} />
          <GameReferralHistory />
          <GameAssetsLog />
          <ShopDialog />
        </div>
      )}
    />
  );
}

function MyReferral() {
  const setGameReferralHistoryDrawer = useSetAtom(gameReferralHistoryDrawerAtom);
  const onOpenReferralHistory = useCallback(() => {
    setGameReferralHistoryDrawer(true);
  }, [setGameReferralHistoryDrawer]);
  const { data: invitationInfo } = useFetchDrawerInvitationInfo();

  const referralLink = useMemo(
    () => (window?.location?.origin ?? '') + '/referral?code=' + invitationInfo?.referralCode,
    [invitationInfo?.referralCode],
  );
  const [_, copy] = useCopyToClipboard();

  const unClaimedReward = useMemo(
    () =>
      Number(formatEther(BigInt(invitationInfo?.reward ?? 0))) -
      Number(formatEther(BigInt(invitationInfo?.claimedReward ?? 0))),
    [invitationInfo?.claimedReward, invitationInfo?.reward],
  );

  const { mutateAsync: claimReferralReward, isPending: isClaimReferralRewardPending } = useMutationClaimReferralReward();

  const onClaimReferralReward = useCallback(async () => {
    try {
      const res = await claimReferralReward();
      if (res?.data) toast.success('Claimed');
      else toast.error('Claim failed');
    } catch (error) {
      toast.error('Claim failed');
    }
  }, [claimReferralReward]);

  return (
    <>
      {/* My Referral */}
      <div className="mt-[3.84vw] flex items-center justify-between xl:mt-12">
        <div className="w-[8.16vw] text-[1.28vw]/[1.92vw] font-semibold xl:w-[6.375rem] xl:text-base/6">My Referral</div>
        <div
          className="flex cursor-pointer select-none items-center gap-[0.32vw] text-[1.12vw]/[1.12vw] font-semibold text-blue xl:gap-1 xl:text-sm/3.5"
          onClick={onOpenReferralHistory}
        >
          History
          <HistorySVG className="w-[1.28vw] xl:w-4" />
        </div>
      </div>
      <div className="mb-[2.4vw] mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mb-7.5 xl:mt-3"></div>
      <div className="mt-[2.4vw] flex flex-col xl:mt-7.5">
        <div className="flex items-center gap-[1.92vw] xl:gap-6">
          <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">Referral Link</p>
          <div className="flex flex-grow items-center justify-between rounded-sm bg-white/10 px-[1.12vw] py-[0.96vw] xl:px-3.5 xl:py-3">
            <p className="w-[15.6vw] truncate text-[1.12vw]/[1.6vw] font-semibold text-yellow xl:w-[12.1875rem] xl:text-sm/5">
              {referralLink}
            </p>
            <CopySVG
              onClick={() => {
                copy(referralLink);
                toast.success('Copied');
              }}
              className="w-[1.28vw] cursor-pointer xl:w-4"
            />
          </div>
        </div>
        <div className="mt-[1.92vw] flex items-center gap-[1.6vw] xl:mt-6 xl:gap-5">
          <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">Commission</p>
          {unClaimedReward ? (
            <Button
              type="yellow-shallow-2"
              className="relative h-[2.56vw] w-[9.6vw] flex-grow overflow-visible text-[1.12vw]/[1.12vw] font-medium text-yellow xl:h-8 xl:w-30 xl:text-sm/3.5"
              onClick={onClaimReferralReward}
              loading={isClaimReferralRewardPending}
            >
              {isClaimReferralRewardPending ? 'Claiming...' : `Claim ${unClaimedReward}`}
            </Button>
          ) : null}
          <div className="flex flex-grow items-center justify-end gap-[0.32vw] xl:gap-1">
            <div className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
              {shortenDigits(Number(formatEther(BigInt(invitationInfo?.reward ?? 0))))}
            </div>
            <img src="/svg/mdbl-in-game.svg" alt="mdbl" className="size-[1.6vw] xl:size-5" />
          </div>
        </div>
        {invitationInfo?.referrer ? (
          <div className="mt-[2.88vw] flex items-center gap-[1.6vw] xl:mt-9 xl:gap-5">
            <p className="w-[8.16vw] text-[1.28vw]/[1.6vw] font-medium xl:w-[6.375rem] xl:text-base/5">My Referrer</p>
            <p className="flex-grow truncate text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
              {shortenAddress(invitationInfo?.referrer)}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
