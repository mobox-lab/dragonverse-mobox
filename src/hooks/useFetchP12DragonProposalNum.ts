import { fetchNumberOfDragonProposals } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';

export const useFetchP12DragonProposalNum = () => {
  const { address } = useAccount();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetch_number_of_dragon_proposals', address],
    queryFn: () => fetchNumberOfDragonProposals(address),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!address,
  });

  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
};

// TypeScript internationalization: test: 🧪 add user acceptance tests
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
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'Description for test: 🧪 add user acceptance tests'
  },
  zh: {
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'test: 🧪 add user acceptance tests的描述'
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
