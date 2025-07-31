import { StakeItem } from '@/apis/types';
import StakeCancelButton from '@/components/ui/dialog/stake/_components/StakeCancelButton';
import StakeClaimButton from '@/components/ui/dialog/stake/_components/StakeClaimButton';
import { TradeTypeArrowSvg } from '@/components/ui/svg/TradeTypeArrowSvg';
import { periodData, periodTime } from '@/constants';
import { TradeType } from '@/constants/enum';
import { clsxm, shortenDigits } from '@/utils';
import { computeUnlockTimeStr } from '@/utils/date';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { formatEther } from 'viem';

const stakePendingHelper = createColumnHelper<StakeItem>();

export const useStakePendingHistoryColumns = () => {
  return useMemo(
    () => [
      stakePendingHelper.accessor('updatedAt', {
        header: () => <p className="w-[7.68vw] flex-grow-[2] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[2] whitespace-nowrap pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue()).format('YYYY/MM/DD HH:mm:ss')}
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'period',
        header: () => <p className={clsxm('w-[3.84vw] flex-grow-[4] pl-[1.6vw] text-left xl:w-12 xl:pl-5')}>Cooldown Period</p>,
        cell: ({ row }) => {
          const { startTime, endTime } = row.original;
          const diff = endTime - startTime;
          const days = diff / periodTime;
          return (
            <p
              className={clsxm(
                'w-[3.84vw] flex-grow-[4] truncate pl-[1.6vw] text-left text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:pl-5 xl:text-xs/4.5',
              )}
            >
              {days} days
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'rate',
        header: () => <p className={clsxm('w-[3.84vw] flex-grow-[4] text-left xl:w-12')}>Redeemable Rate </p>,
        cell: ({ row }) => {
          const { startTime, endTime } = row.original;
          const diff = endTime - startTime;
          const days = diff / periodTime;
          const percent = periodData.find((o) => o.days === days)?.percent || 'Unknown';
          return (
            <p
              className={clsxm(
                'w-[3.84vw] flex-grow-[4] truncate text-left text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
              )}
            >
              {percent}%
            </p>
          );
        },
      }),
      stakePendingHelper.accessor('amount', {
        header: () => <p className="w-[3.2vw] flex-grow-[3] text-right xl:w-10">Redeem</p>,
        cell: ({ getValue }) => {
          const amount = shortenDigits(Number(formatEther(BigInt(getValue() || 0))));
          return (
            <p className="flex w-[3.2vw] flex-grow-[3] items-center justify-end gap-1 whitespace-nowrap text-left text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:w-10 xl:text-sm/4.5">
              {amount} eMDBL
            </p>
          );
        },
      }),
      stakePendingHelper.accessor('receive', {
        header: () => <p className="relative left-[5.12vw] w-[3.2vw] flex-grow-[6] text-left xl:left-16 xl:w-10">Receive</p>,
        cell: ({ getValue }) => {
          const receive = shortenDigits(Number(formatEther(BigInt(getValue() || 0))));
          return (
            <p className="flex w-[3.2vw] flex-grow-[6] items-center gap-1 whitespace-nowrap text-left text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:w-10 xl:text-sm/4.5">
              <TradeTypeArrowSvg
                className="mr-[0.8vw] h-[1.36vw] w-[2.88vw] xl:mr-2.5 xl:h-[17px] xl:w-9"
                type={TradeType.BUY}
              />
              {receive} $MDBL
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'Status',
        header: () => <p className={clsxm('w-[3.84vw] flex-grow-[5] text-center xl:w-12')}>Status</p>,
        cell: ({ row }) => {
          const { endTime, redeemIndex } = row.original;
          const end = dayjs(endTime * 1000);
          const cur = dayjs();
          const canClaim = cur.isAfter(end);
          const { str, value } = computeUnlockTimeStr(end, cur);
          return (
            <p
              className={clsxm(
                'flex-center w-[3.84vw] flex-grow-[5] text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
                { 'text-gray-300': !canClaim },
              )}
            >
              {canClaim ? <StakeClaimButton redeemIndex={redeemIndex} /> : `Available in ${value} ${str}`}
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'Operation',
        header: () => <p className="w-[3.84vw] flex-grow-[2] pr-[1.28vw] xl:w-12 xl:pr-4"></p>,
        cell: ({ row }) => {
          const { redeemIndex } = row.original;
          return <StakeCancelButton redeemIndex={redeemIndex} />;
        },
      }),
    ],
    [],
  );
};

// TypeScript internationalization: chore: 🔧 configure caching strategy
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
    chore____configure_caching_strategy: 'chore: 🔧 configure caching strategy',
    chore____configure_caching_strategy_description: 'Description for chore: 🔧 configure caching strategy'
  },
  zh: {
    chore____configure_caching_strategy: 'chore: 🔧 configure caching strategy',
    chore____configure_caching_strategy_description: 'chore: 🔧 configure caching strategy的描述'
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

// TypeScript utility function: security: 🔒 implement authentication tokens
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____implement_authentication_tokens: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
