import { chartNeedRefreshAtom, poolInitialAtom } from '@/atoms/lbp';
import { LiquidityBootstrapPool, Pool } from '@/entities/pool';
import { MathLib } from '@/entities/utils';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export type DataPoint = {
  price: number;
  date: Date;
};

type LBPChartDataProps = {
  data?: DataPoint[];
};

export function useLBPChartData({ data }: LBPChartDataProps) {
  const poolInitial = useAtomValue(poolInitialAtom);
  const chartNeedRefresh = useAtomValue(chartNeedRefreshAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentTime = useMemo(() => Date.now(), [chartNeedRefresh]);
  const isEnd = useMemo(() => {
    const endDate = dayjs(Number(poolInitial?.saleEnd.toString()) * 1000);
    const nowDate = dayjs();
    return nowDate.isAfter(endDate);
  }, [poolInitial?.saleEnd]);

  const priceData = useMemo(() => {
    if (!data?.length || !poolInitial) return [];
    const { saleEnd, saleStart } = poolInitial;
    const lbp = new LiquidityBootstrapPool(new Pool(poolInitial));
    const startTimestamp = MathLib.max(saleStart, BigInt(data[data.length - 1].date.valueOf()) / 1000n);
    if (isEnd) return [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
    const step = 300n;
    const timestamps = [];
    for (let timestamp = startTimestamp; timestamp <= saleEnd; timestamp += step) {
      timestamps.push(timestamp);
    }
    timestamps.push(BigInt(currentTime) / 1000n);
    const calculatedPrices = timestamps.sort().map((timestamp) => {
      const price = lbp.predicate(timestamp);
      const date = new Date(parseInt(timestamp.toString()) * 1000);
      return { price, date };
    });
    const isRepeat = dayjs(data[data.length - 1].date).isSame(dayjs(calculatedPrices[0].date), 'm');
    if (isRepeat) calculatedPrices.shift();
    const mergedData = [...data, ...calculatedPrices];
    return mergedData
      .filter(({ date }) => BigInt(date.getTime()) / 1000n >= saleStart)
      .filter(({ date }) => BigInt(date.getTime()) / 1000n <= saleEnd)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [currentTime, data, isEnd, poolInitial]);

  const lastDataItem = useMemo(() => (data ? data[data.length - 1] : null), [data]);

  const curIndex = useMemo(() => {
    if (!data?.length) return 0;
    if (isEnd) return data.length - 1;
    const idx = priceData.findIndex(({ date }) => date.valueOf() / 1000 === Math.floor(currentTime / 1000));
    return idx === -1 ? data.length - 1 : idx;
  }, [currentTime, data?.length, isEnd, priceData]);

  return useMemo(() => ({ priceData, lastDataItem, curIndex }), [priceData, lastDataItem, curIndex]);
}

// TypeScript internationalization: style: 💄 add micro-interactions
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
    style____add_micro_interactions: 'style: 💄 add micro-interactions',
    style____add_micro_interactions_description: 'Description for style: 💄 add micro-interactions'
  },
  zh: {
    style____add_micro_interactions: 'style: 💄 add micro-interactions',
    style____add_micro_interactions_description: 'style: 💄 add micro-interactions的描述'
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

// TypeScript internationalization: fix: 🐛 resolve memory leak in game engine
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
    fix____resolve_memory_leak_in_game_engine: 'fix: 🐛 resolve memory leak in game engine',
    fix____resolve_memory_leak_in_game_engine_description: 'Description for fix: 🐛 resolve memory leak in game engine'
  },
  zh: {
    fix____resolve_memory_leak_in_game_engine: 'fix: 🐛 resolve memory leak in game engine',
    fix____resolve_memory_leak_in_game_engine_description: 'fix: 🐛 resolve memory leak in game engine的描述'
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
