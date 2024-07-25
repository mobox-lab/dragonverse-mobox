import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import {
  balancesAtom,
  depositWithdrawDrawerAtom,
  depositWithdrawType,
  gameAssetsLogDrawerAtom,
  shopDialogAtom,
  walletAssetsDrawerAtom,
} from '@/atoms/assets';
import DrawerDepositWithdraw from '@/components/ui/drawer/DrawerDepositWithdraw';
import Drawer from '@/components/ui/drawer/index';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { formatNumber, shortenAddress } from '@/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import DrawerTradeLogs from './DrawerTradeLogs';
import { useAccount } from 'wagmi';
import HistorySVG from '@/../public/svg/history-2.svg?component';
import DepositSVG from '@/../public/svg/deposit.svg?component';
import WithdrawSVG from '@/../public/svg/withdraw.svg?component';
import StakeSVG from '@/../public/svg/stake-2.svg?component';
import { userGameInfoAtom } from '@/atoms/user';
import { useQueryBalance } from '@/hooks/user';
import { useClaimGameAsset } from '@/hooks/stake/useClaimGameAsset';
import { useFetchGameAsset } from '@/hooks/stake/useFetchGameAsset';
import { GAME_ASSETS_ID, GameAssetID } from '@/constants/gameAssets';
import GameAssetsLog from './GameAssetsLog';
import ShopDialog from '../dialog/ShopDialog';

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
  }, []);
  const refetchBalance = useQueryBalance();

  const onOpenGameAssetLog = useCallback(() => {
    setGameAssetsLogDrawer(true);
  }, []);

  const onClaimGameAsset = useCallback(async (id: GameAssetID) => {
    if (isClaimPending) {
      return;
    }

    await claimGameAsset({id});
    refetchGameAsset();
  }, [isClaimPending]);

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
      className='xl:p-[30px]'
      title={
        <div className="flex items-center gap-3">
          <div className="size-15 rounded-full bg-gray overflow-hidden">
            <img className='w-full h-full' src={userGameInfo?.gparkUserAvatar} />
          </div>
          <div>
            <p className="text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6 truncate max-w-[10vw]">
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
          <div className="flex items-center justify-between mt-[3.84vw] xl:mt-12">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">My Inventory</div>
            <div
              className="flex cursor-pointer select-none items-center gap-1 text-[1.12vw]/[1.12vw] font-semibold text-blue xl:text-sm/3.5"
              onClick={onOpenGameAssetLog}
            >
              History
              <HistorySVG className="w-[1.28vw] xl:w-4" />
            </div>
          </div>
          <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3 mb-[2.4vw] xl:mb-7.5"></div>
         {
          assets.map(item => ( <div className="mb-[1.92vw] xl:mb-6" key={item.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.icon} alt="capture-ball" className="h-[3.2vw] xl:size-10" />
                <div className='mx-2'>
                  <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">{item.name}</p>
                  <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5 w-[13vw] xl:w-[160px]">{item.describe}</p>
                </div>
                {gameAsset?.assets?.[item.id]?.unclaim ? <Button
                  type="yellow-shallow-2"
                  className="h-[2.56vw] w-[8vw] text-[1.12vw]/[1.12vw] font-medium text-yellow xl:h-8 xl:w-25 xl:text-sm/3.5 relative overflow-visible"
                  onClick={() => onClaimGameAsset(item.id)}
                >
                  Claim
                  <div className="absolute right-0 top-0 flex h-4 min-w-4 translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-[#F13361] px-1.5 text-[12px] text-white">
                    {gameAsset?.assets?.[item.id]?.unclaim}
                  </div>
                </Button> : null}
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">{gameAsset?.assets?.[item.id]?.unuse?.toLocaleString() ?? 0}</div>
            </div>
          </div>))
         }
          <Button type='yellow-dark' className='w-full mt-10 flex items-center justify-center' onClick={onOpenShop}>
            <img src='/svg/shop.svg' className="w-[2vw] xl:w-[1.5vw] mr-1" />
            <span>Dragonverse Market</span>
          </Button>
          <DrawerDepositWithdraw />
          <DrawerTradeLogs isOpen={isOpenTradeLogs} onOpenChange={setOpenTradeLogs} />
          <GameAssetsLog />
          <ShopDialog />
        </div>
      )}
    />
  );
}
