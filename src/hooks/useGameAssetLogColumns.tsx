import { useMemo } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { createColumnHelper } from '@tanstack/react-table';
import { DragonPalConfigList, GameAssetLogItem } from '@/apis/types';
import {
  GAME_ASSET_ACTION_TEXT,
  ADDITIONAL_ACTIONS,
  GameAssetID,
  GAME_ASSETS_ID,
  GAME_ASSET_ICONS,
  ASSET_USE_GAME,
  GAME_ICONS,
} from '@/constants/gameAssets';
import { useFetchBuffData } from './rank/useFetchBuffData';
import { formatEther } from 'viem';
import { shortenDigits } from '@/utils';

const tradeHistoryHelper = createColumnHelper<GameAssetLogItem>();

export const useGameAssetLogColumns = (assetID: GameAssetID) => {
  const { data } = useFetchBuffData();
  const dragonPalConfig = useMemo(() => {
    return data?.dragonPalConfigList?.reduce(
      (data, item) => ({ ...data, [item.id]: item }),
      {} as Record<number, DragonPalConfigList>,
    );
  }, [data]);

  return useMemo(
    () => [
      tradeHistoryHelper.accessor('time', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Time</p>,
        cell: ({ getValue }) => {
          return (
            <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {dayjs(getValue()).format('YYYY-MM-DD HH:mm')}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('fundAmount', {
        header: () => <p className="w-[7.68vw] flex-grow-[3] pl-[1.28vw] text-left xl:w-24 xl:pl-4">Price</p>,
        cell: ({ getValue }) => {
          return (
            <p className="flex w-[7.68vw] flex-grow-[3] items-center pl-[1.28vw] text-left align-middle text-[0.96vw]/[1.44vw] font-normal text-yellow xl:w-24 xl:pl-4 xl:text-xs/4.5">
              {getValue() ? shortenDigits(Number(formatEther(BigInt(getValue() || '0'))), 2) : '--'}
              {getValue() ? (
                <img src="/img/mdbl-in-game.png" className="ml-[0.32vw] h-[0.96vw] xl:ml-1 xl:h-3" alt="mdbl" />
              ) : null}
            </p>
          );
        },
      }),
      tradeHistoryHelper.accessor('action', {
        header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-12">Action</p>,
        cell: ({ getValue }) => {
          const value = getValue();

          return (
            <p className="w-[3.84vw] flex-grow text-center text-[0.96vw]/[1.44vw] font-normal xl:w-12 xl:text-xs/4.5">
              {value === 10001 && assetID == GAME_ASSETS_ID.CaptureBall ? 'Capture' : GAME_ASSET_ACTION_TEXT[value] || '-'}
            </p>
          );
        },
      }),
      assetID === GAME_ASSETS_ID.CaptureBall
        ? tradeHistoryHelper.accessor('dragonPalId', {
            header: () => <p className="w-[10vw] flex-grow text-center xl:w-35">Result</p>,
            cell: ({ getValue, row }) => {
              const id = getValue();
              const config = dragonPalConfig?.[id];

              return (
                <p className="flex w-[10vw] flex-grow items-center justify-center text-center text-[0.96vw]/[1.44vw] font-normal xl:w-35 xl:text-xs/4.5">
                  {config ? (
                    <>
                      <img src={config?.avatarUrl} className="mr-[0.3vw] size-[1.2vw]" />
                      <span className="text-left">{config.name ?? '-'}</span>
                    </>
                  ) : row?.original?.action === 10001 ? (
                    <span className="text-red">Miss</span>
                  ) : (
                    <span className="text-green">Succeed</span>
                  )}
                </p>
              );
            },
          })
        : tradeHistoryHelper.accessor('sourceId', {
            header: () => <p className="w-[3.84vw] flex-grow text-center xl:w-24">Game</p>,
            cell: ({ getValue, row }) => {
              const value = getValue();

              return (
                <p className="flex w-[6.7vw] flex-grow items-center justify-center text-center text-[0.96vw]/[1.44vw] font-normal xl:w-25 xl:text-xs/4.5">
                  {GAME_ICONS[value] && <img src={GAME_ICONS[value]} className="mr-[0.5vw] w-[2vw] xl:mr-2 xl:w-5" />}
                  {row?.original?.action === 10001 && value ? ASSET_USE_GAME[value] : '-'}
                </p>
              );
            },
          }),
      tradeHistoryHelper.accessor('amount', {
        header: () => <p className="w-[3.84vw] flex-grow-[1] pr-[1.28vw] xl:w-12 xl:pr-4">Amount</p>,
        cell: ({ getValue, row }) => {
          const isAdd = ADDITIONAL_ACTIONS.includes(row.original.action);

          return (
            <p
              className={clsx(
                'flex w-[3.84vw] flex-grow-[1] items-center justify-end pr-[1.28vw] text-right text-[1.12vw]/[1.44vw] font-medium leading-none xl:w-12 xl:pr-4 xl:text-sm/4.5',
                isAdd ? 'text-green' : 'text-red',
              )}
            >
              {isAdd ? '+' : assetID == GAME_ASSETS_ID.CaptureBall ? '-' : ''}
              {getValue()}
              <img src={GAME_ASSET_ICONS[assetID]} className="ml-[0.3vw] h-[1.2vw]" />
            </p>
          );
        },
      }),
    ],
    [assetID, dragonPalConfig],
  );
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
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
