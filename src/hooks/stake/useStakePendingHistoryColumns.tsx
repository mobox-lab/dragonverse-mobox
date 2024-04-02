import Button from '@/components/ui/button';
import { TradeTypeArrowSvg } from '@/components/ui/svg/TradeTypeArrowSvg';
import { TradeType } from '@/constants/enum';
import { clsxm, shortenDigits } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { formatEther } from 'viem';

export type StakePendingItem = {
  time: number;
  period: string; // 15 days ? 30 days ? enum
  rate: number; // Redemption rate
  txHash: string;
};
const stakePendingHelper = createColumnHelper<StakePendingItem>();

export const useStakePendingHistoryColumns = () => {
  return useMemo(
    () => [
      stakePendingHelper.accessor('time', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue() * 1000).format('YYYY/MM/DD HH:mm:ss')}
            </p>
          );
        },
      }),
      stakePendingHelper.accessor('period', {
        header: () => <p className={clsxm('w-[3.84vw] flex-grow text-left xl:w-12')}>Period</p>,
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'w-[3.84vw] flex-grow truncate text-left text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
            )}
          >
            {getValue()}
          </p>
        ),
      }),
      stakePendingHelper.accessor('rate', {
        header: () => <p className={clsxm('w-[3.84vw] flex-grow-[2] whitespace-nowrap text-left xl:w-12')}>Redemption rate</p>,
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'w-[3.84vw] flex-grow-[2] truncate text-left text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
            )}
          >
            {getValue()}%
          </p>
        ),
      }),

      stakePendingHelper.display({
        id: 'SwapIn',
        header: () => <p className="w-[3.2vw] flex-grow-[2.5] text-right xl:w-10">Swap in</p>,
        cell: ({ row }) => {
          return (
            <p className="flex w-[3.2vw] flex-grow-[2.5] items-center justify-end gap-1 text-left text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-10 xl:text-sm/6">
              1,000 eMDBL
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'SwapOut',
        header: () => <p className="relative left-[5.12vw] w-[3.2vw] flex-grow-[5] text-left xl:left-16 xl:w-10">Swap out</p>,
        cell: ({ row }) => {
          const assetValue = shortenDigits(Number(formatEther(BigInt(250))), 5);
          return (
            <p className="flex w-[3.2vw] flex-grow-[5] items-center gap-1 text-left text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:w-10 xl:text-sm/6">
              <TradeTypeArrowSvg
                className="mr-[1.92vw] h-[1.36vw] w-[2.88vw] xl:mr-6 xl:h-[17px] xl:w-9"
                type={TradeType.BUY}
              />
              250 $MDBL
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'Stake Tx',
        header: () => <p className={clsxm('w-[3.84vw] flex-grow-[3] text-center xl:w-12')}>Stake Tx</p>,
        cell: ({ getValue }) => {
          const isClaim = true;
          return (
            <p
              className={clsxm(
                'w-[3.84vw] flex-grow-[3] truncate text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5',
                { 'text-gray-300': !isClaim },
              )}
            >
              {isClaim ? (
                <Button
                  className="w-[7.84vw] text-[0.96vw]/[0.96vw] font-bold text-yellow xl:w-[98px] xl:text-xs/3"
                  type="yellow-dark"
                >
                  Claim
                </Button>
              ) : (
                'unlock in 5 days'
              )}
            </p>
          );
        },
      }),
      stakePendingHelper.display({
        id: 'cancel',
        header: () => <p className="w-[3.84vw] flex-grow-[2] pr-[1.28vw] xl:w-12 xl:pr-4">Withdraw Tx</p>,
        cell: ({ getValue }) => {
          const tradeType = getValue();
          return (
            <a
              href=""
              className={clsxm(
                'text-link w-[3.84vw] flex-grow-[2] pr-[1.28vw] text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pr-4 xl:text-sm/4.5',
              )}
            >
              Cancel
            </a>
          );
        },
      }),
    ],
    [],
  );
};
