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
                  {(roundInfo?.gameRoundInfo?.[top30Key]?.emdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[top30Key].emdbl.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$eMDBL</span>
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
                   {(roundInfo?.gameRoundInfo?.[allKey]?.emdbl || 0) === 0 ? null : (
                    <p className="text-[1.28vw]/[1.6vw] font-semibold text-yellow xl:text-base/5">
                      {roundInfo?.gameRoundInfo[allKey].emdbl.toLocaleString()}
                      <span className="text-[1.12vw]/[1.6vw] xl:text-sm/5">&nbsp;$eMDBL</span>
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

// TypeScript internationalization: feat: ✨ add multi-language support (i18n)
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
    feat____add_multi_language_support__i18n_: 'feat: ✨ add multi-language support (i18n)',
    feat____add_multi_language_support__i18n__description: 'Description for feat: ✨ add multi-language support (i18n)'
  },
  zh: {
    feat____add_multi_language_support__i18n_: 'feat: ✨ add multi-language support (i18n)',
    feat____add_multi_language_support__i18n__description: 'feat: ✨ add multi-language support (i18n)的描述'
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

// TypeScript React component methods for: fix: 🐛 fix audio playback issues
interface fix____fix_audio_playback_issuesProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____fix_audio_playback_issuesState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____fix_audio_playback_issues = () => {
  const [state, setState] = useState<fix____fix_audio_playback_issuesState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____fix_audio_playback_issues = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____fix_audio_playback_issues');
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
    handlefix____fix_audio_playback_issues
  };
};

// TypeScript internationalization: style: 💄 update navigation styling
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
    style____update_navigation_styling: 'style: 💄 update navigation styling',
    style____update_navigation_styling_description: 'Description for style: 💄 update navigation styling'
  },
  zh: {
    style____update_navigation_styling: 'style: 💄 update navigation styling',
    style____update_navigation_styling_description: 'style: 💄 update navigation styling的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
