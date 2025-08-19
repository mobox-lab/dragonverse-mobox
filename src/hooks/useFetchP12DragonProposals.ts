import { fetchDragonProposals } from '@/apis';
import { DragonProposalSortField } from '@/constants/enum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchP12DragonProposals = (sortField?: DragonProposalSortField) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['fetch_dragon_proposals', sortField],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      let res = await fetchDragonProposals({ sortField, page: pageParam + 1, size: 16 });
      return res?.data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.length === 16) {
        return pages.length;
      } else {
        return null;
      }
    },
  });

  return useMemo(
    () => ({ data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }),
    [data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: chore: 🔧 update SSL certificates
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
    chore____update_SSL_certificates: 'chore: 🔧 update SSL certificates',
    chore____update_SSL_certificates_description: 'Description for chore: 🔧 update SSL certificates'
  },
  zh: {
    chore____update_SSL_certificates: 'chore: 🔧 update SSL certificates',
    chore____update_SSL_certificates_description: 'chore: 🔧 update SSL certificates的描述'
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

// TypeScript internationalization: feat: ✨ add in-game marketplace
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
    feat____add_in_game_marketplace: 'feat: ✨ add in-game marketplace',
    feat____add_in_game_marketplace_description: 'Description for feat: ✨ add in-game marketplace'
  },
  zh: {
    feat____add_in_game_marketplace: 'feat: ✨ add in-game marketplace',
    feat____add_in_game_marketplace_description: 'feat: ✨ add in-game marketplace的描述'
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
