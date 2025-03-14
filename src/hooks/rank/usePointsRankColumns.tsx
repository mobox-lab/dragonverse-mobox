import InfoSvg from '@/../public/svg/info.svg?component';
import { PointsRankItem } from '@/apis/types';
import Tooltip from '@/components/ui/tooltip';
import { clsxm, formatNumber, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import Decimal from 'decimal.js-light';
import { useMemo } from 'react';
import { parseEther } from 'viem';
import { useMainAccount } from '../wallet';

const pointsRankHelper = createColumnHelper<PointsRankItem>();

export const usePointsRankColumns = (round?: number) => {
  const { evmAddress } = useMainAccount();
  return useMemo(() => {
    const columns = [
      pointsRankHelper.display({
        id: 'Rank',
        header: () => <p className="flex-center w-14 flex-grow-[1] pl-[1.28vw] text-center font-semibold xl:pl-4">Rank</p>,
        cell: ({ row }) => {
          return (
            <p className="w-14 flex-grow-[1] pl-[1.28vw] text-center xl:pl-4">
              {row.original.rank <= 0 ? '--' : row.original.rank}
              {row.original.gparkUserAddress === evmAddress && (
                <span className="ml-[0.64vw] font-semibold text-yellow xl:ml-2">You</span>
              )}
            </p>
          );
        },
      }),
      pointsRankHelper.accessor('gparkUserName', {
        header: () => <p className={clsxm('flex-center w-18 flex-grow-[2] text-center font-semibold')}>Name</p>,
        cell: ({ getValue, row }) => {
          const { gparkUserAvatar, rank } = row.original;
          return (
            <p className={clsxm('flex w-18 flex-grow-[2] items-center justify-center truncate text-center')}>
              {gparkUserAvatar ? (
                <img alt="" src={gparkUserAvatar} className="mr-[0.32vw] aspect-square h-[1.6vw] xl:mr-1 xl:h-5" />
              ) : null}
              {rank === -1 ? '--' : getValue()}
            </p>
          );
        },
      }),
      pointsRankHelper.accessor('gparkUserAddress', {
        header: () => (
          <p className={clsxm('flex-center w-20 flex-grow-[2] pl-[0.64vw] text-center font-semibold xl:pl-2')}>Address</p>
        ),
        cell: ({ getValue }) => (
          <p className={clsxm('w-20 flex-grow-[2] truncate pl-[0.64vw] text-center xl:pl-2')}>{shortenAddress(getValue())}</p>
        ),
      }),
      pointsRankHelper.accessor('petPoint', {
        header: () => (
          <p
            className={clsxm(
              'flex w-20 flex-grow-[2] items-center justify-center gap-[0.32vw] text-center font-semibold xl:gap-1',
            )}
          >
            Pet Simulation Points
          </p>
        ),
        cell: ({ getValue, row }) => {
          const { rank } = row.original;
          return (
            <p className={clsxm('w-20 flex-grow-[2] text-center')}>
              {rank === -1 ? '--' : formatNumber(parseEther((getValue() || 0).toString()), false)}
            </p>
          );
        },
      }),
      pointsRankHelper.accessor('defensePoint', {
        header: () => (
          <p
            className={clsxm(
              'flex w-20 flex-grow-[2] items-center justify-center gap-[0.32vw] text-center font-semibold xl:gap-1',
            )}
          >
            Dragon Defense Points
          </p>
        ),
        cell: ({ getValue, row }) => {
          const { rank } = row.original;
          return (
            <p className={clsxm('w-20 flex-grow-[2] text-center')}>
              {rank === -1 ? '--' : formatNumber(parseEther((getValue() || 0).toString()), false)}
            </p>
          );
        },
      }),
      pointsRankHelper.accessor('totalPoint', {
        header: () => (
          <div className={clsxm('relative w-24 flex-grow-[5] overflow-visible whitespace-nowrap')}>
            <div className="absolute inset-0 flex w-full items-center justify-end gap-[0.32vw] pr-[0.96vw] text-center font-semibold text-yellow xl:gap-1 xl:pr-3">
              <img src="/svg/boost.svg" alt="boost" className="size-[1.6vw] xl:size-5" />
              Total Points
              <Tooltip
                title={
                  <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                    <li>TODO</li>
                  </ul>
                }
              >
                <span className="cursor-pointer">
                  <InfoSvg className="size-[1.12vw] stroke-yellow xl:size-3.5" />
                </span>
              </Tooltip>
            </div>
          </div>
        ),
        cell: ({ getValue, row }) => {
          const { rank } = row.original;
          return (
            <p
              className={clsxm(
                'flex w-24 flex-grow-[5] items-center justify-end gap-1 truncate pr-[0.96vw] text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:pr-3 xl:text-sm/4.5',
              )}
            >
              {rank === -1 ? '--' : formatNumber(parseEther((getValue() || 0).toString()), false)}
              <img src="/img/points.webp" alt="points" className="w-[1.6vw] xl:w-5" />
            </p>
          );
        },
      }),
    ];

    return columns;
  }, [round, evmAddress]);
};
