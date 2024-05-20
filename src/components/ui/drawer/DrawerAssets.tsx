import ArrowSVG from '@/../public/svg/arrow.svg?component';
import { depositWithdrawDrawerAtom, depositWithdrawType, tradeLogsDrawerAtom, walletAssetsDrawerAtom } from '@/atoms/assets';
import Button from '@/components/ui/button';
import DrawerDepositWithdraw from '@/components/ui/drawer/DrawerDepositWithdraw';
import Drawer from '@/components/ui/drawer/index';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { formatNumber } from '@/utils';
import { useAtom, useSetAtom } from 'jotai';
import DrawerTradeLogs from './DrawerTradeLogs';

export default function DrawerAssets() {
  const [isOpen, setIsOpen] = useAtom(walletAssetsDrawerAtom);
  const setDWOpen = useSetAtom(depositWithdrawDrawerAtom);
  const setDWType = useSetAtom(depositWithdrawType);
  const setTradeLogsDrawerOpen = useSetAtom(tradeLogsDrawerAtom);

  const { emdblBalance, mdblBalance } = useStakeContractRead();

  const openDWDrawer = (type: 'Deposit' | 'Withdraw') => {
    setDWOpen(true);
    setDWType(type);
  };
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Assets"
      render={() => (
        <div className="w-[30.4vw] xl:w-[380px]">
          <div className="flex items-center justify-between">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">My Token</div>
            <div
              className="flex cursor-pointer select-none items-center text-[1.12vw]/[1.12vw] font-semibold text-blue xl:text-sm/3.5"
              onClick={() => setTradeLogsDrawerOpen(true)}
            >
              Logs
              <ArrowSVG className="w-[0.96vw] rotate-90 cursor-pointer fill-blue xl:w-3" />
            </div>
          </div>
          <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3"></div>
          <div className="mt-[2.4vw] xl:mt-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <img src="/svg/mdbl-merlin.svg" alt="mdbl" className="h-[1.92vw] xl:h-6" />
                <div className="ml-[0.64vw] text-[1.6vw]/[1.6vw] font-medium xl:ml-2 xl:text-base/5">$MDBL(On-chain)</div>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">
                {formatNumber(mdblBalance || 0n, false)}
              </div>
            </div>
          </div>
          <div className="mt-[1.92vw] xl:mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <img src="/svg/mdbl-in-game.svg" alt="mdbl" className="h-[1.92vw] xl:h-6" />
                <div className="ml-[0.64vw] text-[1.6vw]/[1.6vw] font-medium xl:ml-2 xl:text-base/5">$MDBL(In-game)</div>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">
                {formatNumber(mdblBalance || 0n, false)}
              </div>
            </div>
          </div>
          <div className="mt-[1.92vw] xl:mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.92vw] xl:h-6" />
                <div className="ml-[0.8vw] text-[1.6vw]/[1.6vw] font-medium xl:ml-2.5 xl:text-base/5">eMDBL</div>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">
                {formatNumber(emdblBalance || 0n, false)}
              </div>
            </div>
          </div>

          <div className="flex-center mt-[2.4vw] gap-[1.6vw] xl:mt-7.5 xl:gap-5">
            <Button
              type="yellow-dark"
              className="h-[3.52vw] flex-1 font-semibold xl:h-11"
              onClick={() => openDWDrawer('Deposit')}
            >
              Deposit
            </Button>
            <Button
              type="yellow-dark"
              className="h-[3.52vw] flex-1 font-semibold xl:h-11"
              onClick={() => openDWDrawer('Withdraw')}
            >
              Withdraw
            </Button>
          </div>
          <div className="mt-[3.84vw] text-[1.28vw]/[1.92vw] font-semibold xl:mt-12 xl:text-base/6">My Inventory</div>
          <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3"></div>
          <div className="mt-[2.4vw] xl:mt-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <img src="/svg/capture-ball.svg" alt="capture-ball" className="h-[2.24vw] xl:h-7" />
                <div className="ml-[0.64vw] text-[1.6vw]/[1.6vw] font-medium xl:ml-2 xl:text-base/5">Capture Ball</div>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">1</div>
            </div>
          </div>
          <div className="mt-[1.92vw] xl:mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <img src="/img/hatch-egg-min.png" alt="egg" className="h-[2.24vw] xl:h-7" />
                <div className="ml-[0.8vw] text-[1.6vw]/[1.6vw] font-medium xl:ml-2.5 xl:text-base/5">Dragon Egg</div>
              </div>
              <div className="text-[1.6vw]/[1.6vw]  font-semibold text-yellow xl:text-xl/5">123</div>
            </div>
          </div>
          <Button type="yellow-dark" className="mt-[1.6vw] h-[3.52vw] w-full font-semibold xl:mt-5 xl:h-11">
            Hatch
          </Button>
          <DrawerDepositWithdraw />
          <DrawerTradeLogs />
        </div>
      )}
    />
  );
}
