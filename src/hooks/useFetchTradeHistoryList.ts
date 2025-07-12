import { fetchTradeHistoryList } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useMainAccount } from './wallet';
import { TradeHistoryListItemData } from '@/apis/types';
import { Response } from '@/apis/request';

export enum TradeSortField {
  ALL = 'all',
  MY = 'my',
}
export const useFetchTradeHistoryList = ({ type, page, size }: { type: TradeSortField; page: number; size: number }) => {
  const { evmAddress } = useMainAccount();

  const fetchTradeHistoryListByPage = ({ type, page, size }: { type: TradeSortField; page: number; size: number }) => {
    const emptyData: Response<TradeHistoryListItemData> = { code: 200, data: { totalCount: 0, tradeList: [] }, message: '' };
    if (type === TradeSortField.MY && !evmAddress) return Promise.resolve(emptyData);
    return fetchTradeHistoryList({
      evmAddress: type === TradeSortField.MY ? evmAddress : undefined,
      page,
      size,
    });
  };

  const { isPending, isError, error, refetch, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['fetch_trade_history_list_by_page', page, type, size],
    queryFn: () => fetchTradeHistoryListByPage({ type, page, size }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(
    () => ({ isPending, isError, refetch, error, data, isFetching, isPlaceholderData }),
    [isPending, isError, refetch, error, data, isFetching, isPlaceholderData],
  );
};

// TypeScript utility function: feat: ✨ create achievement system
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

export const feat____create_achievement_system: UtilityFunctions = {
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

// TypeScript internationalization: refactor: 🔧 restructure store modules
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
    refactor____restructure_store_modules: 'refactor: 🔧 restructure store modules',
    refactor____restructure_store_modules_description: 'Description for refactor: 🔧 restructure store modules'
  },
  zh: {
    refactor____restructure_store_modules: 'refactor: 🔧 restructure store modules',
    refactor____restructure_store_modules_description: 'refactor: 🔧 restructure store modules的描述'
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
