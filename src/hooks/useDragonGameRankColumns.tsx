import { DragonGameRank } from '@/apis/types';
import { clsxm, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const dragonGameRankHelper = createColumnHelper<DragonGameRank>();

export const useDragonGameRankColumns = () => {
  return useMemo(
    () => [
      dragonGameRankHelper.accessor('rank', {
        header: () => <p className="w-12 flex-grow-[1] text-center">Rank</p>,
        cell: ({ getValue }) => {
          return <p className="w-12 flex-grow-[1] text-center">{getValue()}</p>;
        },
      }),
      dragonGameRankHelper.display({
        id: 'Name',
        header: () => <p className={clsxm('w-17 flex-grow-[3] text-left')}>Name</p>,
        cell: ({ row }) => {
          const { userAddress, p12AccountInfo } = row?.original ?? {};
          const realShowName = p12AccountInfo?.showName ?? shortenAddress(userAddress);
          return <p className={clsxm('w-17 flex-grow-[3] truncate text-left')}>{realShowName}</p>;
        },
      }),
      dragonGameRankHelper.accessor('userAddress', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Address</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate')}>{shortenAddress(getValue())}</p>,
      }),
      dragonGameRankHelper.accessor('point', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Score</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate')}>{getValue()}</p>,
      }),
      dragonGameRankHelper.accessor('achievedAtTimestamp', {
        header: () => <p className={clsxm('w-17 flex-grow-[3]')}>Date</p>,
        cell: ({ getValue }) => {
          const dateStr = dayjs.unix(getValue()).format('YYYY-MM-DD HH:mm:ss');
          return <p className={clsxm('w-17 flex-grow-[3] truncate')}>{dateStr}</p>;
        },
      }),
      dragonGameRankHelper.accessor('playCount', {
        header: () => <p className={clsxm('w-17 flex-grow-[3] pr-4')}>Play Count</p>,
        cell: ({ getValue }) => <p className={clsxm('w-17 flex-grow-[3] truncate pr-4')}>{getValue()}</p>,
      }),
    ],
    [],
  );
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript React component methods for: style: 💄 add micro-interactions
interface style____add_micro_interactionsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface style____add_micro_interactionsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usestyle____add_micro_interactions = () => {
  const [state, setState] = useState<style____add_micro_interactionsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlestyle____add_micro_interactions = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/style____add_micro_interactions');
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
    handlestyle____add_micro_interactions
  };
};

// TypeScript internationalization: refactor: 🔧 optimize CSS organization
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
    refactor____optimize_CSS_organization: 'refactor: 🔧 optimize CSS organization',
    refactor____optimize_CSS_organization_description: 'Description for refactor: 🔧 optimize CSS organization'
  },
  zh: {
    refactor____optimize_CSS_organization: 'refactor: 🔧 optimize CSS organization',
    refactor____optimize_CSS_organization_description: 'refactor: 🔧 optimize CSS organization的描述'
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
