import { clsxm } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export enum StakeType {
  REDEEM = 'Redeem',
  STAKE = 'Stake',
}
export enum StakeStatus {
  SUCCESS = 'Success',
  CANCELLED = 'Cancelled',
}
export type StakeHistoryItem = {
  time: number;
  type: StakeType; // Stake / Redeem
  status: StakeStatus; // Redemption rate
  txHash: string;
};
const stakeHistoryHelper = createColumnHelper<StakeHistoryItem>();

export const useStakeHistoryColumns = () => {
  return useMemo(
    () => [
      stakeHistoryHelper.accessor('time', {
        header: () => <p className="w-[7.68vw] flex-grow-[2] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[2] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue() * 1000).format('YYYY/MM/DD HH:mm:ss')}
            </p>
          );
        },
      }),
      stakeHistoryHelper.accessor('type', {
        header: () => <p className="w-[3.2vw] flex-grow text-left xl:w-10">Type</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[3.2vw] flex-grow text-left text-[0.96vw]/[1.44vw] font-normal xl:w-10 xl:text-xs/4.5">
              {getValue()}
            </p>
          );
        },
      }),
      stakeHistoryHelper.display({
        id: 'Amount',
        header: () => <p className="w-[3.2vw] flex-grow-[2] xl:w-10">Amount</p>,
        cell: ({ row }) => {
          return (
            <p className="flex w-[3.2vw] flex-grow-[2] items-center justify-end gap-1 text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-10 xl:text-sm/6">
              1,000 eMDBL
            </p>
          );
        },
      }),

      stakeHistoryHelper.display({
        id: 'Receive',
        header: () => <p className="w-[3.2vw] flex-grow-[2] xl:w-10">Receive</p>,
        cell: ({ row }) => {
          return (
            <p className="flex w-[3.2vw] flex-grow-[2] items-center justify-end gap-1 text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-10 xl:text-sm/6">
              3,000 $MDBL
            </p>
          );
        },
      }),
      stakeHistoryHelper.accessor('status', {
        header: () => (
          <p className={clsxm('w-[3.84vw] flex-grow-[2] whitespace-nowrap pl-[3.84vw] text-left xl:w-12 xl:pl-12')}>Status</p>
        ),
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'w-[3.84vw] flex-grow-[2] truncate pl-[3.84vw] text-left text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pl-12 xl:text-sm/4.5',
              getValue() === StakeStatus.SUCCESS ? 'text-green' : 'text-red',
            )}
          >
            {getValue()}
          </p>
        ),
      }),
      stakeHistoryHelper.accessor('txHash', {
        header: () => <p className="w-[3.84vw] flex-grow-[2] pr-[1.28vw] xl:w-12 xl:pr-4">Withdraw Tx</p>,
        cell: ({ getValue }) => {
          return (
            <p
              className={clsxm(
                'w-[3.84vw] flex-grow-[2] pr-[1.28vw] text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pr-4 xl:text-sm/4.5',
              )}
            >
              {getValue()}
            </p>
          );
        },
      }),
    ],
    [],
  );
};
