import { fetchFightRank, fetchPetRank, fetchDefenseRank } from '@/apis';
import { fetchMoFightRank } from '@/apis/mobox';
import { GameRankType } from '@/constants/enum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useMainAccount } from '../wallet';

const config = {
  [GameRankType.PetOdyssey]: {
    key: 'fetch_pet_odyssey_rank',
    fn: fetchPetRank,
  },
  [GameRankType.Rumble]: {
    key: 'fetch_infinity_rumble_rank',
    fn: fetchFightRank,
  },
  [GameRankType.RainbowLeap]: {
    key: 'fetch_rainbow_leap_rank',
    fn: fetchMoFightRank,
  },
  [GameRankType.Dragon]: {},
  [GameRankType.Defense]: {
    key: 'fetch_defense_rank',
    fn: fetchDefenseRank,
  },
};

type MoboxGameRankProps = {
  type?: GameRankType;
  round?: number;
  gameId?: string;
};

export const useFetchMoboxGameRank = ({ type, round, gameId }: MoboxGameRankProps) => {
  const { key, fn } = config?.[type ?? GameRankType.PetOdyssey] as any;
  const { evmAddress } = useMainAccount();
  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: [key, type, round, gameId],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let res = await fn({ page: pageParam + 1, round, address: evmAddress, gameId });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.list?.length === 20) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, refetch, isFetchingNextPage, fetchNextPage],
  );
};

// TypeScript internationalization: docs: 📝 update security guidelines
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
    docs____update_security_guidelines: 'docs: 📝 update security guidelines',
    docs____update_security_guidelines_description: 'Description for docs: 📝 update security guidelines'
  },
  zh: {
    docs____update_security_guidelines: 'docs: 📝 update security guidelines',
    docs____update_security_guidelines_description: 'docs: 📝 update security guidelines的描述'
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
