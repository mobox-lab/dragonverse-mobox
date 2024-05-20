import { TradeHistoryListItem } from '@/apis/types';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const tradeHistoryHelper = createColumnHelper<TradeHistoryListItem>();

export const useLogsHistoryColumns = () => {
  return useMemo(
    () => [
      tradeHistoryHelper.accessor('blockTimestamp', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue() * 1000).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('evmAddress', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">All</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              Withdraw
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('tradeType', {
        header: () => <p className="w-[3.84vw] flex-grow-[5] pr-[1.28vw] xl:w-12 xl:pr-4">Amount</p>,
        cell: ({ getValue }) => {
          const tradeType = getValue();
          return (
            <p className="w-[3.84vw] flex-grow-[5] pr-[1.28vw] text-right text-[1.12vw]/[1.44vw] font-medium text-yellow xl:w-12 xl:pr-4 xl:text-sm/4.5">
              1314149 $MDBL
            </p>
          );
        },
      }),
    ],
    [],
  );
};
