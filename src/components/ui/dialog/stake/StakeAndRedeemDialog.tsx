'use client';
import CheckedSVG from '@/../public/svg/checked.svg?component';
import InfoSVG from '@/../public/svg/info.svg?component';
import SwitchSVG from '@/../public/svg/switch-02.svg?component';
import { EMDBLABI, MDBLABI } from '@/abis';
import { mainWalletConnectDialogAtom } from '@/atoms';
import { StakeRedeemType, stakeAndRedeemDialogAtom, stakeAndRedeemTypeAtom } from '@/atoms/stake';
import { MAX_UINT_256, inputRegex, periodData, periodTime, ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useIsMainConnected, useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { clsxm, formatNumber } from '@/utils';
import { useAtom, useSetAtom } from 'jotai';
import { escapeRegExp } from 'lodash-es';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'viem';
import Dialog from '..';
import Button from '../../button';
import Tooltip from '../../tooltip';
import ReactGA from 'react-ga4';

export enum PeriodType {
  Day15 = 'DAY15',
  Day30 = 'DAY30',
  Day60 = 'DAY60',
  Day120 = 'DAY120',
}

export default function StakeAndRedeemDialog() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const [isOpen, setIsOpen] = useAtom(stakeAndRedeemDialogAtom);
  const [type, setType] = useAtom(stakeAndRedeemTypeAtom);
  const [stakeValue, setStakeValue] = useState<string>('');
  const [redeemValue, setRedeemValue] = useState<string>('');
  const [activeRedeemPeriod, setActiveRedeemPeriod] = useState<{
    id: PeriodType;
    percent: number;
    days: number;
  }>({
    id: PeriodType.Day15,
    percent: 25,
    days: 15,
  });

  const { emdblCanRedemptionBalance, mdblBalance, allowance } = useStakeContractRead();

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
    onSuccess: (data) => {
      if (!data) return;
      const log = data[0];
      if (log.eventName === 'Approval') {
        toast.success('Approval succeeded');
      }
      if (log.eventName === 'Transfer') {
        toast.success(`Stake ${formatNumber(log.args.value)} $MDBL succeeded`);
        setStakeValue('');
      }
      if (log.eventName === 'RedemptionStarted') {
        toast.success(`Redeem ${formatNumber(log.args.amount, false)} eMDBL succeeded`);
        setRedeemValue('');
      }
    },
  });

  const stakeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setStakeValue(val.replace(/,/g, '.'));
    }
  };

  const redeemValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setRedeemValue(val.replace(/,/g, '.'));
    }
  };
  const stake = async () => {
    ReactGA.event({ category: 'merlin', action: 'confirm_stake' });
    const hash = await writeContract({
      abi: EMDBLABI,
      functionName: 'swapEMDBL',
      args: [parseEther(stakeValue)],
      address: CONTRACT_ADDRESSES.emdbl,
    });
  };

  const approve = async () => {
    const hash = await writeContract({
      abi: MDBLABI,
      functionName: 'approve',
      args: [CONTRACT_ADDRESSES.emdbl, MAX_UINT_256],
      address: CONTRACT_ADDRESSES.mdbl,
    });
  };

  const redeem = async () => {
    ReactGA.event({ category: 'merlin', action: 'confirm_redeem' });
    const hash = await writeContract({
      abi: EMDBLABI,
      functionName: 'startRedemption',
      args: [parseEther(redeemValue), activeRedeemPeriod.days * periodTime],
      address: CONTRACT_ADDRESSES.emdbl,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setStakeValue('');
      setRedeemValue('');
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      contentClassName="pb-[2.88vw] xl:pb-9"
      onOpenChange={setIsOpen}
      render={() => (
        <div>
          {type === StakeRedeemType.Stake ? (
            <div>
              <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Stake</div>
              <div className="mt-[2.56vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-8 xl:text-sm/5">Stake:</div>
              <div className="mt-[0.96vw] flex h-[3.52vw] items-center justify-between bg-white/10 px-[0.96vw] xl:mt-3 xl:h-11 xl:px-3">
                <input
                  className={'max-w-[50%] flex-1 bg-transparent text-[1.28vw]/[1.6vw] font-medium text-yellow xl:text-base/5'}
                  value={stakeValue}
                  placeholder="Enter amount"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={10}
                  type="text"
                  inputMode="decimal"
                  spellCheck="false"
                  onChange={stakeValueChange}
                />

                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-2">
                  <div className="text-[1.28vw]/[1.6vw] font-medium text-gray-300 xl:text-base/5">$MDBL</div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.92vw] xl:w-6" />
                </div>
              </div>
              <div className="mt-[0.8vw] flex items-center justify-between xl:mt-2.5">
                <a
                  className="text-link text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5"
                  href="https://merlinswap.org/trade/swap"
                  target="_blank"
                >
                  Get $MDBL
                </a>
                <div className="flex items-center gap-[0.64vw] xl:gap-2">
                  <div className="text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5">
                    Available: {formatNumber(mdblBalance, false)}
                  </div>
                  <div
                    className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-blue xl:text-sm/5"
                    onClick={() => {
                      setStakeValue(formatEther(mdblBalance || 0n));
                    }}
                  >
                    MAX
                  </div>
                </div>
              </div>
              <div className="flex-center my-[2.56vw] xl:my-8">
                <div className="flex-center h-[3.84vw] w-[3.84vw] cursor-pointer rounded-full bg-white/10 xl:h-12 xl:w-12">
                  <SwitchSVG
                    className="h-[1.76vw] xl:h-5.5"
                    onClick={() => {
                      setType(StakeRedeemType.Redeem);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Receive:</div>
                <div className="flex-end flex items-center">
                  <div>
                    <span className="text-[1.92vw]/[1.92vw] font-medium text-yellow xl:text-2xl/6">
                      {!!stakeValue ? stakeValue : 0}
                    </span>
                    <span className="text-[1.6vw]/[1.92vw] font-medium text-yellow xl:text-xl/6">&nbsp;eMDBL</span>
                  </div>
                  <img src="/img/emdbl.webp" alt="emdbl" className="ml-[0.48vw] w-[1.92vw] xl:ml-1.5 xl:w-6" />
                </div>
              </div>
              {isMainConnected ? (
                !isMerlinChain ? (
                  <Button
                    type="yellow-dark"
                    className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    onClick={() => {
                      ReactGA.event({ category: 'merlin', action: 'wrong_network' });
                      switchMainChain(ALLOW_CHAINS[0]);
                    }}
                  >
                    Wrong Network
                  </Button>
                ) : allowance === 0n || parseEther(stakeValue) > (allowance || 0n) ? (
                  <Button
                    loading={isLoading}
                    type="yellow-dark"
                    className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    onClick={approve}
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    loading={isLoading}
                    type="yellow-dark"
                    className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    onClick={stake}
                    disabled={parseEther(stakeValue) > (mdblBalance || 0n) || !stakeValue || /^0+$/.test(stakeValue)}
                  >
                    {parseEther(stakeValue) > (mdblBalance || 0n) ? 'Insufficient Balance' : 'Confirm'}
                  </Button>
                )
              ) : (
                <Button
                  type="yellow-dark"
                  className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                  onClick={() => setWalletConnect(true)}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          ) : (
            <div>
              <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Redeem</div>
              <div className="mt-[2.56vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-8 xl:text-sm/5">Redeem:</div>
              <div className="mt-[0.96vw] flex h-[3.52vw] items-center justify-between bg-white/10 px-[0.96vw] xl:mt-3 xl:h-11 xl:px-3">
                <input
                  className={'max-w-[50%] flex-1 bg-transparent text-[1.28vw]/[1.6vw] font-medium text-yellow xl:text-base/5'}
                  value={redeemValue}
                  placeholder="Enter amount"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={10}
                  type="text"
                  inputMode="decimal"
                  spellCheck="false"
                  onChange={redeemValueChange}
                />

                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-2">
                  <div className="text-[1.28vw]/[1.6vw] font-medium text-gray-300 xl:text-base/5">eMDBL</div>
                  <img src="/img/emdbl.webp" alt="emdbl" className="w-[1.92vw] xl:w-6" />
                </div>
              </div>
              <div className="mt-[0.8vw] flex items-center justify-end gap-[0.64vw] xl:mt-2.5 xl:gap-2">
                <div className="text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5">
                  Available: {formatNumber(emdblCanRedemptionBalance, false)}
                </div>
                <div
                  className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-blue xl:text-sm/5"
                  onClick={() => {
                    setRedeemValue(formatEther(emdblCanRedemptionBalance || 0n));
                  }}
                >
                  MAX
                </div>
              </div>
              <div className="flex-center my-[2.56vw] xl:my-8">
                <div className="flex-center h-[3.84vw] w-[3.84vw] cursor-pointer rounded-full bg-white/10 xl:h-12 xl:w-12">
                  <SwitchSVG
                    className="h-[1.76vw] xl:h-5.5"
                    onClick={() => {
                      setType(StakeRedeemType.Stake);
                    }}
                  />
                </div>
              </div>

              <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                Choose
                <Tooltip
                  className="w-[42.96vw] xl:w-[537px]"
                  title={
                    <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                      <li>The redemption can be cancelled anytime before the $MDBL claim.</li>
                      <li>The eMDBL under redemption process will still be calculated into the liquidity yield.</li>
                      <li>The unredeemable portion will be considered as slashings.</li>
                    </ul>
                  }
                >
                  <span className="-mb-[0.16vw] inline-block cursor-pointer xl:-mb-0.5">
                    <InfoSVG className="ml-[0.32vw] w-[1.12vw] stroke-white xl:ml-1 xl:w-3.5" />
                  </span>
                </Tooltip>
              </div>
              <div className="">
                {periodData.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={clsxm(
                        'mt-[0.96vw] flex cursor-pointer items-center justify-between border border-gray-600/50 bg-[#111111]/60 pl-[0.64vw] pr-[1.12vw] hover:border-gray-600 hover:bg-[#222222]/60 xl:mt-3 xl:h-11 xl:pl-2 xl:pr-3.5',
                        {
                          'border-yellow/50 bg-yellow/12 hover:border-yellow/50 hover:bg-yellow/12':
                            activeRedeemPeriod.id === item.id,
                        },
                      )}
                      onClick={() => {
                        setActiveRedeemPeriod(item);
                      }}
                    >
                      <div className="flex items-center">
                        {activeRedeemPeriod.id === item.id ? (
                          <CheckedSVG className="w-[1.6vw] stroke-yellow xl:w-5" />
                        ) : (
                          <div className="flex-center h-[1.6vw] w-[1.6vw] xl:h-5 xl:w-5">
                            <div className="h-[0.32vw] w-[0.32vw] rounded-full bg-gray-300 xl:h-1 xl:w-1"></div>
                          </div>
                        )}

                        <div className="ml-[0.64vw] text-[1.12vw]/[1.6vw] font-medium text-yellow xl:ml-2 xl:text-sm/5">
                          {item.days} Days
                        </div>
                      </div>
                      <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">{item.percent}% Redeemable</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-[2.56vw] flex items-center justify-between xl:mt-8">
                <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Receive:</div>
                <div className="flex-end flex items-center">
                  <div>
                    <span className="text-[1.92vw]/[1.92vw] font-medium text-yellow xl:text-2xl/6">
                      {+(Number(redeemValue) * (activeRedeemPeriod.percent / 100)).toFixed(2)}
                    </span>
                    <span className="text-[1.6vw]/[1.92vw] font-medium text-yellow xl:text-xl/6">&nbsp;$MDBL</span>
                  </div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="ml-[0.48vw] w-[1.92vw] xl:ml-1.5 xl:w-6" />
                </div>
              </div>
              {isMainConnected ? (
                !isMerlinChain ? (
                  <Button
                    type="yellow-dark"
                    className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    onClick={() => {
                      ReactGA.event({ category: 'merlin', action: 'wrong_network' });
                      switchMainChain(ALLOW_CHAINS[0]).then();
                    }}
                  >
                    Wrong Network
                  </Button>
                ) : (
                  <Button
                    type="yellow-dark"
                    loading={isLoading}
                    className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    disabled={
                      parseEther(redeemValue) > (emdblCanRedemptionBalance || 0n) || !redeemValue || /^0+$/.test(redeemValue)
                    }
                    onClick={redeem}
                  >
                    {parseEther(redeemValue) > (emdblCanRedemptionBalance || 0n) ? 'Insufficient Balance' : 'Confirm'}
                  </Button>
                )
              ) : (
                <Button
                  type="yellow-dark"
                  className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                  onClick={() => setWalletConnect(true)}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
