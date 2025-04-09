import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { formatEther } from 'viem';
import clsx from 'clsx';
import { useAtom, useAtomValue } from 'jotai';
import { escapeRegExp } from 'lodash-es';
import { QRCodeSVG } from 'qrcode.react';
import ClipSvg from '@/../public/svg/clip.svg?component';
import SwitchSVG from '@/../public/svg/switch-02.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';
import {
  balancesAtom,
  confirmWithdrawDialogAtom,
  depositWithdrawDrawerAtom,
  depositWithdrawType,
  rechargeAddressAtom,
} from '@/atoms/assets';
import Drawer from '@/components/ui/drawer/index';
import { ALLOW_CHAINS, inputRegex } from '@/constants';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { formatNumber } from '@/utils';
import Button from '../button';
import { MDBLABI } from '@/abis';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useQueryBalance } from '@/hooks/user';
import DrawerTradeLogs from './DrawerTradeLogs';
import { parseEther } from 'ethers/utils';

const MIN_WITHDRAW = 200;
const FEE = 100;

export default function DrawerDepositWithdraw() {
  const [type, setType] = useAtom(depositWithdrawType);
  const [isOpen, setIsOpen] = useAtom(depositWithdrawDrawerAtom);
  const [mdblValue, setMdblValue] = useState<string>('');
  const [mdblGameValue, setMdblGameValue] = useState<string>('');
  const { mdblBalance } = useStakeContractRead();
  const [_, setWithdrawAmount] = useAtom(confirmWithdrawDialogAtom);
  const [isOpenTradeLogs, setOpenTradeLogs] = useState(false);
  const balances = useAtomValue(balancesAtom);
  const { isMerlinChain } = useSelectedChain();
  const { switchMainChain } = useMainChain();
  const refetchBalance = useQueryBalance();
  const { writeContract, isLoading } = useMainWriteContract({
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
    onSuccess: () => {
      toast.success('Deposit succeeded');

      setIsOpen(false);

      let index = 0;

      (function loop() {
        setTimeout(() => {
          if (index < 6) {
            index++;
            refetchBalance();
            loop();
          }
        }, 5000);
      })();
    },
  });
  const depositButtonStatus = useMemo(() => {
    return !(mdblValue && mdblBalance && +mdblValue <= +formatEther(mdblBalance || 0n));
  }, [mdblValue, mdblBalance]);

  const rechargeAddress = useAtomValue(rechargeAddressAtom);
  const address = rechargeAddress?.merlin;
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

  const onDeposit = useCallback(async () => {
    if (!isMerlinChain) {
      switchMainChain(ALLOW_CHAINS[0]);
      return;
    }

    await writeContract({
      abi: MDBLABI,
      functionName: 'transfer',
      args: [address, parseEther(mdblValue)],
      address: CONTRACT_ADDRESSES.mdbl,
    });
  }, [writeContract, switchMainChain, mdblValue, isMerlinChain]);

  const isCanWithdraw = useMemo(() => +mdblGameValue >= MIN_WITHDRAW, [mdblGameValue]);

  const setMaxMdblGameValue = useCallback(() => {
    const value = Math.floor(+formatEther(BigInt(balances.mdbl)));
    setMdblGameValue(value.toString());
  }, [balances]);

  const onWithdraw = useCallback(() => {
    if (isCanWithdraw) {
      setWithdrawAmount(+mdblGameValue);
    }
  }, [isCanWithdraw, mdblGameValue, setWithdrawAmount]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title={type}
      render={() => {
        return (
          <div className="scrollbar-hide flex w-[30.4vw] flex-1 flex-col items-center justify-between gap-[1.6vw] overflow-auto xl:w-[380px] xl:gap-5">
            <div className="w-full flex-1">
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
              {type === 'Deposit' ? (
                <div className="mt-[2.56vw] xl:mt-8">
                  <div className="flex h-[8vw] items-center justify-between bg-white/10 px-[1.28vw] xl:h-25 xl:px-4">
                    <div className="flex items-center">
                      <img src="/img/mdbl-merlin.png" alt="mdbl" className="h-[3.2vw] xl:h-10" />
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
                        maxLength={20}
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
                            setMdblValue(parseInt(formatEther(mdblBalance || 0n)).toString());
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
                      <img src="/img/mdbl-in-game.png" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                      <div className="ml-[0.64vw] xl:ml-2">
                        <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                        <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Dragonverse Neo</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Receive</div>
                      <div className="my-[0.96vw] min-h-[1.6vw] bg-transparent text-right text-[1.6vw]/[1.6vw] font-semibold text-gray-300 xl:my-3 xl:min-h-5 xl:text-xl/5">
                        {mdblValue}
                      </div>
                      <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                        <div>Balance: {formatNumber(BigInt(balances.mdbl ?? '0'), false)}</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="yellow-dark"
                    className="mt-[1.92vw] h-[3.52vw] w-full flex-1 font-semibold xl:mt-6 xl:h-11"
                    disabled={depositButtonStatus}
                    onClick={onDeposit}
                    loading={isLoading}
                  >
                    Deposit
                  </Button>
                  <p className="mt-[0.96vw] text-center text-[0.96vw]/[0.96vw] text-yellow xl:mt-3 xl:text-xs/3">OR</p>
                  <div className="mt-[1.92vw] text-center text-[1.28vw]/[1.92vw] font-semibold xl:mt-6 xl:text-base/6">
                    Deposit via Transfer
                  </div>
                  <div className="mt-[0.96vw] h-[1px] w-full bg-white/25 xl:mt-3"></div>
                  <div className="flex-center mt-[2.56vw] xl:mt-8">
                    <div className="flex-center h-[11.84vw] w-[11.84vw] rounded-[0.64vw] bg-white xl:h-[148px] xl:w-[148px] xl:rounded-lg">
                      <QRCodeSVG value={address ?? ''} className="h-[10.56vw] w-[10.56vw] xl:h-[132px] xl:w-[132px]" />
                    </div>
                  </div>
                  <div className="mt-[1.6vw] flex items-center justify-center gap-[0.64vw] xl:mt-5 xl:gap-2">
                    <div className="text-[0.96vw]/[1.92vw] text-gray-300 xl:text-xs/6">{address ?? ''}</div>
                    <ClipSvg
                      className="w-[0.96vw] cursor-pointer stroke-gray-300 xl:w-3"
                      onClick={() => {
                        copyToClipboard(address ?? '');
                        toast.success('Address copied.');
                      }}
                    />
                  </div>

                  <div className="mt-[1.28vw] flex h-[2.88vw] w-full items-center bg-legendary/30 px-[1.12vw] text-[0.96vw]/[1.6vw] font-medium text-legendary backdrop-blur-2xl xl:mt-4 xl:h-9 xl:px-3.5 xl:text-xs/5">
                    <WarningSvg className="mr-[0.48vw] w-[1.6vw] xl:mr-1.5 xl:w-5" />
                    Note: This address only accepts $MDBL.
                  </div>
                </div>
              ) : (
                <div className="mt-[2.56vw] xl:mt-8">
                  <div className="flex h-[8vw] items-center justify-between bg-white/10 px-[1.28vw] xl:h-25 xl:px-4">
                    <div className="flex items-center">
                      <img src="/img/mdbl-in-game.png" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                      <div className="ml-[0.64vw] xl:ml-2">
                        <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                        <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Dragonverse Neo</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex-center text-[0.96vw]/[0.96vw] xl:text-xs/3">
                        Input Amount ({MIN_WITHDRAW}-<span className="text-[1.6vw]/[1.6vw] xl:text-xl/5">∞</span>)
                      </div>
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
                        maxLength={20}
                        type="text"
                        inputMode="decimal"
                        spellCheck="false"
                        onChange={mdblGameValueChange}
                      />
                      <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                        <div>Balance: {formatNumber(BigInt(balances.mdbl ?? '0'), false)}</div>
                        <div className="ml-[0.64vw] cursor-pointer text-blue xl:ml-2" onClick={setMaxMdblGameValue}>
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
                      <img src="/img/mdbl-merlin.png" alt="mdbl" className="h-[3.2vw] xl:h-10" />
                      <div className="ml-[0.64vw] xl:ml-2">
                        <div className="text-[1.28vw]/[1.6vw] font-semibold xl:text-base/5">$MDBL</div>
                        <div className="mt-[0.64vw] text-[0.96vw]/[0.96vw] xl:mt-2 xl:text-xs/3">Merlin Chain</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[0.96vw]/[0.96vw] xl:text-xs/3">Receive</div>
                      <div className="my-[0.96vw] min-h-[1.6vw] bg-transparent text-right text-[1.6vw]/[1.6vw] font-semibold text-gray-300 xl:my-3 xl:min-h-5 xl:text-xl/5">
                        {+mdblGameValue >= MIN_WITHDRAW ? +mdblGameValue - FEE : '0'}
                      </div>
                      <div className="flex items-center text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-sm/3">
                        <div>Balance: {formatNumber(mdblBalance || 0n, false)}</div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-right text-sm text-legendary">Fee: {FEE} $MDBL</p>
                  <Button
                    type="yellow-dark"
                    disabled={!isCanWithdraw}
                    className="mt-[1.92vw] h-[3.52vw] w-full font-semibold xl:mt-6 xl:h-11"
                    onClick={onWithdraw}
                  >
                    Withdraw
                  </Button>
                </div>
              )}
            </div>
            <div className="align-center flex flex-col justify-center">
              <div
                onClick={() => setOpenTradeLogs(true)}
                className="cursor-pointer select-none text-center text-[1.12vw]/[1.6vw] font-semibold text-blue xl:text-sm/5"
              >
                Logs
              </div>
              <div className="mt-[0.64vw] text-[0.96vw]/[1.6vw] font-medium xl:mt-2 xl:text-xs/5">
                Support <span className="cursor-pointer font-semibold text-blue">FAQ</span>
              </div>
            </div>
            <DrawerTradeLogs isOpen={isOpenTradeLogs} onOpenChange={setOpenTradeLogs} />
          </div>
        );
      }}
    />
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
