import { LogItem } from '@/apis/types';
import { clsxm, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const LogHelper = createColumnHelper<LogItem>();

export const useLogsColumns = () => {
  return useMemo(
    () => [
      LogHelper.accessor('ts', {
        header: () => <p className="flex-grow-[1] text-center">Date</p>,
        cell: ({ getValue }) => {
          const dateStr = dayjs.unix(getValue()).format('YYYY-MM-DD HH:mm:ss');
          return <p className={clsxm('flex-grow-[3] truncate')}>{dateStr}</p>;
        },
      }),
      LogHelper.accessor('action', {
        header: () => <p className={clsxm('flex-grow-[3]')}>Type</p>,
        cell: ({ getValue }) => <p className={clsxm('flex-grow-[3] truncate')}>{shortenAddress(getValue().toString())}</p>,
      }),
      LogHelper.accessor('amount', {
        header: () => <p className={clsxm('flex-grow-[3]')}>Amount</p>,
        cell: ({ getValue }) => <p className={clsxm('flex-grow-[3] truncate')}>{shortenAddress(getValue())}</p>,
      }),
    ],
    [],
  );
};
