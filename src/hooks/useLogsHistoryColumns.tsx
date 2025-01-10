import { useMemo } from 'react';
import dayjs from 'dayjs';
import { TradeHistoryItem } from '@/apis/types';
import { createColumnHelper } from '@tanstack/react-table';
import { formatNumber } from '@/utils';
import clsx from 'clsx';

const tradeHistoryHelper = createColumnHelper<TradeHistoryItem>();

const statusTextColors: Record<string, string> = {
  Succeed: 'text-green',
  Reversed: 'text-[#F13361]',
  Pending: 'text-legendary',
};

export const useLogsHistoryColumns = () => {
  return useMemo(
    () => [
      tradeHistoryHelper.accessor('createdTimestamp', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue() * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('fundAction', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">Type</p>,
        cell: ({ getValue }) => {
          const value = getValue();
          const action =
            value === 'WITHDRAW-REVERSED'
              ? 'Reversed'
              : value.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

          return (
            <p className="w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              {action}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('state', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">Status</p>,
        cell: ({ getValue }) => {
          const status = getValue();

          return (
            <p
              className={clsx(
                'w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
                statusTextColors[status] ?? '',
              )}
            >
              {status}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('amount', {
        header: () => <p className="w-[3.84vw] flex-grow-[5] pr-[1.28vw] xl:w-12 xl:pr-4">Amount</p>,
        cell: ({ getValue }) => {
          return (
            <p className="flex w-[3.84vw] flex-grow-[5] items-center justify-end pr-[1.28vw] text-right text-[1.12vw]/[1.44vw] font-medium text-yellow xl:w-12 xl:pr-4 xl:text-sm/4.5">
              {formatNumber(BigInt(getValue()))}
              <img src="/img/mdbl-in-game.png" alt="mdbl" className="ml-1 h-[1.5vw] xl:h-5" />
            </p>
          );
        },
      }),
    ],
    [],
  );
};
