import { RewardDataItem } from '@/constants/reward';
import { clsxm } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

const LogHelper = createColumnHelper<RewardDataItem>();

export const useRewardColumns = () => {
  return useMemo(
    () => [
      LogHelper.accessor('balance', {
        header: () => (
          <p className="flex-grow-[3] pl-[1.28vw] text-left text-[0.96vw]/[2.24vw] xl:pl-4 xl:text-xs/7">$MDBL Balance</p>
        ),
        cell: ({ getValue }) => {
          return (
            <p
              className={clsxm(
                'flex-grow-[3] truncate pl-[1.28vw] text-left text-[1.12vw]/[1.92vw] font-medium text-yellow xl:pl-4 xl:text-sm/6',
              )}
            >
              {getValue()}
            </p>
          );
        },
      }),
      LogHelper.accessor('share', {
        header: () => <p className={clsxm('flex-grow-[3] text-[0.96vw]/[2.24vw] xl:text-xs/7')}>Share of Total Supply</p>,
        cell: ({ getValue }) => (
          <p className={clsxm('flex-grow-[3] truncate pr-[3.84vw] text-[1.12vw]/[1.92vw] xl:pr-12 xl:text-sm/6')}>
            {getValue()}
          </p>
        ),
      }),
      LogHelper.accessor('musicBox', {
        header: () => (
          <p
            className={clsxm(
              'flex flex-grow-[3] items-center justify-end gap-[0.32vw] text-[0.96vw]/[2.24vw] xl:gap-1 xl:text-xs/7',
            )}
          >
            <img src="/img/song-nft.webp" alt="song" className="w-[2.24vw] xl:w-7" /> M-MUSICBOX
          </p>
        ),
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'flex-grow-[3] truncate pr-[1.28vw] text-[1.12vw]/[1.92vw] font-medium text-yellow xl:pr-4 xl:text-sm/6',
            )}
          >
            {getValue()}
          </p>
        ),
      }),
      LogHelper.accessor('blueBox', {
        header: () => (
          <p
            className={clsxm(
              'flex flex-grow-[3] items-center justify-end gap-[0.32vw] pr-[1.28vw] text-[0.96vw]/[2.24vw] xl:gap-1 xl:pr-4 xl:text-xs/7',
            )}
          >
            <img src="/img/brc420.webp" alt="brc420" className="w-[2.24vw] xl:w-7 " /> M-BLUEBOX
          </p>
        ),
        cell: ({ getValue }) => (
          <p
            className={clsxm(
              'flex-grow-[3] truncate pr-[1.28vw] text-[1.12vw]/[1.92vw] font-medium text-yellow xl:pr-4 xl:text-sm/6',
            )}
          >
            {getValue()}
          </p>
        ),
      }),
    ],
    [],
  );
};

// TypeScript internationalization: refactor: 🔧 optimize network requests
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
    refactor____optimize_network_requests: 'refactor: 🔧 optimize network requests',
    refactor____optimize_network_requests_description: 'Description for refactor: 🔧 optimize network requests'
  },
  zh: {
    refactor____optimize_network_requests: 'refactor: 🔧 optimize network requests',
    refactor____optimize_network_requests_description: 'refactor: 🔧 optimize network requests的描述'
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
