import { DragonGameRank } from '@/apis/types';
import { clsxm, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const dragonGameRankHelper = createColumnHelper<DragonGameRank>();

export const useDragonGameRankColumns = () => {
  return useMemo(
    () => [
      dragonGameRankHelper.accessor('rank', {
        header: () => <p className="w-12 flex-grow-[1] text-center">Rank</p>,
        cell: ({ getValue }) => {
          return <p className="w-12 flex-grow-[1] text-center">{getValue()}</p>;
        },
      }),
      dragonGameRankHelper.display({
        id: 'Name',
        header: () => <p className={clsxm('w-17 flex-grow-[3] text-left')}>Name</p>,
        cell: ({ row }) => {
          const { userAddress, p12AccountInfo } = row?.original ?? {};
          const realShowName = p12AccountInfo?.showName ?? shortenAddress(userAddress);
          return <p className={clsxm('w-17 flex-grow-[3] truncate text-left')}>{realShowName}</p>;
        },
      }),
      dragonGameRankHelper.accessor('userAddress', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Address</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate')}>{shortenAddress(getValue())}</p>,
      }),
      dragonGameRankHelper.accessor('point', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Score</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate')}>{getValue()}</p>,
      }),
      dragonGameRankHelper.accessor('achievedAtTimestamp', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Date</p>,
        cell: ({ getValue }) => {
          const dateStr = dayjs.unix(getValue()).format('YYYY-MM-DD HH:mm:ss');
          return <p className={clsxm('w-17 flex-grow-[3] truncate')}>{dateStr}</p>;
        },
      }),
      dragonGameRankHelper.accessor('playCount', {
        header: () => <p className={clsxm('w-17 flex-grow-[3] pr-4')}>Play Count</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate pr-4')}>{getValue()}</p>,
      }),
    ],
    [],
  );
};
