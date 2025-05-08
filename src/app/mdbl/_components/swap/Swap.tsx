import DiscordIcon from '@/../public/svg/discord.svg?component';
import InfoSVG from '@/../public/svg/info.svg?component';
import LoadingSvg from '@/../public/svg/loading-02.svg?component';
import SettingSVG from '@/../public/svg/setting.svg?component';
import SwapArrowSVG from '@/../public/svg/swap-arrow.svg?component';
import CopySVG from '@/../public/svg/copy.svg?component';
import XIcon from '@/../public/svg/x.svg?component';
import { LiquidityBootstrapPoolABI } from '@/abis/LiquidityBootstrapPool';
import { mainWalletConnectDialogAtom } from '@/atoms';
import {
  assetsBalanceAtom,
  chartNeedRefreshAtom,
  isAbleToClaimAtom,
  poolInitialAtom,
  shareBalanceAtom,
  receiveShareAtom,
} from '@/atoms/lbp';
import {
  currentInputOutputAtom,
  DEFAULT_SLIPPAGE_TOLERANCE,
  ExactField,
  inputChangeAtom,
  priceImpactAtom,
  slippageAtom,
  SwapField,
  swapParamsAtom,
  swapTypeAtom,
  switchTokenAtom,
} from '@/atoms/swap';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import Popover from '@/components/ui/popover';
import { ALLOW_CHAINS, inputRegex, SocialLinks } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useIsMainConnected, useMainAccount, useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { clsxm, escapeRegExp, formatNumber, lessThanOneFormat, openLink, retainDigits, shortenDigits } from '@/utils';
import clsx from 'clsx';
import { formatEther, parseEther } from 'ethers';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useCopyToClipboard, useDebounce } from 'react-use';
import { useFetchShares } from '@/hooks/useFetchShares';
import Tooltip from '@/components/ui/tooltip';
import { useIsEnd } from '@/hooks/useIsEnd';
import { MainWalletType } from '@/constants/enum';
import { getConnectorClient } from '@wagmi/core';
import { wagmiConfig } from '@/providers/wagmi-provider';
import { watchAsset } from 'viem/actions';
import { isMobile } from 'react-device-detect';
import ReactGA from 'react-ga4';
import WarningSvg from '@/../public/svg/warning.svg?component';

export enum SlipPageType {
  AUTO = 'auto',
  CUSTOM = 'custom',
}

const regExp = /^0.0+$/;
const regDotExp = /^\./;
export default function Swap({ className }: { className?: string }) {
  const setChartNeedRefresh = useSetAtom(chartNeedRefreshAtom);
  const { writeContract, isLoading } = useMainWriteContract({
    onError: (error) => {
      if (error?.name === 'UserRejected') {
        return;
      }
      if (error?.name === 'EstimateGasExecutionError') {
        toast.error(error.message);
        return;
      }
      if (error?.name === 'TransactionFailed') {
        toast.error('Please adjust your Slippage Tolerance');
        return;
      }
      toast.error('Network error, please try again later');
    },
    onSuccess: (data) => {
      if (!data) return;
      const log = data[0];
      if (log.eventName === 'Buy') {
        toast.success(`Buy ${shortenDigits(Number(formatEther(log.args.shares)))} $MDBL succeeded`);
        setChartNeedRefresh((pre) => pre + 1);
      }
      if (log.eventName === 'Sell') {
        toast.success(`Sell ${shortenDigits(Number(formatEther(log.args.shares)))} $MDBL succeeded`);
        setChartNeedRefresh((pre) => pre + 1);
      }
      if (log.eventName === 'Approval') {
        toast.success('Approval succeeded');
      }
      if (log.eventName === 'Redeem') {
        toast.success(`Claim ${shortenDigits(Number(formatEther(log.args.shares)))} $MDBL succeeded`);
      }
    },
  });

  const [, copyToClipboard] = useCopyToClipboard();
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const switchToken = useSetAtom(switchTokenAtom);
  const swapType = useAtomValue(swapTypeAtom);
  const { value: assetsBalance } = useAtomValue(assetsBalanceAtom);
  const { value: balance } = useAtomValue(shareBalanceAtom);

  const [slipType, setSlipType] = useState<SlipPageType>(SlipPageType.AUTO);
  const [isOpen, setIsOpen] = useState(false);
  const [slip, setSlip] = useAtom(slippageAtom);
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const { evmAddress, walletType } = useMainAccount();

  const { data } = useFetchShares({ address: evmAddress });
  const [inputInValue, setInputInValue] = useState<string>('');
  const [inputInDebounceValue, setInputInDebounceValue] = useState<string>('');

  const [inputOutValue, setInputOutValue] = useState<string>('');
  const [inputOutDebounceValue, setInputOutDebounceValue] = useState<string>('');
  const priceImpact = useAtomValue(priceImpactAtom);
  const currentInputOutput = useAtomValue(currentInputOutputAtom);
  const setInputChangeAtom = useSetAtom(inputChangeAtom);
  const swapParams = useAtomValue(swapParamsAtom);

  const receiveShare = useAtomValue(receiveShareAtom);

  const [, inputInCancel] = useDebounce(
    () => {
      setInputInDebounceValue(inputInValue);
    },
    1000,
    [inputInValue],
  );

  const [, inputOutCancel] = useDebounce(
    () => {
      setInputOutDebounceValue(inputOutValue);
    },
    1000,
    [inputOutValue],
  );

  const inputInRef = useRef<any>(null);
  const inputOutRef = useRef<any>(null);
  const pool = useAtomValue(poolInitialAtom);
  const [UIloading, setUILoading] = useState<boolean>(true);
  const isAbleToClaim = useAtomValue(isAbleToClaimAtom);

  useEffect(() => {
    if (pool?.saleEnd !== undefined) {
      setTimeout(() => {
        setUILoading(false);
      }, 1100);
    }
  }, [pool]);
  const isEnd = useIsEnd();
  const slipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlipType(SlipPageType.CUSTOM);
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      if (Number(val) > 30) {
        setSlip('30');
      } else {
        setSlip(val.replace(/,/g, '.'));
      }
    }
  };

  const inputInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setInputInValue(val.replace(/,/g, '.'));
    } else {
      inputInRef.current.value = inputInDebounceValue;
    }
  };

  const inputOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || inputRegex.test(escapeRegExp(val))) {
      setInputOutValue(val.replace(/,/g, '.'));
    } else {
      inputOutRef.current.value = inputOutDebounceValue;
    }
  };

  useEffect(() => {
    if (inputInDebounceValue === '' || regDotExp.test(inputInDebounceValue)) {
      if (inputInRef.current && inputOutRef.current && !isEnd) {
        inputInRef.current.value = '';
        inputOutRef.current.value = '';
        setInputChangeAtom([ExactField.ExactIn, parseEther('0')]);
        return;
      }
    }

    if (regExp.test(inputInDebounceValue) || inputInDebounceValue === '0' || inputInDebounceValue === '0.') {
      if (inputInRef.current && inputOutRef.current && !isEnd) {
        inputInRef.current.value = inputInDebounceValue;
        inputOutRef.current.value = '';
        setInputChangeAtom([ExactField.ExactIn, parseEther('0')]);
        return;
      }
    }

    if (swapType === SwapField.Sell && parseInt(inputInDebounceValue) < 1 && parseEther(inputInDebounceValue) !== 0n) {
      toast.error('The minimum amount for $MDBL is 1.');
      setInputChangeAtom([ExactField.ExactIn, parseEther('0')]);
      return;
    }

    setInputChangeAtom([ExactField.ExactIn, parseEther(inputInDebounceValue || '0')]);
  }, [inputInDebounceValue, setInputChangeAtom, isEnd, swapType]);

  useEffect(() => {
    if (!inputOutDebounceValue || regDotExp.test(inputOutDebounceValue)) {
      if (inputInRef.current && inputOutRef.current && !isEnd) {
        inputInRef.current.value = '';
        inputOutRef.current.value = '';
        setInputChangeAtom([ExactField.ExactOut, parseEther('0')]);
        return;
      }
    }
    if (regExp.test(inputOutDebounceValue) || inputOutDebounceValue === '0' || inputOutDebounceValue === '0.') {
      if (inputInRef.current && inputOutRef.current && !isEnd) {
        inputInRef.current.value = '';
        inputOutRef.current.value = inputOutDebounceValue;
        setInputChangeAtom([ExactField.ExactIn, parseEther('0')]);
        return;
      }
    }
    if (swapType === SwapField.Buy && parseInt(inputOutDebounceValue) < 1 && parseEther(inputOutDebounceValue) !== 0n) {
      toast.error('The minimum amount for $MDBL is 1.');
      setInputChangeAtom([ExactField.ExactOut, parseEther('0')]);
      return;
    }

    setInputChangeAtom([ExactField.ExactOut, parseEther(inputOutDebounceValue || '0')]);
  }, [inputOutDebounceValue, setInputChangeAtom, isEnd, swapType]);

  useEffect(() => {
    if (inputInRef?.current) {
      if (currentInputOutput[0] === 0n) {
        if (regExp.test(inputInDebounceValue) || inputInDebounceValue === '0' || inputInDebounceValue === '0.') {
          inputInRef.current.value = inputInDebounceValue;
        } else {
          inputInRef.current.value = '';
        }
      } else {
        if (swapType === SwapField.Buy) {
          inputInRef.current.value = retainDigits(formatEther(currentInputOutput[0] ?? 0n));
        } else {
          inputInRef.current.value = parseInt(formatEther(currentInputOutput[0]));
        }
      }
    }
    if (inputOutRef?.current) {
      if (currentInputOutput[1] === 0n) {
        if (regExp.test(inputOutDebounceValue) || inputOutDebounceValue === '0' || inputOutDebounceValue === '0.') {
          inputOutRef.current.value = inputOutDebounceValue;
        } else {
          inputOutRef.current.value = '';
        }
      } else {
        if (swapType === SwapField.Buy) {
          inputOutRef.current.value = parseInt(formatEther(currentInputOutput[1]));
        } else {
          inputOutRef.current.value = retainDigits(formatEther(currentInputOutput[1] ?? 0n));
        }
      }
    }
  }, [currentInputOutput, inputInDebounceValue, inputOutDebounceValue, swapType]);

  const bugAndSell = async () => {
    if (swapParams?.description === 'Approve') {
      ReactGA.event({ category: 'merlin', action: 'approve_mdbl', label: '' });
    } else if (swapType === SwapField.Buy) {
      ReactGA.event({ category: 'merlin', action: 'buy_mdbl', label: '' });
    } else {
      ReactGA.event({ category: 'merlin', action: 'sell_mdbl', label: '' });
    }
    if (swapParams?.writeParams) {
      const hash = await writeContract({
        abi: swapParams?.writeParams?.abi,
        functionName: swapParams?.writeParams?.functionName,
        args: swapParams?.writeParams?.args,
        address: swapParams?.writeParams?.address,
      });
    }
  };

  const isInsufficient = useMemo(() => {
    if (inputInDebounceValue === '.') {
      return false;
    }

    const bigIntInput = parseEther(inputInDebounceValue || '0');
    const bigIntOutputIn = currentInputOutput[0];
    let max;
    if (bigIntInput > bigIntOutputIn) {
      max = bigIntInput;
    } else {
      max = bigIntOutputIn;
    }
    if (swapType === SwapField.Buy) {
      return max > assetsBalance;
    } else {
      return max > (balance || 0n);
    }
  }, [assetsBalance, balance, inputInDebounceValue, swapType, currentInputOutput]);

  const unitPrice = useMemo(() => {
    if (currentInputOutput[0] !== 0n && currentInputOutput[1] !== 0n) {
      if (swapType === SwapField.Buy) {
        const BTCToMDBL = shortenDigits(
          Number(formatEther(currentInputOutput[1])) / Number(formatEther(currentInputOutput[0])),
          5,
        );
        return `1 M-BTC = ${BTCToMDBL} MDBL`;
      } else if (swapType === SwapField.Sell) {
        const MBDLToBTC = shortenDigits(
          Number(formatEther(currentInputOutput[1])) / Number(formatEther(currentInputOutput[0])),
          5,
        );
        return `1 MDBL = ${MBDLToBTC} M-BTC`;
      }
      return null;
    }
    return null;
  }, [currentInputOutput, swapType]);

  const claim = async () => {
    ReactGA.event({ category: 'merlin', action: 'claim_mdb', label: '' });
    const hash = await writeContract({
      abi: LiquidityBootstrapPoolABI,
      address: CONTRACT_ADDRESSES.lbp,
      functionName: 'redeem',
      args: [evmAddress, false],
    });
  };

  const fillInInput = () => {
    if (swapType === SwapField.Buy) {
      return;
    }
    const fillNumber = swapType === SwapField.Sell ? balance : assetsBalance;
    setInputInDebounceValue(formatEther(fillNumber));
  };

  const fillOutInput = () => {
    const fillNumber = swapType === SwapField.Buy ? balance : assetsBalance;
    setInputOutDebounceValue(formatEther(fillNumber));
  };

  const addToken = async (type: 'MDBL' | 'M-BTC') => {
    if (walletType === MainWalletType.EVM) {
      const walletClient = await getConnectorClient(wagmiConfig);
      watchAsset(walletClient, {
        type: 'ERC20',
        options: {
          address: type === 'MDBL' ? CONTRACT_ADDRESSES.mdbl : CONTRACT_ADDRESSES.mbtc,
          decimals: 18,
          symbol: type,
          image: type === 'MDBL' ? 'https://cdn-dragonverseneo.mobox.app/mdbl.webp' : undefined,
        },
      }).then();
    }
    copyToClipboard(type === 'MDBL' ? CONTRACT_ADDRESSES.mdbl : CONTRACT_ADDRESSES.mbtc);
    toast.success('Token address copied.');
  };

  return (
    <div
      className={clsxm(
        'relative h-[39.28vw] basis-[28.16vw] border border-yellow/50 bg-yellow/[0.08] px-[1.6vw] py-[2.4vw] backdrop-blur-sm xl:h-[491px] xl:basis-[352px] xl:px-5 xl:py-7.5',
        className,
      )}
    >
      <PatternWithoutLine className="stroke-yellow" />
      <Suspense fallback="">
        {UIloading ? (
          <div className="flex-center h-full">
            <LoadingSvg className="h-[2.56vw] w-[2.56vw] animate-spin fill-gray-300 xl:mt-8 xl:h-8 xl:w-10" />
          </div>
        ) : isEnd ? (
          <div className="flex h-full flex-col">
            <div className="flex-center gap-[0.32vw] text-[1.28vw]/[1.92vw] font-medium xl:gap-1 xl:text-base/6">
              <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
              $MDBL LBP Ended
            </div>
            <div className="mt-[0.96vw] border-b border-[#4D432E] xl:mt-3"></div>
            <div className={clsxm('flex-center flex-1 flex-col', { 'py-[7vw]': isMobile })}>
              <div className="flex-center gap-[0.32vw] text-[1.28vw]/[1.92vw] font-medium xl:gap-1 xl:text-base/6">
                My $MDBL <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
              </div>
              <div className="mt-[0.64vw] text-center text-[2.72vw]/[4.16vw] font-medium text-yellow xl:mt-2 xl:text-[34px]/[52px]">
                {receiveShare.value != 0n ? lessThanOneFormat(BigInt(receiveShare.value)) : lessThanOneFormat(balance)}
              </div>
            </div>

            <div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Token address</div>
                  <Button
                    type="yellow-dark"
                    className="h-[1.6vw] w-[4vw] !p-0 text-center !text-[0.96vw]/[1.6vw] text-yellow xl:h-5 xl:w-12.5 xl:!text-xs/5"
                    onClick={() => addToken('MDBL')}
                  >
                    COPY
                  </Button>
                </div>
                <div className="mt-[0.64vw] text-[0.96vw]/[1.6vw] font-medium xl:mt-2 xl:text-xs/5">
                  {CONTRACT_ADDRESSES.mdbl}
                </div>
              </div>

              {isMainConnected ? (
                !isMerlinChain ? (
                  <Button
                    type="yellow"
                    className={clsx('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    onClick={() => {
                      ReactGA.event({ category: 'merlin', action: 'wrong_network' });
                      switchMainChain(ALLOW_CHAINS[0]).then();
                    }}
                  >
                    Wrong Network
                  </Button>
                ) : (
                  <Button
                    type="yellow"
                    className={clsx('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                    disabled={!isAbleToClaim || !balance}
                    loading={isLoading}
                    onClick={claim}
                  >
                    {isAbleToClaim ? (!balance && receiveShare.value != 0n ? 'Claimed' : 'Claim $MDBL') : 'Claim $MDBL'}
                  </Button>
                )
              ) : (
                <Button
                  type="yellow"
                  className={clsx('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                  onClick={() => setWalletConnect(true)}
                >
                  Connect Wallet
                </Button>
              )}

              {!isAbleToClaim && (
                <div className="flex-center mt-[0.96vw] gap-[0.32vw] text-[0.96vw]/[1.6vw] text-gray-300 xl:mt-3 xl:gap-1 xl:text-xs/5">
                  Stay Tuned for $MDBL Claim Schedule
                  <XIcon
                    className="w-[1.6vw] cursor-pointer fill-gray-300 xl:w-5"
                    onClick={() => {
                      window.open(SocialLinks.twitter, '_blank');
                    }}
                  />
                  <DiscordIcon
                    className="w-[1.6vw] cursor-pointer fill-gray-300 xl:w-5"
                    onClick={() => {
                      window.open(SocialLinks.discord, '_blank');
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="relative flex items-center justify-between">
              <div className="grid w-[19.2vw] grid-cols-2 border-b border-[#4D432E] xl:w-[240px]">
                <div
                  className={clsx(
                    'h-[3.2vw] cursor-pointer bg-white/10 text-center text-[1.12vw]/[3.2vw] font-medium xl:h-10 xl:text-base/10',
                    {
                      '!bg-[#4D442E] text-yellow': swapType === SwapField.Buy,
                    },
                    {
                      'hover:!bg-white/16': swapType === SwapField.Sell,
                    },
                  )}
                  onClick={() => {
                    setInputInValue('');
                    setInputInDebounceValue('');
                    setInputOutValue('');
                    setInputOutDebounceValue('');
                    switchToken();
                  }}
                >
                  Buy $MDBL
                </div>
                <div
                  className={clsx(
                    'h-[3.2vw] cursor-pointer bg-white/10 text-center text-[1.12vw]/[3.2vw] font-medium xl:h-10 xl:text-base/10',
                    {
                      '!bg-[#4D442E] text-yellow': swapType === SwapField.Sell,
                    },
                    {
                      'hover:!bg-white/16': swapType === SwapField.Buy,
                    },
                  )}
                  onClick={() => {
                    setInputInValue('');
                    setInputInDebounceValue('');
                    setInputOutValue('');
                    setInputOutDebounceValue('');
                    switchToken();
                  }}
                >
                  Sell $MDBL
                </div>
              </div>

              <Popover
                open={isOpen}
                onOpenChange={setIsOpen}
                placement="bottom-end"
                render={() => (
                  <div className="w-[24.96vw] items-start border border-gray-600 bg-black px-[1.28vw] py-[1.6vw] xl:w-[312px] xl:px-4 xl:py-5">
                    <div className="flex items-center text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                      Max Slippage
                      <Tooltip title="Slippage Tolerance is the maximum change in price you are willing to accept">
                        <span className="cursor-pointer">
                          <InfoSVG className="ml-[0.32vw] w-[1.12vw] stroke-white xl:ml-1 xl:w-3.5" />
                        </span>
                      </Tooltip>
                    </div>
                    <div className="mt-[1.28vw] flex items-center justify-between xl:mt-4">
                      <div className="flex h-[3.2vw] items-center bg-white/6 p-[0.48vw] xl:h-10 xl:p-1.5">
                        <div
                          className={clsx(
                            'cursor-pointer px-[0.96vw] py-[0.48vw] text-[1.12vw]/[1.28vw] xl:px-3 xl:py-1.5 xl:text-sm/4',
                            {
                              'bg-white/12': slipType === SlipPageType.AUTO,
                            },
                          )}
                          onClick={() => {
                            setSlip(DEFAULT_SLIPPAGE_TOLERANCE);
                            setSlipType(SlipPageType.AUTO);
                          }}
                        >
                          Auto
                        </div>
                        <div
                          className={clsx(
                            'cursor-pointer px-[0.96vw] py-[0.48vw] text-[1.12vw]/[1.28vw] xl:px-3 xl:py-1.5 xl:text-sm/4',
                            {
                              'bg-white/12': slipType === SlipPageType.CUSTOM,
                            },
                          )}
                          onClick={() => setSlipType(SlipPageType.CUSTOM)}
                        >
                          Custom
                        </div>
                      </div>

                      <div className="flex h-[3.2vw] w-[9.6vw] items-center gap-[0.32vw] bg-white/10 px-[0.96vw] xl:h-10 xl:w-30 xl:gap-1 xl:px-3">
                        <input
                          className={
                            'w-[6.4vw] bg-transparent text-right text-[1.12vw]/[1.6vw] text-gray-300 xl:w-20 xl:text-sm/5'
                          }
                          placeholder="0.0"
                          value={slip}
                          autoComplete="off"
                          autoCorrect="off"
                          pattern="^[0-9]*[.,]?[0-9]*$"
                          minLength={1}
                          maxLength={79}
                          type="text"
                          inputMode="decimal"
                          spellCheck="false"
                          onChange={slipChange}
                        />
                        <div className="text-[1.28vw]/[1.6vw] xl:text-base/5">%</div>
                      </div>
                    </div>
                    <div className="mt-[0.96vw] grid grid-cols-3 gap-[0.96vw] xl:mt-3 xl:gap-3">
                      {['1', '5', '7.5'].map((item) => {
                        return (
                          <div
                            key={item}
                            className={clsx(
                              'flex-center h-[2.56vw] cursor-pointer bg-white/10 text-[1.12vw]/[1.6vw] hover:bg-white/16 xl:h-8 xl:text-sm/5',
                              {
                                'bg-white/16': Number(slip) === Number(item),
                              },
                            )}
                            onClick={() => {
                              if (item !== '0.50') {
                                setSlipType(SlipPageType.CUSTOM);
                              }
                              setSlip(item);
                            }}
                          >
                            {item}%
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              >
                <div className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer bg-white/10 hover:bg-white/16 xl:h-10 xl:w-10">
                  <SettingSVG className="w-[1.92vw] xl:w-6" />
                </div>
              </Popover>

              {slipType === SlipPageType.CUSTOM && (
                <div className="absolute -bottom-[1.92vw] right-0 text-[0.96vw]/[1.6vw] xl:-bottom-6 xl:text-xs/5">
                  {'->'} Slippage : {slip}%
                </div>
              )}
            </div>

            <div
              className={clsxm(
                'mt-[3.2vw] flex h-[3.52vw] items-center justify-between bg-white/10 pr-[0.96vw] xl:mt-10 xl:h-11 xl:pr-3',
                {
                  'bg-white/[0.04]': swapType === SwapField.Buy,
                },
              )}
            >
              {swapType === SwapField.Buy ? (
                <Tooltip
                  className="p-[1.12vw] xl:p-3.5"
                  offsetX={22}
                  placement="top-start"
                  title={
                    <div className="flex w-[22.08vw] items-start gap-[0.64vw] xl:w-[276px] xl:gap-2">
                      <div className="basis-[1.6vw] xl:basis-5">
                        <WarningSvg className="w-full" />
                      </div>
                      <div className="flex-1 text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">
                        Only input $MDBL amount to buy.
                      </div>
                    </div>
                  }
                >
                  {/* <input
                    className={
                      'max-w-[50%] flex-1 bg-transparent pl-[0.96vw] text-[1.28vw]/[1.6vw] text-yellow xl:pl-3 xl:text-base/5'
                    }
                    placeholder="0.0"
                    // disabled
                    ref={inputInRef}
                    autoComplete="off"
                    autoCorrect="off"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    minLength={1}
                    maxLength={10}
                    type="text"
                    inputMode="decimal"
                    spellCheck="false"
                    onChange={inputInChange}
                  /> */}
                  <div
                    className={clsxm(
                      'max-w-[50%] flex-1 cursor-not-allowed bg-transparent pl-[0.96vw] text-[1.28vw]/[1.6vw] text-gray-300 xl:pl-3 xl:text-base/5',
                      {
                        'text-yellow': currentInputOutput[0] && currentInputOutput[0] != 0n,
                      },
                    )}
                  >
                    {currentInputOutput[0] && currentInputOutput[0] != 0n
                      ? retainDigits(formatEther(currentInputOutput[0] ?? 0n))
                      : '0.0'}
                  </div>
                </Tooltip>
              ) : (
                <input
                  className={
                    'max-w-[50%] flex-1 bg-transparent pl-[0.96vw] text-[1.28vw]/[1.6vw] text-yellow xl:pl-3 xl:text-base/5'
                  }
                  placeholder="0.0"
                  ref={inputInRef}
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={10}
                  type="text"
                  inputMode="decimal"
                  spellCheck="false"
                  onChange={inputInChange}
                />
              )}

              {swapType === SwapField.Buy ? (
                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-1.5">
                  <div className="text-nowrap text-[1.08vw]/[1.6vw] text-gray-300 xl:text-sm/5">$M-BTC</div>
                  <img src="/svg/mbtc.svg" alt="mBtc" className="w-[1.92vw] xl:w-6" />
                  <CopySVG className="w-[1.92vw] cursor-pointer stroke-yellow xl:w-6" onClick={() => addToken('M-BTC')} />
                </div>
              ) : (
                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-1.5">
                  <div className="text-[1.28vw]/[1.6vw] text-gray-300 xl:text-base/5">$MDBL</div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.92vw] xl:w-6" />
                  <CopySVG className="w-[1.92vw] cursor-pointer stroke-yellow xl:w-6" onClick={() => addToken('MDBL')} />
                </div>
              )}
            </div>
            <div className="mt-[0.8vw] flex items-center justify-between xl:mt-2.5">
              {swapType === SwapField.Buy ? (
                <div
                  className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-blue hover:underline xl:text-sm/5"
                  onClick={() => openLink('https://merlinswap.org/trade/swap')}
                >
                  Get $M-BTC
                </div>
              ) : (
                <div />
              )}
              <div
                className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5"
                onClick={() => fillInInput()}
              >
                balance: {swapType === SwapField.Buy ? formatNumber(assetsBalance || 0n) : lessThanOneFormat(balance)}
              </div>
            </div>

            <div className="flex-center mt-[0.48vw] xl:mt-1.5">
              <SwapArrowSVG className="w-[1.92vw] xl:w-6" />
            </div>

            <div className="mt-[1.92vw] flex h-[3.52vw] items-center justify-between bg-white/10 px-[0.96vw] xl:mt-6 xl:h-11 xl:px-3">
              <input
                className={'max-w-[50%] flex-1 bg-transparent text-[1.28vw]/[1.6vw] text-yellow xl:text-base/5'}
                placeholder={swapType === SwapField.Buy ? 'Enter amount' : '0.0'}
                ref={inputOutRef}
                autoFocus={swapType === SwapField.Buy ? true : false}
                autoComplete="off"
                autoCorrect="off"
                pattern="^[0-9]*[.,]?[0-9]*$"
                minLength={1}
                maxLength={10}
                type="text"
                inputMode="decimal"
                spellCheck="false"
                onChange={inputOutChange}
              />
              {swapType === SwapField.Sell ? (
                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-1.5">
                  <div className="text-nowrap text-[1.08vw]/[1.6vw] text-gray-300 xl:text-sm/5">$M-BTC</div>
                  <img src="/svg/mbtc.svg" alt="mBtc" className="w-[1.92vw] xl:w-6" />
                  <CopySVG className="w-[1.92vw] cursor-pointer stroke-yellow xl:w-6" onClick={() => addToken('M-BTC')} />
                </div>
              ) : (
                <div className="flex items-center justify-end gap-[0.64vw] xl:gap-1.5">
                  <div className="text-[1.28vw]/[1.6vw] text-gray-300 xl:text-base/5">$MDBL</div>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.92vw] xl:w-6" />
                  <CopySVG className="w-[1.92vw] cursor-pointer stroke-yellow xl:w-6" onClick={() => addToken('MDBL')} />
                </div>
              )}
            </div>

            <div className="mt-[0.8vw] xl:mt-2.5">
              <div
                className="cursor-pointer text-right text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5"
                onClick={() => fillOutInput()}
              >
                balance: {swapType === SwapField.Buy ? lessThanOneFormat(balance) : formatNumber(assetsBalance || 0n)}
              </div>
            </div>

            <div className="relative mt-[8vw] xl:mt-25">
              <div className="absolute -top-[4.48vw] left-0 w-full xl:-top-14">
                <div className="flex justify-between">
                  <div className="text-[0.96vw]/[1.6vw] font-medium xl:text-xs/5">Price:</div>
                  <div className="flex items-center gap-[0.32vw] text-[0.96vw]/[1.6vw] font-medium text-yellow xl:gap-1 xl:text-xs/5">
                    {unitPrice ? unitPrice : '--'}
                  </div>
                </div>
                <div className="mt-[0.32vw] flex justify-between xl:mt-1">
                  <div className="text-[0.96vw]/[1.6vw] font-medium xl:text-xs/5">Price impact:</div>
                  <div className="text-[0.96vw]/[1.6vw] font-medium text-yellow xl:gap-1 xl:text-xs/5">
                    {unitPrice ? `${priceImpact}%` : '--'}
                  </div>
                </div>
              </div>

              {isMainConnected ? (
                !isMerlinChain ? (
                  <Button
                    type="yellow"
                    className="h-[3.52vw] w-full font-semibold xl:h-11"
                    onClick={() => {
                      ReactGA.event({ category: 'merlin', action: 'wrong_network' });
                      switchMainChain(ALLOW_CHAINS[0]).then();
                    }}
                  >
                    Wrong Network
                  </Button>
                ) : (
                  <Button
                    type="yellow"
                    className="h-[3.52vw] w-full font-semibold xl:h-11"
                    onClick={bugAndSell}
                    disabled={isInsufficient}
                    loading={isLoading}
                  >
                    {isInsufficient
                      ? 'Insufficient balance'
                      : swapParams?.description === 'Approve'
                        ? 'Approve'
                        : swapType === SwapField.Buy
                          ? 'Buy'
                          : 'Sell'}
                  </Button>
                )
              ) : (
                <Button
                  type="yellow"
                  className="h-[3.52vw] w-full font-semibold xl:h-11"
                  onClick={() => setWalletConnect(true)}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript React component methods for: test: 🧪 add memory leak tests
interface test____add_memory_leak_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_memory_leak_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_memory_leak_tests = () => {
  const [state, setState] = useState<test____add_memory_leak_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_memory_leak_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_memory_leak_tests');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handletest____add_memory_leak_tests
  };
};
