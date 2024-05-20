import ClipSvg from '@/../public/svg/clip.svg?component';
import SwitchSVG from '@/../public/svg/switch-02.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';
import { confirmWithdrawDialogAtom, depositWithdrawDrawerAtom, depositWithdrawType, tradeLogsDrawerAtom } from '@/atoms/assets';
import Drawer from '@/components/ui/drawer/index';
import { inputRegex } from '@/constants';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useMainAccount } from '@/hooks/wallet';
import { formatNumber } from '@/utils';
import clsx from 'clsx';
import { useAtom, useSetAtom } from 'jotai';
import { escapeRegExp } from 'lodash-es';
import { QRCodeSVG } from 'qrcode.react';
import { JSX, PropsWithChildren, useState } from 'react';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { formatEther } from 'viem';
import Button from '../button';
import DrawerTradeLogs from './DrawerTradeLogs';

export default function DrawerDepositWithdraw({ children }: PropsWithChildren<{ children?: JSX.Element }>) {
  const [type, setType] = useAtom(depositWithdrawType);
  const [isOpen, setIsOpen] = useAtom(depositWithdrawDrawerAtom);
  const [mdblValue, setMdblValue] = useState<string>('');
  const [mdblGameValue, setMdblGameValue] = useState<string>('');
  const { mdblBalance } = useStakeContractRead();
  const setWithdrawOpen = useSetAtom(confirmWithdrawDialogAtom);
  const setTradeLogsDrawerOpen = useSetAtom(tradeLogsDrawerAtom);

  const { evmAddress } = useMainAccount();
  const [, copyToClipboard] = useCopyToClipboard();

  const mdblValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setMdblValue(val.replace(/,/g, '.'));
    }
  };

  const mdblGameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setMdblGameValue(val.replace(/,/g, '.'));
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title={type}
      render={() => {
        return (
          <div className="w-[30.4vw] xl:w-[380px]">
            <div className="h-[3.2vw] border-b border-[#4D432E] xl:h-10">
              <div className="flex h-full">
                <div
                  className={clsx(
                    'flex-center h-full flex-1 cursor-pointer bg-white/10 text-center text-[1.28vw]/[1.28vw] font-medium xl:text-base/4',
                    {
                      '!bg-[#4D442E] text-yellow': type === 'Deposit',
                    },
                  )}
                  onClick={() => setType('Deposit')}
                >
                  Deposit
                </div>
                <div
                  className={clsx(
                    'flex-center h-full flex-1 cursor-pointer bg-white/10 text-center text-[1.28vw]/[1.28vw] font-medium xl:text-base/4',
                    {
                      '!bg-[#4D442E] text-yellow': type === 'Withdraw',
                    },
                  )}
                  onClick={() => setType('Withdraw')}
                >
                  Withdraw
                </div>
              </div>
            </div>
            <div className="absolute bottom-[2.4vw] left-1/2 -translate-x-1/2 transform xl:bottom-7.5">
              <div
                onClick={() => setTradeLogsDrawerOpen(true)}
                className="cursor-pointer select-none text-center text-[1.12vw]/[1.6vw] font-semibold text-blue xl:text-sm/6"
              >
                Logs
                <DrawerTradeLogs />
              </div>
              <div className="mt-[0.64vw] text-[0.96vw]/[1.6vw] font-medium xl:mt-2 xl:text-xs/6">
                Support <span className="cursor-pointer font-semibold text-blue">FAQ</span>
              </div>
            </div>
            {type === 'Deposit' ? (
              <div className="mt-[2.56vw] xl:mt-8">
                <div className="flex h-[8vw] items-center justify-between bg-white/10 px-[1.28vw] xl:h-25 xl:px-4">
                  <div className="flex items-center">
                    <img src="/svg/mdbl-merlin.svg" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                    <div className="ml-[0.64vw] xl:ml-2">
                      <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                      <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Merlin Chain</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Input Amount</div>
                    <input
                      className={
                        'my-[0.64vw] w-[15.2vw] bg-transparent text-right text-[1.6vw]/[1.6vw] font-semibold text-yellow xl:my-2 xl:w-[190px] xl:text-xl/5'
                      }
                      value={mdblValue}
                      placeholder="Enter amount"
                      autoComplete="off"
                      autoCorrect="off"
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      minLength={1}
                      maxLength={10}
                      type="text"
                      inputMode="decimal"
                      spellCheck="false"
                      onChange={mdblValueChange}
                    />
                    <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                      <div>Balance: {formatNumber(mdblBalance || 0n, false)}</div>
                      <div
                        className="ml-[0.64vw] cursor-pointer text-blue xl:ml-2"
                        onClick={() => {
                          setMdblValue(formatEther(mdblBalance || 0n));
                        }}
                      >
                        MAX
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-center my-[1.6vw] xl:my-5">
                  <div className="flex-center h-[3.84vw] w-[3.84vw] cursor-pointer rounded-full bg-white/10 xl:h-12 xl:w-12">
                    <SwitchSVG
                      className="h-[1.76vw] xl:h-5.5"
                      onClick={() => {
                        setType('Withdraw');
                      }}
                    />
                  </div>
                </div>
                <div className="flex h-[8vw] items-center justify-between bg-white/10 px-[1.28vw] xl:h-25 xl:px-4">
                  <div className="flex items-center">
                    <img src="/svg/mdbl-in-game.svg" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                    <div className="ml-[0.64vw] xl:ml-2">
                      <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                      <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Dragonverse Neo</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Receive</div>
                    <div className="my-[0.96vw] min-h-[1.6vw] bg-transparent text-right text-[1.6vw]/[1.6vw] font-semibold text-gray-300 xl:my-3 xl:min-h-5 xl:text-xl/5">
                      {mdblValue ? mdblValue : '0'}
                    </div>
                    <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                      <div>Balance: {formatNumber(mdblBalance || 0n, false)}</div>
                    </div>
                  </div>
                </div>

                <Button type="yellow-dark" className="mt-[1.92vw] h-[3.52vw] w-full flex-1 font-semibold xl:mt-6 xl:h-11">
                  Deposit
                </Button>
                <div className="mt-[3.84vw] text-[1.28vw]/[1.92vw] font-semibold xl:mt-12 xl:text-base/6">Your Game Wallet</div>
                <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3"></div>
                <div className="flex-center mt-[2.56vw] xl:mt-8">
                  <div className="flex-center h-[11.84vw] w-[11.84vw] rounded-[0.64vw] bg-white xl:h-[148px] xl:w-[148px] xl:rounded-lg">
                    {/* Todo evmAddress 换成 充值地址 */}
                    <QRCodeSVG value={evmAddress ?? ''} className="h-[10.56vw] w-[10.56vw] xl:h-[132px] xl:w-[132px]" />
                  </div>
                </div>
                <div className="mt-[1.6vw] flex items-center justify-center gap-[0.64vw] xl:mt-5 xl:gap-2">
                  <div className="text-[0.96vw]/[1.92vw] text-gray-300 xl:text-xs/6">{evmAddress ?? ''}</div>
                  <ClipSvg
                    className="w-[0.96vw] cursor-pointer stroke-gray-300 xl:w-3"
                    onClick={() => {
                      copyToClipboard(evmAddress ?? '');
                      toast.success('Address copied.');
                    }}
                  />
                </div>

                <div className="mt-[1.28vw] flex h-[2.88vw] w-full items-center bg-legendary/30 px-[1.12vw] text-[0.96vw]/[1.6vw] font-medium text-legendary backdrop-blur-2xl xl:mt-4 xl:h-9 xl:px-3.5 xl:text-xs/5">
                  <WarningSvg className="mr-[0.48vw] w-[1.6vw] xl:mr-1.5 xl:w-5" />
                  Note: Your Game Wallet address only accepts $MDBL.
                </div>
              </div>
            ) : (
              <div className="mt-[2.56vw] xl:mt-8">
                <div className="flex h-[8vw] items-center justify-between bg-white/10 px-[1.28vw] xl:h-25 xl:px-4">
                  <div className="flex items-center">
                    <img src="/svg/mdbl-in-game.svg" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                    <div className="ml-[0.64vw] xl:ml-2">
                      <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                      <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Dragonverse Neo</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Input Amount (100-20000)</div>
                    <input
                      className={
                        'my-[0.64vw] w-[15.2vw] bg-transparent text-right text-[1.6vw]/[1.6vw] font-semibold text-yellow xl:my-2 xl:w-[190px] xl:text-xl/5'
                      }
                      value={mdblGameValue}
                      placeholder="Enter amount"
                      autoComplete="off"
                      autoCorrect="off"
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      minLength={1}
                      maxLength={10}
                      type="text"
                      inputMode="decimal"
                      spellCheck="false"
                      onChange={mdblGameValueChange}
                    />
                    <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                      <div>Balance: {formatNumber(mdblBalance || 0n, false)}</div>
                      <div
                        className="ml-[0.64vw] cursor-pointer text-blue xl:ml-2"
                        onClick={() => {
                          setMdblValue(formatEther(mdblBalance || 0n));
                        }}
                      >
                        MAX
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-center my-[1.6vw] xl:my-5">
                  <div className="flex-center h-[3.84vw] w-[3.84vw] cursor-pointer rounded-full bg-white/10 xl:h-12 xl:w-12">
                    <SwitchSVG
                      className="h-[1.76vw] xl:h-5.5"
                      onClick={() => {
                        setType('Deposit');
                      }}
                    />
                  </div>
                </div>
                <div className="flex h-[8vw] items-center justify-between bg-white/10 px-[1.28vw] xl:h-25 xl:px-4">
                  <div className="flex items-center">
                    <img src="/svg/mdbl-merlin.svg" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                    <div className="ml-[0.64vw] xl:ml-2">
                      <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                      <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Merlin Chain</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Receive</div>
                    <div className="my-[0.96vw] min-h-[1.6vw] bg-transparent text-right text-[1.6vw]/[1.6vw] font-semibold text-gray-300 xl:my-3 xl:min-h-5 xl:text-xl/5">
                      {mdblGameValue ? mdblGameValue : '0'}
                    </div>
                    <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                      <div>Balance: {formatNumber(mdblBalance || 0n, false)}</div>
                    </div>
                  </div>
                </div>

                <Button
                  type="yellow-dark"
                  className="mt-[1.92vw] h-[3.52vw] w-full font-semibold xl:mt-6 xl:h-11"
                  onClick={() => setWithdrawOpen(true)}
                >
                  Withdraw
                </Button>
              </div>
            )}
          </div>
        );
      }}
    >
      {children}
    </Drawer>
  );
}
