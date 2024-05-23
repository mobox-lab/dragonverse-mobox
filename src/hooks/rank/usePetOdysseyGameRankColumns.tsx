import { PetRankItem } from '@/apis/types';
import { Rarity, rarityStyles } from '@/constants/enum';
import { clsxm, formatNumber, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import AttackSvg from '@/../public/svg/attack.svg?component';
import { useMainAccount } from '../wallet';
import { parseEther } from 'viem';
import InfoSvg from '@/../public/svg/info.svg?component';
import Tooltip from '@/components/ui/tooltip';
import Decimal from 'decimal.js-light';

const moGamePetRankHelper = createColumnHelper<PetRankItem>();

export const usePetOdysseyGameRankColumns = () => {
  const { evmAddress } = useMainAccount();
  return useMemo(
    () => [
      moGamePetRankHelper.display({
        id: 'Rank',
        header: () => <p className="w-12 flex-grow pl-[1.28vw] text-left xl:pl-4">Rank</p>,
        cell: ({ row }) => {
          return (
            <p className="w-12 flex-grow pl-[1.28vw] text-left xl:pl-4">
              {row.original.rank <= 0 ? '--' : row.original.rank}
              {row.original.gparkUserAddress === evmAddress && (
                <span className="ml-[0.64vw] font-semibold text-yellow xl:ml-2">You</span>
              )}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('gparkUserName', {
        header: () => <p className={clsxm('w-17 flex-grow-[2] text-left')}>Name</p>,
        cell: ({ getValue, row }) => {
          const { gparkUserAvatar, rank } = row.original;
          return (
            <p className={clsxm('flex w-17 flex-grow-[2] items-center truncate text-left')}>
              {gparkUserAvatar ? (
                <img alt="" src={gparkUserAvatar} className="mr-[0.32vw] aspect-square h-[1.6vw] xl:mr-1 xl:h-5" />
              ) : null}
              {rank === -1 ? '--' : getValue()}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('gparkUserAddress', {
        header: () => <p className={clsxm('w-17 flex-grow-[2] pl-[0.64vw] text-left xl:pl-2')}>Address</p>,
        cell: ({ getValue }) => (
          <p className={clsxm('w-17 flex-grow-[2] truncate pl-[0.64vw] text-left xl:pl-2')}>{shortenAddress(getValue())}</p>
        ),
      }),
      moGamePetRankHelper.accessor('petName', {
        header: () => <p className={clsxm('w-17 flex-grow-[3] text-left')}>Pet Name</p>,
        cell: ({ getValue, row }) => {
          const { rank } = row.original;
          return <p className={clsxm('w-17 flex-grow-[4] truncate text-left')}>{rank === -1 ? '--' : getValue()}</p>;
        },
      }),
      moGamePetRankHelper.accessor('petRarity', {
        header: () => <p className={clsxm('w-17 flex-grow-[1] text-left')}>Quality</p>,
        cell: ({ getValue, row }) => {
          const rarity = getValue() - 1;
          const { rank } = row.original;
          return (
            <p
              className={clsxm('w-17 flex-grow-[1] truncate text-left font-medium')}
              style={{ color: rarityStyles[rarity as Rarity]?.color }}
            >
              {rank === -1 ? '--' : Rarity[rarity]}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('petOriginalAttack', {
        header: () => (
          <p className={clsxm('flex w-20 flex-grow-[4] items-center justify-end gap-[0.32vw] xl:gap-1')}>
            Original Pet ATK
            <Tooltip
              className="w-[39.28vw] xl:w-[491px]"
              title={
                <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                  <li>{'You need to have at least one pet with ATK >= 60 to enter the leaderboard.'}</li>
                  <li>ATK will be boosted based on your Buffs.</li>
                  <li>Rankings are ultimately determined by the boosted ATK.</li>
                </ul>
              }
            >
              <span className="cursor-pointer">
                <InfoSvg className="size-[1.12vw] stroke-white xl:size-3.5" />
              </span>
            </Tooltip>
          </p>
        ),
        cell: ({ getValue, row }) => {
          const { rank } = row.original;
          return (
            <p className={clsxm('w-20 flex-grow-[4] truncate')}>
              {rank === -1 ? '--' : formatNumber(parseEther((getValue() || 0).toString()), false)}
            </p>
          );
        },
      }),
      moGamePetRankHelper.accessor('petAttack', {
        header: () => (
          <p
            className={clsxm(
              'flex w-20 flex-grow-[4] items-center justify-end gap-[0.32vw] whitespace-nowrap font-semibold text-yellow xl:gap-1',
            )}
          >
            <img src="/svg/boost.svg" alt="boost" className="size-[1.6vw] xl:size-5" />
            Boosted Pet ATK
            <Tooltip
              className="w-[39.28vw] xl:w-[491px]"
              title={
                <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                  <li>{'You need to have at least one pet with ATK >= 60 to enter the leaderboard.'}</li>
                  <li>ATK will be boosted based on your Buffs.</li>
                  <li>Rankings are ultimately determined by the boosted ATK.</li>
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
                  'flex w-20 flex-grow-[4] items-center justify-end gap-1 truncate text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:text-sm/4.5',
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
        id: 'mdblReward',
        header: () => <p className={clsxm('w-17 flex-grow-[6] pr-4')}>Reward</p>,
        cell: ({ getValue, row }) => {
          const { emdblReward, mdblReward, rank } = row.original;
          return (
            <p
              className={clsxm(
                'flex w-17 flex-grow-[6] items-center justify-end truncate pr-4 text-[1.12vw]/[1.44vw] xl:text-sm/4.5',
              )}
            >
              <span className="mr-[0.32vw] text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mr-1 xl:text-sm/4">
                {rank <= 0 ? '--' : formatNumber(BigInt(emdblReward || 0), false)}
              </span>
              <img src="/svg/emdbl.svg" alt="emdbl" className="h-[1.6vw] xl:h-5" />
              <span className="mr-[0.32vw ml-[0.96vw] text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:ml-3 xl:mr-1 xl:text-sm/4">
                {rank <= 0 ? '--' : formatNumber(BigInt(mdblReward || 0), false)}
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
