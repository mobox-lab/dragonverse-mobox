import Button from '@/components/ui/button';
import { depositWithdrawDrawerAtom, depositWithdrawType, tradeLogsDrawerAtom, walletAssetsDrawerAtom } from '@/atoms/assets';
import DrawerDepositWithdraw from '@/components/ui/drawer/DrawerDepositWithdraw';
import Drawer from '@/components/ui/drawer/index';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { formatNumber, shortenAddress } from '@/utils';
import { useAtom, useSetAtom } from 'jotai';
import DrawerTradeLogs from './DrawerTradeLogs';
import { useAccount } from 'wagmi';
import HistorySVG from '@/../public/svg/history-2.svg?component';
import DepositSVG from '@/../public/svg/deposit.svg?component';
import WithdrawSVG from '@/../public/svg/withdraw.svg?component';
import StakeSVG from '@/../public/svg/stake-2.svg?component';
import { useRouter } from 'next/navigation';

export default function DrawerAssets() {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useAtom(walletAssetsDrawerAtom);
  const setDWOpen = useSetAtom(depositWithdrawDrawerAtom);
  const setDWType = useSetAtom(depositWithdrawType);
  const setTradeLogsDrawerOpen = useSetAtom(tradeLogsDrawerAtom);
  const router = useRouter();

  const { emdblBalance, mdblBalance } = useStakeContractRead();

  const openDWDrawer = (type: 'Deposit' | 'Withdraw') => {
    setDWOpen(true);
    setDWType(type);
  };

  const onStakeClick = () => {
    setIsOpen(false);
    router.push('/vault');
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title={
        <div className="flex items-center gap-3">
          <div className="size-15 rounded-full bg-gray" />
          <div>
            <p className="text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6">Name</p>
            <p className="mt-1 text-[1.12vw]/[1.6vw] font-normal xl:text-sm">{shortenAddress(address)}</p>
          </div>
        </div>
      }
      render={() => (
        <div className="w-[30.4vw] xl:w-[380px]">
          <div className="flex items-center justify-between">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">My Token</div>
            <div
              className="flex cursor-pointer select-none items-center gap-1 text-[1.12vw]/[1.12vw] font-semibold text-blue xl:text-sm/3.5"
              onClick={() => setTradeLogsDrawerOpen(true)}
            >
              History
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
                {formatNumber(mdblBalance || 0n, false)}
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
          <div className="mt-[3.84vw] text-[1.28vw]/[1.92vw] font-semibold xl:mt-12 xl:text-base/6">My Inventory</div>
          <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3"></div>
          <div className="mt-[2.4vw] xl:mt-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/svg/capture-ball.svg" alt="capture-ball" className="h-[3.2vw] xl:size-10" />
                <div>
                  <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">Blue Snitch</p>
                  <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">Dragonverse</p>
                </div>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">1</div>
            </div>
          </div>
          <div className="mt-[1.92vw] xl:mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/img/hatch-egg-min.png" alt="egg" className="h-[3.2vw] xl:size-10" />
                <div>
                  <p className="text-[1.28vw]/[1.6vw] font-medium xl:text-base/5">Dragon Egg</p>
                  <p className="text-[0.96vw]/[1.6vw] text-gray-300 xl:text-xs/5">MODragon</p>
                </div>
                <Button
                  type="yellow-shallow-2"
                  className="h-[2.56vw] w-[8vw] text-[1.12vw]/[1.12vw] font-medium text-yellow xl:h-8 xl:w-25 xl:text-sm/3.5"
                >
                  Hatch
                </Button>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">123</div>
            </div>
          </div>
          <DrawerDepositWithdraw />
          <DrawerTradeLogs />
        </div>
      )}
    />
  );
}
