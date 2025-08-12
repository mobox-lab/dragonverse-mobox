'use client';

import DetailSvg from '@/../public/svg/detail.svg?component';
import { stakeHistoryDialogOpenAtom } from '@/atoms';
import {
  StakeRedeemType,
  refetchPendingCountAtom,
  stakeAndRedeemDialogAtom,
  stakeAndRedeemTypeAtom,
  stakeBuffDialogAtom,
  stakeFirstGuideDialogAtom,
} from '@/atoms/stake';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { STORAGE_KEY } from '@/constants/storage';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useFetchStakeBuff } from '@/hooks/stake/useFetchStakeBuff';
import { useStakePendingCount } from '@/hooks/stake/useStakePendingCount';
import { useMainAccount } from '@/hooks/wallet';
import { clsxm, formatNumber } from '@/utils';
import { getLocalStorage } from '@/utils/storage';
import { useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { formatEther } from 'viem';
import ReactGA from 'react-ga4';

export default function Assets() {
  const setStakeFirstGuideDialogAtom = useSetAtom(stakeFirstGuideDialogAtom);
  const setStakeAndRedeemDialog = useSetAtom(stakeAndRedeemDialogAtom);
  const setStakeAndRedeemType = useSetAtom(stakeAndRedeemTypeAtom);
  const setStakeBuffOpen = useSetAtom(stakeBuffDialogAtom);

  const { evmAddress } = useMainAccount();
  const { accruedBalance, emdblBalance, mdblBalance, activeEmdblBalance } = useStakeContractRead();

  const { data: stakeBuff } = useFetchStakeBuff(evmAddress);
  const [eMDBL, setEMDBL] = useState<number>(0);
  const [accruedEMDBL, setAccruedEMDBL] = useState<number>(0);
  const [MDBL, setMDBL] = useState<number>(0);

  const [divEMDBLWidth, setDivEMDBLWidth] = useState('0%');
  const [divAccruedEMDBLWidth, setDivAccruedEMDBLWidth] = useState('0%');
  const [divMDBLWidth, setDivMDBLWidth] = useState('0%');

  const { data: stakePendingCount, refetch: refetchPendingCount } = useStakePendingCount();
  const setRefetchPendingCount = useSetAtom(refetchPendingCountAtom);
  useEffect(() => {
    setRefetchPendingCount(() => refetchPendingCount);
  }, [refetchPendingCount, setRefetchPendingCount]);

  useEffect(() => {
    setEMDBL(Number(formatEther(emdblBalance || 0n)));
  }, [emdblBalance]);

  useEffect(() => {
    setMDBL(Number(formatEther(mdblBalance || 0n)));
  }, [mdblBalance]);

  useEffect(() => {
    setAccruedEMDBL(Number(formatEther(accruedBalance || 0n)));
  }, [accruedBalance]);

  useEffect(() => {
    if (eMDBL === 0 && accruedEMDBL === 0 && MDBL === 0) {
      return;
    }
    const total = eMDBL + accruedEMDBL + MDBL;
    let widthEMDBL = (eMDBL / total) * 100;
    let widthAccruedEMDBL = (accruedEMDBL / total) * 100;
    let widthMDBL = (MDBL / total) * 100;

    const minPercent = 1;
    const minTotal =
      (widthEMDBL > 0 && widthEMDBL < minPercent ? minPercent : 0) +
      (widthAccruedEMDBL > 0 && widthAccruedEMDBL < minPercent ? minPercent : 0) +
      (widthMDBL > 0 && widthMDBL < minPercent ? minPercent : 0);

    const realTotal =
      (widthEMDBL >= minPercent ? eMDBL : 0) +
      (widthAccruedEMDBL >= minPercent ? accruedEMDBL : 0) +
      (widthMDBL >= minPercent ? MDBL : 0);

    widthEMDBL = widthEMDBL === 0 ? 0 : widthEMDBL >= minPercent ? (eMDBL / realTotal) * (100 - minTotal) : minPercent;
    widthAccruedEMDBL =
      widthAccruedEMDBL === 0
        ? 0
        : widthAccruedEMDBL >= minPercent
          ? (accruedEMDBL / realTotal) * (100 - minTotal)
          : minPercent;
    widthMDBL = widthMDBL === 0 ? 0 : widthMDBL >= minPercent ? (MDBL / realTotal) * (100 - minTotal) : minPercent;

    setDivEMDBLWidth(`${widthEMDBL}%`);
    setDivAccruedEMDBLWidth(`${widthAccruedEMDBL}%`);
    setDivMDBLWidth(`${widthMDBL}%`);
  }, [eMDBL, accruedEMDBL, MDBL]);

  const setDialogOpen = useSetAtom(stakeHistoryDialogOpenAtom);

  const stakeOrRedeem = useCallback(
    async (type: StakeRedeemType) => {
      ReactGA.event({ category: 'merlin', action: type });
      setStakeAndRedeemType(type);
      const isFirstStakeHaveRead = await getLocalStorage(STORAGE_KEY.FIRST_STAKE_GUIDE_HAVE_READ);
      if (isFirstStakeHaveRead) setStakeAndRedeemDialog(true);
      else setStakeFirstGuideDialogAtom(true);
    },
    [setStakeAndRedeemDialog, setStakeAndRedeemType, setStakeFirstGuideDialogAtom],
  );

  return (
    <div
      className={clsxm(
        'relative mt-[3.84vw] border border-gray-600 bg-black/60 px-[1.6vw] py-[3.84vw] backdrop-blur-sm xl:mt-12 xl:px-5 xl:py-12',
      )}
    >
      <PatternWithoutLine />
      {/* <div className="flex h-[1.6vw] w-full bg-white/10 xl:h-5">
        <div style={{ width: divEMDBLWidth }} className="relative h-full bg-gradient-percent-red">
          {divEMDBLWidth !== '0%' && (
            <div className="absolute -right-[1px] top-1/2 z-10 h-[2.24vw] -translate-y-1/2 transform border-l-[2px] border-dashed border-white xl:h-7"></div>
          )}
        </div>
        <div style={{ width: divAccruedEMDBLWidth }} className="relative h-full bg-gradient-percent-yellow">
          {divAccruedEMDBLWidth !== '0%' && (
            <div className="absolute -right-[1px] top-1/2 z-10 h-[2.24vw] -translate-y-1/2 transform border-l-[2px] border-dashed border-white xl:h-7"></div>
          )}
        </div>
        <div style={{ width: divMDBLWidth }} className="h-full bg-gradient-percent-blue"></div>
      </div> */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <div className="flex items-center">
              {/* <div className="h-[1.92vw] w-[0.96vw] bg-gradient-percent-red xl:h-6 xl:w-3"></div> */}
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Active eMDBL</div>
            </div>
            <div className="mt-[0.64vw] bg-gradient-text bg-clip-text text-[2.4vw]/[2.4vw] font-bold text-transparent xl:mt-2 xl:text-3xl/7.5">
              {formatNumber(activeEmdblBalance, false)}
            </div>
          </div>
          <div className="mx-[2.56vw] h-[3.84vw] w-[1px] bg-yellow/50 xl:mx-8 xl:h-12"></div>
          <div>
            <div className="flex items-center">
              {/* <div className="h-[1.92vw] w-[0.96vw] bg-gradient-percent-yellow xl:h-6 xl:w-3"></div> */}
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Accrued eMDBL</div>
            </div>
            <div className="mt-[0.64vw] bg-gradient-text bg-clip-text text-[2.4vw]/[2.4vw] font-bold text-transparent xl:mt-2 xl:text-3xl/7.5">
              {formatNumber(accruedBalance || 0n, false)}
            </div>
          </div>
          <div className="mx-[2.56vw] h-[3.84vw] w-[1px] bg-yellow/50 xl:mx-8 xl:h-12"></div>
          <div>
            <div className="flex items-center">
              {/* <div className="h-[1.92vw] w-[0.96vw] bg-gradient-percent-blue xl:h-6 xl:w-3"></div> */}
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">$MDBL Balance</div>
            </div>
            <div className="mt-[0.64vw] bg-gradient-text bg-clip-text text-[2.4vw]/[2.4vw] font-bold text-transparent xl:mt-2 xl:text-3xl/7.5">
              {formatNumber(mdblBalance || 0n, false)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-[1.28vw] xl:gap-4">
          <Button
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'stake_record' });
              setDialogOpen(true);
            }}
            className="flex-center relative h-[3.52vw] w-[3.52vw] overflow-visible border-none bg-white/10 xl:h-11 xl:w-11"
          >
            {stakePendingCount ? (
              <div className="flex-center flex-center absolute -right-[0.72vw] -top-[0.72vw] z-10 h-[1.44vw] min-w-[1.44vw] rounded-full bg-red-600 px-[0.32vw] text-[1.12vw]/[1.12vw] xl:-right-[9px] xl:-top-[9px] xl:h-4.5 xl:min-w-4.5 xl:px-1 xl:text-sm/3.5">
                <span className="mb-[0.08vw] xl:-mb-px">{stakePendingCount > 99 ? '99+' : stakePendingCount}</span>
              </div>
            ) : null}
            <DetailSvg className="h-[1.92vw] w-[1.92vw] xl:h-6 xl:w-6" />
          </Button>
          <Button
            onClick={() => stakeOrRedeem(StakeRedeemType.Redeem)}
            className="flex-center-[3.52vw] w-[12.8vw] border-none bg-white/10 xl:h-11 xl:w-40"
          >
            Redeem
          </Button>
          <Button
            type="yellow-dark"
            className={clsxm('h-[3.52vw] w-[12.8vw] font-semibold xl:h-11 xl:w-40')}
            onClick={() => stakeOrRedeem(StakeRedeemType.Stake)}
          >
            Stake
          </Button>
        </div>
      </div>

      <div className="relative mt-[4.8vw] grid grid-cols-2 gap-[1.6vw] xl:mt-15 xl:gap-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Yield Boosting</div>
            <div className="flex items-center">
              <div className="text-[1.92vw]/[3.52vw] font-medium text-yellow xl:text-2xl/11">
                {(stakeBuff?.totalBuff ?? 0) / 10}%
              </div>
            </div>
            {/* <div className="text-[0.96vw]/[0.96vw] text-gray-300 xl:text-xs/3">UPDATING 08:00 UTC DAILY</div> */}
          </div>
          <div className="relative ml-[7.68vw] flex h-[7.2vw] w-[22.08vw] items-center justify-between py-[1.28vw] pl-[2.4vw] pr-[1.76vw] xl:ml-24 xl:h-[90px] xl:w-[276px] xl:py-4 xl:pl-7.5 xl:pr-5.5">
            <img src="/svg/yellow-gradient-card.svg" alt="" className="absolute left-0 top-0 h-full w-full" />
            <div className="relative">
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">Dragon Ball</div>
              <div className="mt-[0.48vw] text-[1.6vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7.5">
                {(stakeBuff?.dragonBallBuff ?? 0) / 10}%
              </div>
            </div>
            <div className="relative h-[3.84vw] w-[3.84vw] xl:h-12 xl:w-12">
              <img src="/img/dragon-ball.webp" alt="dragon ball" className="h-full w-full" />
              <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                x{stakeBuff?.dragonBallCount ?? 0}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex h-[7.2vw] w-[22.08vw] items-center justify-between py-[1.28vw] pl-[2.4vw] pr-[1.76vw] xl:h-[90px] xl:w-[276px] xl:py-4 xl:pl-7.5 xl:pr-5.5">
            <img src="/svg/yellow-gradient-card.svg" alt="" className="absolute left-0 top-0 h-full w-full" />
            <div className="relative">
              <div className="text-[1.28vw]/[1.92vw] font-medium xl:text-base/6">MODragon</div>
              <div className="mt-[0.48vw] text-[1.6vw]/[2.4vw] font-medium text-yellow xl:mt-1.5 xl:text-xl/7.5">
                {(stakeBuff?.dragonTotalBuff ?? 0) / 10}%
              </div>
            </div>
            <div className="relative h-[3.84vw] w-[3.84vw] xl:h-12 xl:w-12">
              <img src="/img/modragon-nft-rare.webp" alt="modragon" className="h-full w-full" />
              <div className="black-outline absolute -right-[0.64vw] top-0 text-[1.28vw]/[1.28vw] font-medium xl:-right-2 xl:text-base/4">
                x{stakeBuff?.dragonCount ?? 0}
              </div>
            </div>
          </div>
          <Button
            type="orange"
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'boost' });
              setStakeBuffOpen(true);
            }}
            className={clsxm('h-[3.52vw] w-[12.8vw] font-semibold xl:h-11 xl:w-40')}
          >
            Boost
          </Button>
        </div>
      </div>
    </div>
  );
}

// TypeScript internationalization: test: 🧪 add load testing
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    test____add_load_testing: 'test: 🧪 add load testing',
    test____add_load_testing_description: 'Description for test: 🧪 add load testing'
  },
  zh: {
    test____add_load_testing: 'test: 🧪 add load testing',
    test____add_load_testing_description: 'test: 🧪 add load testing的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

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
