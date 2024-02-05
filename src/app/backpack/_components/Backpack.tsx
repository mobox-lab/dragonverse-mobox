'use client';
import DragonBorder from '@/app/_components/DragonBorder';
import ArrowSvg from '@/../public/svg/arrow.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { twMerge } from 'tailwind-merge';
import { escapeRegExp } from 'lodash-es';
import { inputRegex } from '@/constants';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import Button from '@/components/ui/button';
import { dragonWalletConnectDialogAtom, logDialogAtom } from '@/atoms/dragonverse';
import { useSetAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import LogDialog from './LogDialog';
import { useSearchParams } from 'next/navigation';
import { useMoboxBalance } from '@/hooks/useMoboxBalance';
import { formatEther } from 'viem';
import { toSignificant } from '@/utils/format';
import { openLink } from '@/utils';
import DragonItem from './DragonItem';
import { useMoboxDragons } from '@/hooks/useMoboxDragonHelp';
import useFetchMoboxBoxWallet from '@/hooks/useFetchMoboxBoxWallet';
import { arbitrum, bsc } from 'wagmi/chains';
import { DragonStone } from '@/constants/mobox/dragon-stone';
import { useFetchDragonBag } from '@/hooks/useFetchDragonBag';
import { formatGems } from '../_utils/format-gems';
import Backpack from '@/../public/svg/bagpack.svg?component';
import DBAL from '@/../public/svg/dbal.svg?component';

interface BackpackAssetsProps {}

export enum ActionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export enum TargetType {
  BSC = 'BSC',
  ARB = 'ARB',
}

const BackpackAssets: React.FunctionComponent<BackpackAssetsProps> = (props) => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { switchChain } = useSwitchChain();
  const [action, setAction] = useState<ActionType>(type === ActionType.WITHDRAW ? ActionType.WITHDRAW : ActionType.DEPOSIT);
  const [target, setTarget] = useState<TargetType>(TargetType.BSC);
  const [depositValue, setDepositValue] = useState<string>('');
  const [withdrawValue, setWithdrawValue] = useState<string>('');
  const { address, isConnected, chain } = useAccount();
  const [inputAddress, setInputAddress] = useState<string | undefined>(address);
  const [inputAddressTemp, setInputAddressTemp] = useState<string | undefined>(address);
  const [inputAddressOpen, setInputAddressOpen] = useState<boolean>(false);
  const [withdrawConfirmOpen, setWithdrawConfirmOpen] = useState<boolean>(false);
  const { data: mbox } = useMoboxBalance({ address: address });
  const { data: boxWallet } = useFetchMoboxBoxWallet();
  const { data } = useMoboxDragons({ address: address });
  const { data: bags } = useFetchDragonBag({ address });
  const gems = useMemo(() => formatGems(bags?.gems ?? {}), [bags?.gems]);

  const [, copyToClipboard] = useCopyToClipboard();
  const setWalletConnect = useSetAtom(dragonWalletConnectDialogAtom);
  const setLogDialog = useSetAtom(logDialogAtom);
  const [options, setOptions] = useState<{ label: string; value: TargetType }[]>([
    { label: `From BSC`, value: TargetType.BSC },
    { label: `From ARB`, value: TargetType.ARB },
  ]);

  useEffect(() => {
    if (address) {
      setInputAddress(address);
    }
  }, [address]);

  useEffect(() => {
    setOptions([
      { label: `${action === ActionType.DEPOSIT ? 'From' : 'To'} BSC`, value: TargetType.BSC },
      { label: `${action === ActionType.DEPOSIT ? 'From' : 'To'} ARB`, value: TargetType.ARB },
    ]);
  }, [action]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      if (action === ActionType.DEPOSIT) {
        setDepositValue(val.replace(/,/g, '.'));
      } else if (action === ActionType.WITHDRAW) {
        if (Number(val) > (boxWallet?.balance ?? 0)) {
          toast.warning("You don't have enough box wallet mobox.");
          setWithdrawValue(boxWallet?.balance ? boxWallet?.balance?.toString() : '');
        } else if (Number(val) > 50000) {
          setWithdrawValue('50000');
        } else {
          setWithdrawValue(val.replace(/,/g, '.'));
        }
      }
    }
  };

  const inputAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputAddressTemp(val);
  };

  const deposit = async () => {
    if (target === TargetType.BSC) {
      if (chain?.id !== bsc.id) {
        switchChain({ chainId: bsc.id });
        return;
      }
    } else {
      if (chain?.id !== arbitrum.id) {
        switchChain({ chainId: arbitrum.id });
        return;
      }
    }
  };
  return (
    <div className="relative  w-full border border-gray-600 bg-black/60 backdrop-blur-sm ">
      <div className="grid h-full grid-cols-2">
        <div className="relative h-full">
          <DragonBorder className="inset-[0.64vw] right-[0.32vw] -z-10 xl:inset-2 xl:right-1" />
          <div className="relative px-[3.2vw] py-[3.84vw] xl:px-10 xl:py-12">
            <div className="flex items-center justify-between">
              <div className="text-[1.28vw] font-semibold xl:text-base">My MODragon ({data.length})</div>
              <div
                className="flex cursor-pointer items-center text-[1.12vw]/[1.6vw] font-semibold text-blue hover:underline xl:text-sm"
                onClick={() => openLink('https://www.mobox.io/#/iframe/dragonmo')}
              >
                Go Market <ArrowSvg className="w-[0.96vw] rotate-90 fill-blue xl:w-3.5" />
              </div>
            </div>
            <div className="mt-[0.96vw] flex gap-[0.96vw] overflow-auto xl:mt-3 xl:gap-3">
              {/* {data.length ? (
                data.map((item, index) => <DragonItem key={index} data={item} />)
              ) : (
                <div className="flex-center box-content w-full border border-gray-500 bg-gray-550/10 py-[5.76vw] text-[1.12vw] text-gray-300 xl:py-18 xl:text-sm">
                  NO DRAGON
                </div>
              )} */}
              <div className="flex-center box-content w-full flex-col gap-[0.64vw] border border-gray-300 bg-gray-300/10 py-[5.76vw] text-[1.12vw] text-gray-300 xl:gap-2 xl:py-18 xl:text-sm">
                <Backpack className="w-[3.84vw] fill-white/30 xl:w-12" />
                Coming soon
              </div>
            </div>
            <div className="mt-[2.4vw] text-[1.28vw] font-semibold xl:mt-7.5 xl:text-base">Stones</div>
            <div className="mt-[0.96vw] flex gap-[0.8vw] xl:mt-3 xl:gap-2.5">
              {Object.values(DragonStone).map((key) => (
                <div key={key} className="border border-gray-400/50 p-[0.48vw] xl:p-1.5">
                  <img className="mx-auto w-[2.4vw] xl:w-7.5" src={`/img/gpark/dragon/stones/${key}.webp`} alt="stone" />
                  <p className="mt-[0.16vw] w-[3.52vw] text-right text-[0.96vw]/[0.96vw] font-medium text-yellow xl:mt-0.5 xl:w-11 xl:text-xs/3">
                    {toSignificant(bags?.stones[key] ?? 0)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-[2.4vw] text-[1.28vw] font-semibold xl:mt-7.5 xl:text-base">Gems</div>
            <div className="mt-[0.96vw] flex flex-wrap gap-[0.8vw] xl:mt-3 xl:gap-2.5">
              {gems.map((gem, index) => (
                <div key={index} className="border border-gray-400/50 p-[0.48vw] xl:p-1.5">
                  <img className="mx-auto w-[2.4vw] xl:w-7.5" src={`/img/gpark/dragon/gems/gem${index + 1}.webp`} alt="gem" />
                  <p className="mt-[0.16vw] w-[3.52vw] text-right text-[0.96vw]/[0.96vw] font-medium text-yellow xl:mt-0.5 xl:w-11 xl:text-xs/3">
                    {toSignificant(gem)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative h-full">
          <DragonBorder className="inset-[0.64vw] left-[0.32vw] -z-10 xl:inset-2 xl:left-1" />
          {/* <div className="relative px-[3.2vw] pt-[3.84vw] xl:px-10 xl:pt-12">
            <div className="flex items-center justify-between">
              <div className="text-[1.28vw] font-semibold xl:text-base">$MBOX Balance</div>
              <div className="flex cursor-pointer items-center text-[1.12vw]/[1.6vw] font-semibold text-blue hover:underline xl:text-sm">
                Get $MBOX <ArrowSvg className="w-[0.96vw] rotate-90 fill-blue xl:w-3.5" />
              </div>
            </div>

            <div className="mt-[0.96vw] flex items-center justify-center xl:mt-3">
              <div className="relative h-[6.56vw] w-[6.56vw] border border-yellow xl:h-[82px] xl:w-[82px]">
                <div className="absolute left-0 top-0 origin-top-left border-[0.48vw] border-yellow border-b-transparent border-r-transparent transition xl:border-[6px]" />
                <div className="flex h-full flex-col items-center justify-center gap-[0.32vw] xl:gap-1">
                  <img src="/img/mobox-wallet.png" alt="mobox" className="w-[2.4vw] xl:w-7.5" />
                  <div className="text-[0.96vw]/[0.96vw] font-semibold xl:text-xs/3">Box Wallet</div>
                  <div className="text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-xs/3">
                    {toSignificant(boxWallet?.balance ?? 0)}
                  </div>
                </div>
              </div>

              <div className="mx-[1.28vw] flex flex-col items-center xl:mx-4">
                <div
                  className={clsx('text-[0.96vw]/[0.96vw] text-gray-300 xl:text-xs/3', {
                    'text-white': action === ActionType.DEPOSIT,
                  })}
                >
                  Deposit
                </div>
                {action === ActionType.DEPOSIT ? (
                  <SwitchActiveSvg className="w-[10.24vw] rotate-180 xl:w-[128px]" />
                ) : (
                  <SwitchSvg className="w-[10.24vw] xl:w-[128px]" />
                )}
                {action === ActionType.WITHDRAW ? (
                  <SwitchActiveSvg className="w-[10.24vw] xl:w-[128px]" />
                ) : (
                  <SwitchSvg className="w-[10.24vw] rotate-180 xl:w-[128px]" />
                )}
                <div
                  className={clsx('text-[0.96vw]/[0.96vw] text-gray-300 xl:text-xs/3', {
                    'text-white': action === ActionType.WITHDRAW,
                  })}
                >
                  Withdraw
                </div>
              </div>

              <div
                className={clsx(
                  'relative h-[6.56vw] w-[6.56vw] cursor-pointer border border-gray-600/50 xl:h-[82px] xl:w-[82px]',
                  {
                    '!border-yellow': target === TargetType.BSC,
                  },
                )}
                onClick={() => {
                  setTarget(TargetType.BSC);
                }}
              >
                {target === TargetType.BSC && (
                  <div className="absolute left-0 top-0 origin-top-left border-[0.48vw] border-yellow border-b-transparent border-r-transparent transition xl:border-[6px]" />
                )}
                <div className="flex h-full flex-col items-center justify-center gap-[0.32vw] xl:gap-1">
                  <img src="/img/mobox.png" alt="mobox" className="w-[2.4vw] xl:w-7.5" />
                  <div className="text-[0.96vw]/[0.96vw] font-semibold xl:text-xs">BSC</div>
                  <div className="text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-xs">
                    {toSignificant(formatEther(mbox.bsc))}
                  </div>
                </div>
              </div>

              <div
                className={clsx(
                  'relative ml-[0.8vw] h-[6.56vw] w-[6.56vw] cursor-pointer border border-gray-600/50 xl:ml-2.5 xl:h-[82px] xl:w-[82px]',
                  {
                    '!border-yellow': target === TargetType.ARB,
                  },
                )}
                onClick={() => {
                  setTarget(TargetType.ARB);
                }}
              >
                {target === TargetType.ARB && (
                  <div className="absolute left-0 top-0 origin-top-left border-[0.48vw] border-yellow border-b-transparent border-r-transparent transition xl:border-[6px]" />
                )}
                <div className="flex h-full flex-col items-center justify-center gap-[0.32vw] xl:gap-1">
                  <img src="/img/mobox.png" alt="mobox" className="w-[2.4vw] xl:w-7.5" />
                  <div className="text-[0.96vw]/[0.96vw] font-semibold xl:text-xs">ARB</div>
                  <div className="text-[0.96vw]/[0.96vw] font-semibold text-yellow xl:text-xs">
                    {toSignificant(formatEther(mbox.arb))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[5.44vw] border-b border-[#4D432E] xl:mt-[68px]">
              <div className="flex">
                <div
                  className={clsx(
                    'h-[2.24vw] w-[8.24vw] cursor-pointer bg-white/10 text-center text-[1.12vw]/[2.24vw] font-semibold xl:h-7 xl:w-[103px] xl:text-sm/7',
                    {
                      'bg-[#4D442E] text-yellow': action === ActionType.DEPOSIT,
                    },
                  )}
                  onClick={() => setAction(ActionType.DEPOSIT)}
                >
                  Deposit
                </div>
                <div
                  className={clsx(
                    'h-[2.24vw] w-[8.24vw] cursor-pointer bg-white/10 text-center text-[1.12vw]/[2.24vw] font-semibold xl:h-7 xl:w-[103px] xl:text-sm/7',
                    {
                      'bg-[#4D442E] text-yellow': action === ActionType.WITHDRAW,
                    },
                  )}
                  onClick={() => setAction(ActionType.WITHDRAW)}
                >
                  Withdraw
                </div>
              </div>
            </div>

            <div className="mt-[1.6vw] flex items-center justify-between xl:mt-5">
              <div className="text-[1.28vw] font-semibold xl:text-base">
                {action === ActionType.DEPOSIT ? 'Deposit' : 'Withdraw'} Amount
              </div>

              <Segmented
                className="h-[3.04vw] whitespace-nowrap text-[1.12vw]/[1.28vw] font-semibold xl:h-[38px] xl:text-sm/4"
                defaultValue={TargetType.BSC}
                onChange={(value) => {
                  setTarget(value as TargetType);
                }}
                options={options}
              />
            </div>

            <div className="mt-[1.6vw] flex h-[1.76vw] items-center text-[0.96vw]/[1.6vw] xl:mt-5 xl:h-5.5 xl:text-xs/5">
              Address:
              <div className="mr-[0.32vw] text-gray-300 xl:mx-1">{action === ActionType.DEPOSIT ? address : inputAddress}</div>
              {address ? (
                action === ActionType.DEPOSIT ? (
                  <ClipSvg
                    className="w-[0.96vw] cursor-pointer xl:w-3"
                    onClick={() => {
                      copyToClipboard(address);
                      toast.success('Address copied.');
                    }}
                  />
                ) : (
                  <SwitchAddressSvg className="w-[1.76vw] cursor-pointer xl:w-5.5" onClick={() => setInputAddressOpen(true)} />
                )
              ) : null}
            </div>
            <div className="relative mt-[0.8vw] xl:mt-2.5">
              <input
                type="text"
                className={twMerge(
                  'h-[3.52vw] w-full bg-white/10 px-[1.12vw] text-[1.28vw] font-semibold text-yellow placeholder:text-white/50 xl:h-11 xl:px-3.5 xl:text-base',
                )}
                value={action === ActionType.DEPOSIT ? depositValue : withdrawValue}
                onChange={inputChange}
                autoComplete="off"
                autoCorrect="off"
                minLength={1}
                maxLength={79}
                pattern="^[0-9]*[.,]?[0-9]*$"
                inputMode="decimal"
                placeholder="Enter Amount"
                spellCheck="false"
              />
              {action === ActionType.WITHDRAW && (
                <div className="absolute right-[1.12vw] top-1/2 -translate-y-1/2 transform text-[1.12vw]/[1.6vw] text-gray-300 xl:right-3.5 xl:text-sm">
                  30-50000
                </div>
              )}
            </div>

            <div className="h-[7.2vw] xl:h-[90px]">
              {action === ActionType.DEPOSIT && (
                <div className="pt-[3.52vw] xl:pt-11">
                  <div className="flex h-[2.4vw] w-full items-center justify-start border border-legendary/60 bg-[#181818]/60 px-[0.64vw] text-[0.96vw] text-legendary xl:h-7.5 xl:px-2 xl:text-xs">
                    <WarningSvg className="mr-[0.48vw] w-[1.28vw] xl:mr-1.5 xl:w-4" />
                    Note: Address only accepts $MBOX
                  </div>
                </div>
              )}

              {action === ActionType.WITHDRAW && (
                <div className="pt-[0.8vw] xl:pt-2.5">
                  <div className="flex items-center text-[0.96vw] text-gray-300 xl:text-xs">
                    <div>Fee: 1 $MBOX</div>
                    <div className="ml-[1.92vw] xl:ml-6">
                      Amount Received: {withdrawValue ? Number(withdrawValue) - 1 : 0} $MBOX
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isConnected ? (
              action === ActionType.DEPOSIT ? (
                <Button type="red" className="w-full font-bold" onClick={deposit}>
                  Deposit
                </Button>
              ) : (
                <Button
                  type="red"
                  className="w-full font-bold"
                  onClick={() => {
                    if (!withdrawValue) {
                      toast.error('Please Enter Amount First.');
                    } else if (Number(withdrawValue) < 30 || Number(withdrawValue) > 50000) {
                      toast.error('Error Amount.');
                    } else {
                      setWithdrawConfirmOpen(true);
                    }
                  }}
                >
                  Withdraw
                </Button>
              )
            ) : (
              <Button
                type="red"
                className="w-full"
                onClick={() => {
                  setWalletConnect(true);
                }}
              >
                Connect Wallet
              </Button>
            )}

            <div
              className="mb-[2.56vw] mt-[0.96vw] cursor-pointer text-center text-[1.12vw] text-blue xl:mb-8 xl:mt-3 xl:text-sm"
              onClick={() => setLogDialog(true)}
            >
              LOGS
            </div>
          </div> */}
          <div className="relative flex h-full flex-col items-center justify-center gap-[0.64vw] xl:gap-2">
            <DBAL className="w-[3.84vw] fill-gray-300 xl:w-12" />
            Coming soon
          </div>
        </div>
      </div>
      <Dialog
        open={inputAddressOpen}
        className="w-[35.2vw] xl:w-[440px]"
        onOpenChange={(value) => {
          setInputAddressOpen(value);
        }}
        render={() => (
          <div className="w-full">
            <div className="text-center text-[1.6vw]/[1.92vw] font-semibold xl:text-xl/6">Please enter Address</div>
            <div className="mt-[2.56vw] text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">Please enter Address</div>
            <input
              type="text"
              className={twMerge(
                'mt-[0.8vw] h-[3.52vw] w-full bg-white/10 px-[1.12vw] text-[0.96vw] placeholder:text-white/50 xl:mt-2.5 xl:h-11 xl:px-3.5 xl:text-xs',
              )}
              value={inputAddressTemp}
              onChange={inputAddressChange}
              autoComplete="off"
              autoCorrect="off"
              inputMode="decimal"
              placeholder="Enter Address"
              spellCheck="false"
            />
            <div className="mt-[2.56vw] grid grid-cols-2 gap-[1.28vw] xl:mt-8 xl:gap-4">
              <Button type="bordered" className="w-full" onClick={() => setInputAddressOpen(false)}>
                Cancel
              </Button>
              <Button
                type="red"
                className="w-full"
                onClick={() => {
                  setInputAddress(inputAddressTemp);
                  setInputAddressOpen(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      />
      <Dialog
        open={withdrawConfirmOpen}
        className="w-[35.2vw] xl:w-[440px]"
        onOpenChange={(value) => {
          setWithdrawConfirmOpen(value);
        }}
        render={() => (
          <div className="w-full">
            <div className="flex flex-col items-center">
              <WarningSvg className="w-[3.84vw] xl:w-12" />
              <div className="mt-[1.28vw] text-[1.6vw]/[1.76vw] font-semibold text-legendary xl:mt-4 xl:text-xl/5.5">
                Confirm Withdraw
              </div>
            </div>
            <div className="mt-[2.56vw] text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">
              You are withdraw {withdrawValue} $MBOX from your Box Wallet to
            </div>
            <div className="mt-[0.96vw] text-[1.12vw]/[1.92vw] text-gray-300 xl:mt-3 xl:text-sm/6">{inputAddress}</div>
            <div className="text-[1.12vw]/[1.92vw] text-gray-300 xl:text-sm/6">
              Amount Received: {Number(withdrawValue) - 1} $MBOX (Fee: 1 $MBOX)
            </div>
            <Button className="mt-[2.56vw] w-full xl:mt-8" type="red">
              Withdraw
            </Button>
          </div>
        )}
      />
      <LogDialog />
    </div>
  );
};

export default BackpackAssets;
