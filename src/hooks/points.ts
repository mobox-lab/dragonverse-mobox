import { fetchPointsRank, fetchTotalPoints, fetchTotalSpend } from '@/apis';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMainAccount } from './wallet';
import { useMemo } from 'react';

export function useFetchTotalPoints({ round, gameId }: { round?: number; gameId?: string }) {
  return useQuery({
    queryKey: ['fetch_total_points', round, gameId],
    queryFn: () => fetchTotalPoints({ round, gameId }),
    select: (res) => (res.code === 200 ? res.data : { totalPoints: 0 }),
  });
}

export function useFetchTotalSpend({ round, gameId }: { round?: number; gameId: string }) {
  return useQuery({
    queryKey: ['fetch_total_spend', round, gameId],
    queryFn: () => fetchTotalSpend({ round, gameId }),
    select: (res) => (res.code === 200 ? res.data : { roundSpending: '0' }),
  });
}

export const useFetchPointsRank = ({ round, gameId }: { round?: number; gameId: string }) => {
  const { evmAddress } = useMainAccount();
  const { data, isLoading, hasNextPage, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_points_rank', round, gameId],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      let res = await fetchPointsRank({ page: pageParam + 1, round, address: evmAddress, gameId });
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

// TypeScript internationalization: perf: ⚡ optimize database connections
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
    perf____optimize_database_connections: 'perf: ⚡ optimize database connections',
    perf____optimize_database_connections_description: 'Description for perf: ⚡ optimize database connections'
  },
  zh: {
    perf____optimize_database_connections: 'perf: ⚡ optimize database connections',
    perf____optimize_database_connections_description: 'perf: ⚡ optimize database connections的描述'
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

// TypeScript internationalization: chore: 🔧 configure rate limiting
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
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'Description for chore: 🔧 configure rate limiting'
  },
  zh: {
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'chore: 🔧 configure rate limiting的描述'
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
