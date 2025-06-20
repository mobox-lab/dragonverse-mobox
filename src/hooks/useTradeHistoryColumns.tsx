import { TradeHistoryListItem } from '@/apis/types';
import { latestBTCPriceAtom } from '@/atoms/lbp';
import { TradeTypeArrowSvg } from '@/components/ui/svg/TradeTypeArrowSvg';
import { TradeType } from '@/constants/enum';
import { clsxm, shortenAddress, shortenDigits } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { formatEther } from 'viem';

const tradeHistoryHelper = createColumnHelper<TradeHistoryListItem>();

export const useTradeHistoryColumns = () => {
  const latestBTCPrice = useAtomValue(latestBTCPriceAtom);

  return useMemo(
    () => [
      tradeHistoryHelper.accessor('blockTimestamp', {
        header: () => <p className="w-[7.68vw] flex-grow-[4] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[4] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue() * 1000).format('MMM D, YYYY - HH:mm [GMT]Z')}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('price', {
        header: () => <p className="w-[3.84vw] flex-grow-[2] pr-[3.84vw] text-right xl:w-12 xl:pr-12">Token Price</p>,
        cell: ({ getValue }) => {
          const price = Number(formatEther(BigInt(getValue()))) * latestBTCPrice.floatValue;
          return (
            <p className="w-[3.84vw] flex-grow-[2] pr-[3.84vw] text-right text-[1.12vw]/[1.44vw] font-medium text-yellow xl:w-12 xl:pr-12 xl:text-sm/4.5">
              {'$' + shortenDigits(price, 5)}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('evmAddress', {
        header: () => <p className="w-[3.84vw] flex-grow-[2] text-center xl:w-12">Address</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.84vw] flex-grow-[2] text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              {shortenAddress(getValue())}
            </p>
          );
        },
      }),
      tradeHistoryHelper.display({
        id: 'SwapIn',
        header: () => <p className="w-[3.2vw] flex-grow-[2.5] text-right xl:w-10">Swap in</p>,
        cell: ({ row }) => {
          const { shares, assets, tradeType } = row.original;
          const shareValue = shortenDigits(Number(formatEther(BigInt(shares))), 5);
          const assetValue = shortenDigits(Number(formatEther(BigInt(assets))), 5);
          return (
            <p className="flex w-[3.2vw] flex-grow-[2.5] items-center justify-end gap-1 text-left text-yellow xl:w-10">
              {tradeType === TradeType.BUY ? (
                <>
                  <img src="/svg/mbtc.svg" alt="mBtc" className="w-[1.92vw] xl:w-5" />
                  {assetValue}
                </>
              ) : (
                <>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
                  {shareValue}
                </>
              )}
            </p>
          );
        },
      }),
      tradeHistoryHelper.display({
        id: 'SwapOut',
        header: () => <p className="relative left-[5.12vw] w-[3.2vw] flex-grow-[4] text-left xl:left-16 xl:w-10">Swap out</p>,
        cell: ({ row }) => {
          const { shares, assets, tradeType } = row.original;
          const shareValue = shortenDigits(Number(formatEther(BigInt(shares))), 5);
          const assetValue = shortenDigits(Number(formatEther(BigInt(assets))), 5);
          return (
            <p className="flex w-[3.2vw] flex-grow-[4] items-center gap-1 text-left text-yellow xl:w-10">
              <TradeTypeArrowSvg className="mr-[1.92vw] h-[1.36vw] w-[2.88vw] xl:mr-6 xl:h-[17px] xl:w-9" type={tradeType} />
              {tradeType === TradeType.BUY ? (
                <>
                  <img src="/img/mdbl.webp" alt="mdbl" className="w-[1.6vw] xl:w-5" />
                  {shareValue}
                </>
              ) : (
                <>
                  <img src="/svg/mbtc.svg" alt="mBtc" className="w-[1.92vw] xl:w-5" />
                  {assetValue}
                </>
              )}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('tradeType', {
        header: () => <p className="w-[3.84vw] flex-grow pr-[1.28vw] xl:w-12 xl:pr-4">Type</p>,
        cell: ({ getValue }) => {
          const tradeType = getValue();
          return (
            <p
              className={clsxm(
                'w-[3.84vw] flex-grow pr-[1.28vw] text-[1.12vw]/[1.44vw] font-medium xl:w-12 xl:pr-4 xl:text-sm/4.5',
                tradeType === TradeType.BUY ? 'text-green' : 'text-red',
              )}
            >
              {tradeType === TradeType.BUY ? 'BUY' : 'SELL'}
            </p>
          );
        },
      }),
    ],
    [latestBTCPrice],
  );
};

// TypeScript utility function: feat: ✨ add voice chat integration
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

export const feat____add_voice_chat_integration: UtilityFunctions = {
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
