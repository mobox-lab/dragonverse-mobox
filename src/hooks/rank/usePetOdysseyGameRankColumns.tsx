import InfoSvg from '@/../public/svg/info.svg?component';
import { PetRankItem } from '@/apis/types';
import Tooltip from '@/components/ui/tooltip';
import { PetRarity, Rarity, petRarityStyles, rarityStyles } from '@/constants/enum';
import { clsxm, formatNumber, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import Decimal from 'decimal.js-light';
import { useMemo } from 'react';
import { parseEther } from 'viem';
import { useMainAccount } from '../wallet';

const moGamePetRankHelper = createColumnHelper<PetRankItem>();

export const usePetOdysseyGameRankColumns = () => {
  const { evmAddress } = useMainAccount();
  return useMemo(
    () => [
      moGamePetRankHelper.display({
        id: 'Rank',
        header: () => <p className="w-14 flex-grow pl-[1.28vw] text-center xl:pl-4">Rank</p>,
        cell: ({ row }) => {
          return (
            <p className="w-14 flex-grow pl-[1.28vw] text-center xl:pl-4">
              {row.original.rank <= 0 ? '--' : row.original.rank}
              {row.original.gparkUserAddress === evmAddress && (
                <span className="ml-[0.64vw] font-semibold text-yellow xl:ml-2">You</span>
              )}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('gparkUserName', {
        header: () => <p className={clsxm('w-17 flex-grow-[2] text-center')}>Name</p>,
        cell: ({ getValue, row }) => {
          const { gparkUserAvatar, rank } = row.original;
          return (
            <p className={clsxm('flex w-17 flex-grow-[2] items-center truncate text-center')}>
              {gparkUserAvatar ? (
                <img alt="" src={gparkUserAvatar} className="mr-[0.32vw] aspect-square h-[1.6vw] xl:mr-1 xl:h-5" />
              ) : null}
              {rank === -1 ? '--' : getValue()}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('gparkUserAddress', {
        header: () => <p className={clsxm('w-20 flex-grow-[2] pl-[0.64vw] text-center xl:pl-2')}>Address</p>,
        cell: ({ getValue }) => (
          <p className={clsxm('w-20 flex-grow-[2] truncate pl-[0.64vw] text-center xl:pl-2')}>{shortenAddress(getValue())}</p>
        ),
      }),
      // moGamePetRankHelper.accessor('petName', {
      //   header: () => <p className={clsxm('w-17 flex-grow-[3] text-left')}>Pet Name</p>,
      //   cell: ({ getValue, row }) => {
      //     const { rank } = row.original;
      //     return <p className={clsxm('w-17 flex-grow-[3] truncate text-left')}>{rank === -1 ? '--' : getValue()}</p>;
      //   },
      // }),
      moGamePetRankHelper.accessor('petRarity', {
        header: () => <p className={clsxm('w-17 flex-grow-[1] text-center')}>Quality</p>,
        cell: ({ getValue, row }) => {
          const rarity = getValue();
          const { rank } = row.original;
          return (
            <p
              className={clsxm('w-17 flex-grow-[1] truncate text-center font-medium')}
              style={{ color: petRarityStyles[rarity]?.color }}
            >
              {rank === -1 ? '--' : PetRarity[rarity]}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('petOriginalAttack', {
        header: () => (
          <p className={clsxm('flex w-20 flex-grow-[2] items-center justify-center gap-[0.32vw] text-center xl:gap-1')}>
            Pet Score
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
      moGamePetRankHelper.accessor('petAttack', {
        header: () => (
          <p
            className={clsxm(
              'flex w-24 flex-grow-[5] items-center justify-center gap-[0.32vw] whitespace-nowrap font-semibold text-yellow xl:gap-1',
            )}
          >
            <img src="/svg/boost.svg" alt="boost" className="size-[1.6vw] xl:size-5" />
            Boosted Pet Score
            <Tooltip
              title={
                <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                  <li>At least 1 pet with Pet Score ≥ 1 required to enter the leaderboard</li>
                  <li>Dragonpal buffs can boost Pet Score by percentage</li>
                  <li>Leaderboard rankings are determined by Boosted Pet Score</li>
                </ul>
              }
            >
              <span className="cursor-pointer">
                <InfoSvg className="size-[1.12vw] stroke-yellow xl:size-3.5" />
              </span>
            </Tooltip>
          </p>
        ),
        cell: ({ getValue, row }) => {
          const { rank, buff } = row.original;
          return (
            <Tooltip
              title={
                <div className="flex w-[26.96vw] items-center justify-center gap-[1.92vw] xl:w-[337px] xl:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="text-[0.96vw]/[2.24vw] xl:text-xs/7">Total</div>
                    <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                      {new Decimal(buff?.totalBuff || 0).times(100).toNumber()}%
                    </div>
                  </div>
                  <div className="h-[3.2vw] w-[1px] bg-yellow/50 xl:h-10"></div>
                  <div className="flex items-center gap-[1.28vw] xl:gap-4">
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/light-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(buff?.light || 0).times(100).toNumber()}%
                      </div>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/fire-buff.svg" alt="dark" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(buff?.fire || 0).times(100).toNumber()}%
                      </div>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/water-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(buff?.water || 0).times(100).toNumber()}%
                      </div>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/forest-buff.svg" alt="water" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(buff?.wood || 0).times(100).toNumber()}%
                      </div>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                      <img src="/svg/mountain-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(buff?.ground || 0).times(100).toNumber()}%
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <p
                className={clsxm(
                  'flex w-24 flex-grow-[5] items-center justify-center gap-1 truncate text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:text-sm/4.5',
                )}
              >
                {rank === -1 ? '--' : formatNumber(parseEther((getValue() || 0).toString()), false)}
                {/* <AttackSvg className="fill-yellow" /> */}
              </p>
            </Tooltip>
          );
        },
      }),
      moGamePetRankHelper.display({
        id: 'emdblReward',
        header: () => <p className={clsxm('w-20 flex-grow-[3]')}> </p>,
        cell: ({ row }) => {
          const { emdblReward, rank } = row.original;
          return (
            <div className="flex w-20 flex-grow-[3] justify-end">
              <p
                className={clsxm(
                  '-mr-[2.56vw] flex items-center justify-end truncate text-[1.12vw]/[1.44vw] xl:-mr-8 xl:text-sm/4.5',
                )}
              >
                <span className="mr-[0.32vw] text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mr-1 xl:text-sm/4">
                  9,{rank <= 0 ? '--' : formatNumber(parseEther(emdblReward ? emdblReward.toString() : '0'), false)}
                </span>
                <img src="/svg/emdbl.svg" alt="emdbl" className="h-[1.6vw] xl:h-5" />
              </p>
            </div>
          );
        },
      }),
      moGamePetRankHelper.display({
        id: 'mdblReward',
        header: () => <p className={clsxm('w-24 flex-grow-[3] pr-[1.28vw] xl:pr-4')}>Reward</p>,
        cell: ({ row }) => {
          const { mdblReward, rank } = row.original;
          return (
            <p
              className={clsxm(
                'flex w-24 flex-grow-[3] items-center justify-end truncate pr-[1.28vw] text-[1.12vw]/[1.44vw] xl:pr-4 xl:text-sm/4.5',
              )}
            >
              <span className="ml-[0.96vw] mr-[0.32vw] text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:ml-3 xl:mr-1 xl:text-sm/4">
                9,{rank <= 0 ? '--' : formatNumber(parseEther(mdblReward ? mdblReward.toString() : '0'), false)}
              </span>
              <img src="/img/mdbl.webp" alt="mdbl" className="h-[1.6vw] xl:h-5" />
            </p>
          );
        },
      }),
    ],
    [evmAddress],
  );
};
