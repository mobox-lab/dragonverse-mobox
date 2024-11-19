import InfoSvg from '@/../public/svg/info.svg?component';
import { DefenseRankItem } from '@/apis/types';
import Tooltip from '@/components/ui/tooltip';
import { formatNumber, shortenAddress } from '@/utils';
import { towers } from '@/utils/towers';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';
import { parseEther } from 'viem';
import { useMainAccount } from '../wallet';

dayjs.extend(utc);

const columnHelper = createColumnHelper<DefenseRankItem>();

const attributeIcons = [
  'light-buff.svg',
  'dark-buff.svg',
  'water-buff.svg',
  'fire-buff.svg',
  'forest-buff.svg',
  'mountain-buff.svg',
];

export function useDefenseGameRankColumns() {
  const { evmAddress } = useMainAccount();

  return useMemo(() => {
    return [
      columnHelper.display({
        id: 'Rank',
        header: () => (
          <p className="flex-center max-w-16 flex-grow-[1.5] pl-[1.28vw] text-center font-semibold xl:pl-4">Rank</p>
        ),
        cell: ({ row }) => {
          return (
            <p className="max-w-16 flex-grow-[1.5] whitespace-nowrap pl-[1.28vw] text-center xl:pl-4">
              {row.original.rank <= 0 ? '--' : row.original.rank}
              {row.original.gparkUserAddress === evmAddress && (
                <span className="ml-[0.64vw] font-semibold text-yellow xl:ml-2">You</span>
              )}
            </p>
          );
        },
      }),
      columnHelper.display({
        id: 'gparkUserName',
        header: () => <p className="flex-center w-17 flex-grow-[1] text-center font-semibold">Name</p>,
        cell: ({ row }) => {
          return (
            <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
              {row.original.gparkUserAvatar && (
                <img
                  className="mr-[0.32vw] aspect-square h-[1.6vw] rounded-full xl:mr-1 xl:h-5"
                  src={row.original.gparkUserAvatar}
                />
              )}
              <span>{row.original.gparkUserName || '--'}</span>
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'gparkUserAddress',
        header: () => <p className="flex-center w-17 flex-grow-[1] text-center font-semibold">Address</p>,
        cell: ({ row }) => {
          return (
            <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
              <Tooltip
                title={
                  <div className="w-[22vw]">
                    <h5 className="mb-4 text-center text-[1rem] font-bold">Endless Realm Lineup</h5>
                    <ul className="grid grid-cols-4 gap-y-2">
                      {row.original?.details?.map((item) => {
                        const tower = towers[item as keyof typeof towers];
                        return (
                          <li key={item} className="flex items-center gap-2">
                            <img
                              src={`/svg/${attributeIcons[tower.attribute - 1]}`}
                              alt="mountain"
                              className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7"
                            />
                            <span className="font-semibold">{tower.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                }
              >
                <span className="hover:text-yellow">{shortenAddress(row.original.gparkUserAddress)}</span>
              </Tooltip>
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'Score',
        header: () => (
          <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
            Best Endless Realm Score
            <Tooltip
              title={
                <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                  <li>
                    Endless Realm Best Score consists of two parts: the highest wave cleared and the completion rate of the
                    highest wave.
                  </li>
                  <li>
                    Completion rate = Total escape damage from monsters killed in this wave / Total escape damage from all
                    monsters this wave.
                  </li>
                  <li>
                    Rank is primarily determined by Endless Realm Best Score, and in the case of identical best scores, the
                    player who reached that score first ranks higher.
                  </li>
                </ul>
              }
            >
              <span className="ml-1 cursor-pointer">
                <InfoSvg className="size-[1.12vw] stroke-yellow xl:size-3.5" />
              </span>
            </Tooltip>
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
              {row.original.roundId ?? 0}({Number(row.original.finish ?? 0).toFixed(2)}s)
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'time',
        header: () => <p className="flex-center w-17 flex-grow-[1] text-center font-semibold">Finished Time</p>,
        cell: ({ row }) => {
          return (
            <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
              {row.original?.recordTime ? dayjs.utc(row.original.recordTime * 1000).format('YYYY/MM/DD HH:mm') + ' UTC' : '--'}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'mdblReward',
        header: () => <p className="flex-center w-17 flex-grow-[1] text-center font-semibold">Reward</p>,
        cell: ({ row }) => {
          return (
            <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
              <span className="mr-[0.32vw ml-[0.96vw] text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:ml-3 xl:mr-1 xl:text-sm/4">
                {formatNumber(parseEther(row.original.mdblReward.toString()), false)}
              </span>
              <img src="/svg/mdbl-in-game.svg" className="h-[1.6vw] xl:h-5" />
            </div>
          );
        },
      }),
    ];
  }, []);
}
