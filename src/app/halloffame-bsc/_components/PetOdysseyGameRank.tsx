import LoadingSvg from '@/../public/svg/loading.svg?component';
import { GameRound, RankCurrentRound } from '@/apis/types';
import RankTable from '@/components/ui/table/RankTable';
import { GameRankType, PetRarity } from '@/constants/enum';
import { useFetchGameRoundList } from '@/hooks/rank/useFetchGameRoundList';
import { useFetchMoboxGameRank } from '@/hooks/rank/useFetchMoboxGameRank';
import { useBscPetOdysseyGameRankColumns } from '@/hooks/rank/usePetOdysseyGameRankColumns';
import { useMainAccount } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ChangeRoundButton from './ChangeRoundButton';
import { useAtomValue } from 'jotai';
import { dvGameIdAtom } from '@/atoms/rank';

export default function PetOdysseyGameRank({ className, roundInfo }: { className?: string; roundInfo?: RankCurrentRound }) {
  const gameId = useAtomValue(dvGameIdAtom);
  const { data: roundList } = useFetchGameRoundList(gameId?.BSCGameId);
  const { evmAddress } = useMainAccount();
  const [currentRound, setCurrentRound] = useState<GameRound | undefined>(undefined);
  const columns = useBscPetOdysseyGameRankColumns();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchMoboxGameRank({
    type: GameRankType.PetOdyssey,
    round: currentRound?.round,
    gameId: gameId?.BSCGameId,
  });
  const { ref, inView } = useInView();
  const rankItems = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.list) {
      const res = data.pages.map((page) => page?.list).flat(1);
      if (evmAddress) {
        if (data.pages[0]?.myself) {
          return [data.pages[0]?.myself, ...res];
        }
        return [
          {
            rank: -1,
            round: 0,
            gparkUid: '',
            gparkUserAddress: evmAddress,
            gparkUserName: '',
            gparkUserAvatar: '',
            petName: '',
            petRarity: PetRarity.Common,
            petOriginalAttack: 0,
            petAttack: 0,
            recordTime: 0,
            mdblReward: '0',
            emdblReward: '0',
            mboxReward: '0',
          },
          ...res,
        ];
      } else {
        return res;
      }
    } else return [];
  }, [data?.pages, evmAddress]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    if (roundList?.list && roundList?.list.length) {
      setCurrentRound(roundList.list[roundList.list.length - 1]);
    }
  }, [roundList]);

  const roundChange = (round: GameRound) => {
    setCurrentRound(round);
  };

  useEffect(() => {
    if (currentRound) {
      refetch();
    }
  }, [currentRound]);
  return (
    <div className={clsxm('flex w-full flex-col', className)}>
      <div className="flex items-center justify-between">
        <div className="flex select-none items-center gap-[0.96vw] text-[1.28vw]/[1.44vw] xl:gap-3 xl:text-base/4.5">
          Season {currentRound?.round} :{' '}
          {currentRound
            ? `${dayjs(currentRound.startTime * 1000).format('MMM DD')} - ${dayjs(currentRound.endTime * 1000).format('MMM DD')}`
            : null}
          <ChangeRoundButton roundList={roundList?.list ?? []} currentRound={currentRound} onChange={roundChange} />
        </div>
        <p className="text-[0.96vw]/[1.6vw] font-medium xl:text-xs/5">Updated every 5 minutes</p>
      </div>
      <RankTable
        firstLineHighLight={!!evmAddress}
        loading={isLoading}
        className="mt-[0.8vw] max-h-[35.68vw] overflow-x-auto xl:mt-2.5 xl:max-h-[446px]"
        dataSource={rankItems ?? []}
        columns={columns}
        renderBottom={() => (
          <>
            {hasNextPage && (
              <div ref={ref} className="h-px text-transparent">
                {'Load More'}
              </div>
            )}
            {isFetchingNextPage && (
              <div className="flex-center mb-[3.84vw] pt-[1.28vw] xl:mb-12 xl:pt-4">
                <LoadingSvg className="h-[3.2vw] w-[3.2vw] animate-spin fill-gray-300 xl:h-10 xl:w-10" />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: docs: 📝 update deployment instructions
interface docs____update_deployment_instructionsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____update_deployment_instructionsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____update_deployment_instructions = () => {
  const [state, setState] = useState<docs____update_deployment_instructionsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____update_deployment_instructions = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____update_deployment_instructions');
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
    handledocs____update_deployment_instructions
  };
};

// TypeScript utility function: refactor: 🔧 optimize bundle size
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const refactor____optimize_bundle_size: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript internationalization: docs: 📝 add performance optimization tips
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
    docs____add_performance_optimization_tips: 'docs: 📝 add performance optimization tips',
    docs____add_performance_optimization_tips_description: 'Description for docs: 📝 add performance optimization tips'
  },
  zh: {
    docs____add_performance_optimization_tips: 'docs: 📝 add performance optimization tips',
    docs____add_performance_optimization_tips_description: 'docs: 📝 add performance optimization tips的描述'
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
