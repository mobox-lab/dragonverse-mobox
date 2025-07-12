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
import Decimal from 'decimal.js-light';

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

export function useDefenseGamePointsRankColumns() {
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
                  <div className="w-53.84vw] flex items-center xl:w-[673px]">
                    <div className="h-[11.2vw] w-[13.76vw] xl:h-[140px] xl:w-[172px]">
                      <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Lineup</div>
                      <ul className="mt-[1.28vw] grid grid-cols-2 gap-y-[0.64vw] xl:mt-4 xl:gap-y-2">
                        {row.original?.details?.map((item) => {
                          const tower = towers[item as keyof typeof towers];
                          return (
                            <li key={item} className="flex items-center gap-1">
                              <img
                                src={`/svg/${attributeIcons[tower.attribute - 1]}`}
                                alt="mountain"
                                className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                              />
                              <span className="text-[0.96vw]/[1.44vw] font-semibold xl:text-xs/4.5">{tower.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="mx-[2.56vw] h-[5.12vw] w-[1px] bg-gray xl:mx-8 xl:h-[64px]"></div>
                    <div className="h-[11.2vw] w-[7.6vw] xl:h-[140px] xl:w-[95px]">
                      <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Talent</div>
                      <div className="mt-[1.28vw] flex flex-col gap-[0.64vw] xl:mt-4 xl:gap-2">
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/physical.svg"
                            alt="physical"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Physical:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.talent?.['1047'] ?? 0}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/magical.svg"
                            alt="magical"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Magical:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.talent?.['1048'] ?? 0}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img src="/svg/dragon/dura.svg" alt="dura" className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5" />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Dura:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.talent?.['1049'] ?? 0}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mx-[2.56vw] h-[5.12vw] w-[1px] bg-gray xl:mx-8 xl:h-[64px]"></div>
                    <div className="h-[11.2vw] flex-1 xl:h-[140px]">
                      <div className="text-center text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">
                        {"DragonPal's blessing"}
                      </div>
                      <div className="mt-[1.28vw] grid grid-cols-2 gap-y-[0.64vw] xl:mt-4 xl:gap-y-2">
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/bless-light.svg"
                            alt="light"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Physical:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.dragonBlessList?.[0] ?? '0%'}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/bless-dark.svg"
                            alt="dark"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Magical:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.dragonBlessList?.[1] ?? '0%'}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/bless-water.svg"
                            alt="water"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Range:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.dragonBlessList?.[2] ?? '0%'}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/bless-fire.svg"
                            alt="fire"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Decel+:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.dragonBlessList?.[3] ?? '0%'}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/bless-wood.svg"
                            alt="wood"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Dura:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.dragonBlessList?.[4] ?? '0%'}
                          </div>
                        </div>
                        <div className="flex items-center gap-[0.32vw] xl:gap-1">
                          <img
                            src="/svg/dragon/bless-earth.svg"
                            alt="earth"
                            className="h-[1.44vw] w-[1.44vw] xl:h-4.5 xl:w-4.5"
                          />
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">Atk speed:</div>
                          <div className="text-[0.96vw]/[1.44vw] font-medium xl:text-xs/4.5">
                            {row.original?.subDetail?.dragonBlessList?.[5] ?? '0%'}
                          </div>
                        </div>
                      </div>
                    </div>
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
        id: 'time',
        header: () => <p className="flex-center w-24 flex-grow-[1] text-center font-semibold">Finished Time</p>,
        cell: ({ row }) => {
          return (
            <div className="flex-center w-24 flex-grow-[1] text-center font-semibold">
              {row.original?.recordTime ? dayjs.utc(row.original.recordTime * 1000).format('YYYY/MM/DD HH:mm') + ' UTC' : '--'}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: 'Score',
        header: () => (
          <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
            Wave
            {/* <Tooltip
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
            </Tooltip> */}
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
        id: 'basicScore',
        header: () => (
          <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
            Basic Score
            <Tooltip
              title={
                <ul className="ml-[0.48vw] list-disc text-[0.96vw]/[1.6vw] font-medium xl:ml-1.5 xl:text-xs/5">
                  <li>
                    Basic Score is derived from the highest wave completed in Endless Realm. Ties are broken by completion time.
                  </li>
                </ul>
              }
            >
              <span className="ml-1 cursor-pointer">
                <InfoSvg className="size-[1.12vw] stroke-white xl:size-3.5" />
              </span>
            </Tooltip>
          </div>
        ),
        cell: ({ row }) => {
          return <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">{row.original.basicScore ?? 0}</div>;
        },
      }),
      columnHelper.display({
        id: 'boostedScore',
        header: () => (
          <div className="flex-center w-17 flex-grow-[1] text-center font-semibold text-yellow">
            Boosted Score
            {/* <Tooltip
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
            </Tooltip> */}
          </div>
        ),
        cell: ({ row }) => {
          const { buff } = row.original;
          return (
            <Tooltip
              title={
                <div className="flex min-w-[26.96vw] items-center justify-center gap-[1.92vw] xl:min-w-[337px] xl:gap-6">
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
                      <img src="/svg/dark-buff.svg" alt="mountain" className="h-[2.24vw] w-[2.24vw] xl:h-7 xl:w-7" />
                      <div className="mt-[0.32vw] text-[1.12vw]/[1.92vw] font-semibold text-yellow xl:mt-1 xl:text-sm/6">
                        {new Decimal(buff?.dark || 0).times(100).toNumber()}%
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
              <div className="flex-center w-17 flex-grow-[1] text-center font-semibold text-yellow">
                {row.original.boostedScore ?? 0}
              </div>
            </Tooltip>
          );
        },
      }),
      columnHelper.display({
        id: 'mdblReward',
        header: () => <p className="flex-center w-17 flex-grow-[1] text-center font-semibold text-yellow">Reward</p>,
        cell: ({ row }) => {
          const { emdblReward, mdblReward } = row.original;
          const mdbl = mdblReward || emdblReward || 0;

          return (
            <div className="flex-center w-17 flex-grow-[1] text-center font-semibold">
              <span className="mr-[0.32vw ml-[0.96vw] text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:ml-3 xl:mr-1 xl:text-sm/4">
                {formatNumber(parseEther(mdbl.toString()), false)}
              </span>
              <img src={mdblReward ? '/img/mdbl-in-game.png' : '/img/emdbl.webp'} alt="" className="h-[1.6vw] xl:h-5" />
            </div>
          );
        },
      }),
    ];
  }, []);
}

// TypeScript internationalization: perf: ⚡ improve search performance
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    perf____improve_search_performance: 'perf: ⚡ improve search performance',
    perf____improve_search_performance_description: 'Description for perf: ⚡ improve search performance'
  },
  zh: {
    perf____improve_search_performance: 'perf: ⚡ improve search performance',
    perf____improve_search_performance_description: 'perf: ⚡ improve search performance的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
