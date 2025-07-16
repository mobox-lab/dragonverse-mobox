import { gameRankTypeAtom, rankAtom } from '@/atoms/rank';
import { GameRankType } from '@/constants/enum';
import { clsxm, formatNumber } from '@/utils';
import { useAtom, useAtomValue } from 'jotai';
import GameRankTabActiveBorder from './GameRankTabActiveBorder';
import { RankCurrentRound } from '@/apis/types';
import ReactGA from 'react-ga4';
import { parseEther } from 'viem';
import { useEffect, useMemo, useState } from 'react';
import { TDStartSeason } from '@/constants';
import { round } from 'lodash-es';
import { useIsMounted } from '@/hooks/useIsMounted';

interface TabItem {
  label: string;
  value: GameRankType;
  icon: string;
  rewardKey: 'PetReward' | 'FightReward';
  top30Key: 'petTopReward' | 'fightTopReward' | 'defenseTopReward';
  allKey: 'petBasicReward' | 'fightBasicReward' | 'defenseBasicReward';
}

export default function GameRankTab({ className, roundInfo }: { className?: string; roundInfo?: RankCurrentRound }) {
  const [rankType, setRankType] = useAtom(gameRankTypeAtom);
  const rank = useAtomValue(rankAtom);
  const isMounted = useIsMounted();
  const tabs = useMemo(() => {
    return [
      rank && rank?.round >= TDStartSeason
        ? {
            label: 'Dragon Defense',
            value: GameRankType.Defense,
            icon: '/img/game-dragon-defense-icon.png',
            rewardKey: 'FightReward',
            top30Key: 'defenseTopReward',
            allKey: 'defenseBasicReward',
          }
        : {
            label: 'Infinite Rumble',
            value: GameRankType.Rumble,
            icon: '/img/game-infinite-ramble-icon.png',
            rewardKey: 'FightReward',
            top30Key: 'fightTopReward',
            allKey: 'fightBasicReward',
          },
      {
        label: 'Dream Pet',
        value: GameRankType.PetOdyssey,
        icon: '/img/game-pet-simulate-icon.png',
        rewardKey: 'PetReward',
        top30Key: 'petTopReward',
        allKey: 'petBasicReward',
      },
    ] as TabItem[];
  }, [rank]);

  useEffect(() => {
    if (!rank || !isMounted) return;
    setRankType(rank && rank?.round >= TDStartSeason ? GameRankType.Defense : GameRankType.Rumble);
  }, [isMounted, rank, setRankType]);

  useEffect(() => {
    if (rankType !== GameRankType.PetOdyssey) {
      setRankType(rank && rank?.round >= TDStartSeason ? GameRankType.Defense : GameRankType.Rumble);
    }
  }, [rank]);

  return (
    <div className={clsxm('grid grid-cols-2', className)}>
      {tabs.map(({ value, label, icon, rewardKey, top30Key, allKey }, index) => {
        const isActive = value === rankType;
        // const sumAllReward =
        //   (roundInfo?.gameRoundInfo?.[top30Key]?.mdbl || 0) + (roundInfo?.gameRoundInfo?.[allKey]?.mdbl || 0);
        return (
          <div
            key={value}
            className={clsxm('relative flex-grow cursor-pointer select-none flex-col bg-white/5', {
              'bg-[#4d442e]/50': isActive,
            })}
            onClick={() => {
              ReactGA.event({ category: 'merlin', action: 'game_tab', label: value });
              setRankType(value);
            }}
          >
            {isActive && <GameRankTabActiveBorder />}
            <h2
              className={clsxm(
                'flex-center gap-[0.48vw] bg-white/10 py-[0.48vw] text-[1.28vw]/[1.28vw] font-semibold xl:gap-1.5 xl:py-1.5 xl:text-base/4',
                {
                  'bg-[#4d442e]/50 text-yellow': isActive,
                },
              )}
            >
              <img src={icon} className="size-[2.4vw] xl:size-7.5" alt="" />
              {label}
              {/* <span className="text-[1.6vw]/[1.6vw] font-semibold xl:text-xl/5">
                {formatNumber(parseEther(sumAllReward.toString()))}
              </span> */}
            </h2>
            <div
              className={clsxm('flex items-center justify-center px-[1.28vw] py-[1.6vw] xl:px-5 xl:py-4', {
                'gap-[1.2vw] xl:gap-9': rewardKey === 'PetReward',
                'relative grid grid-cols-2': rewardKey === 'FightReward',
              })}
            >
              {/* <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Season {roundInfo?.gameRoundInfo.round || 1}</p>
                <p className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">{timeLeft}</p>
              </div> */}

              <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">For Top10</p>
                <div className="flex items-center justify-center gap-4">
                  {(roundInfo?.gameRoundInfo?.[top30Key]?.mdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[top30Key].mdbl.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$MDBL</span>
                    </p>
                  )}
                  {(roundInfo?.gameRoundInfo?.[top30Key as 'defenseTopReward']?.mbox || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[top30Key as 'defenseTopReward']?.mbox.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$MBOX</span>
                    </p>
                  )}
                </div>
              </div>
              {top30Key === 'fightTopReward' && (
                <div
                  className={clsxm(
                    'absolute left-1/2 top-1/2 h-[2.88vw] w-[1px] -translate-x-1/2 -translate-y-1/2 transform bg-[#4E4E50] xl:h-9',
                    {
                      'bg-[#938561]': isActive,
                    },
                  )}
                ></div>
              )}
              {top30Key === 'petTopReward' && (
                <div
                  className={clsxm('h-[2.88vw] w-[1px] bg-[#4E4E50] xl:h-9', {
                    'bg-[#938561]': isActive,
                  })}
                ></div>
              )}
              <div className="flex flex-col items-center gap-[0.64vw] xl:gap-2">
                <p className="whitespace-nowrap text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">For all including Top10</p>
                <div className="flex items-center justify-center gap-4">
                  {(roundInfo?.gameRoundInfo?.[allKey]?.mdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[allKey].mdbl.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$MDBL</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// TypeScript internationalization: test: 🧪 add database migration tests
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
    test____add_database_migration_tests: 'test: 🧪 add database migration tests',
    test____add_database_migration_tests_description: 'Description for test: 🧪 add database migration tests'
  },
  zh: {
    test____add_database_migration_tests: 'test: 🧪 add database migration tests',
    test____add_database_migration_tests_description: 'test: 🧪 add database migration tests的描述'
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

// TypeScript internationalization: refactor: 🔧 optimize image loading
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
    refactor____optimize_image_loading: 'refactor: 🔧 optimize image loading',
    refactor____optimize_image_loading_description: 'Description for refactor: 🔧 optimize image loading'
  },
  zh: {
    refactor____optimize_image_loading: 'refactor: 🔧 optimize image loading',
    refactor____optimize_image_loading_description: 'refactor: 🔧 optimize image loading的描述'
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

// TypeScript React component methods for: feat: ✨ implement TypeScript interfaces for API responses
interface feat____implement_TypeScript_interfaces_for_API_responsesProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____implement_TypeScript_interfaces_for_API_responsesState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____implement_TypeScript_interfaces_for_API_responses = () => {
  const [state, setState] = useState<feat____implement_TypeScript_interfaces_for_API_responsesState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____implement_TypeScript_interfaces_for_API_responses = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____implement_TypeScript_interfaces_for_API_responses');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlefeat____implement_TypeScript_interfaces_for_API_responses
  };
};
