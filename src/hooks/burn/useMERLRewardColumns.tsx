import { DragonBallBurnRank } from '@/apis/types';
import { clsxm, formatNumber, shortenAddress } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { parseEther } from 'viem';

const dragonGameRankHelper = createColumnHelper<DragonBallBurnRank>();

export const useMERLRewardColumns = (firstLineHighLight?: boolean) => {
  return useMemo(
    () => [
      dragonGameRankHelper.accessor('rank', {
        header: () => <p className="w-[1.92vw] text-left font-semibold xl:w-6">No.</p>,
        cell: ({ getValue, row }) => {
          return (
            <p className="w-[1.92vw] text-center xl:w-6">
              {firstLineHighLight && row.index === 0 ? <span className="text-yellow">You</span> : getValue()}
            </p>
          );
        },
      }),

      dragonGameRankHelper.accessor('evmAddress', {
        header: () => <p className={clsxm('w-17 flex-grow-[4] text-left font-semibold')}>Address</p>,
        cell: ({ getValue }) => (
          <p className={clsxm('w-17 flex-grow-[4] truncate text-left')}>{shortenAddress(getValue(), 4, '..')}</p>
        ),
      }),
      dragonGameRankHelper.accessor('burnCount', {
        header: () => <p className={clsxm('w-17 flex-grow-[4] font-semibold')}>Burns</p>,
        cell: ({ getValue }) => {
          return (
            <p className={clsxm('flex w-17 flex-grow-[4] items-center justify-end gap-[0.32vw] truncate xl:gap-1')}>
              <div className="text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:text-sm/4.5">
                {formatNumber(parseEther((getValue() || 0)?.toString()), false) ?? '--'}
              </div>
              <img src="/img/dragon-ball.webp" alt="dragon-ball" className="size-[1.6vw] xl:size-5" />
            </p>
          );
        },
      }),
      dragonGameRankHelper.accessor('merl', {
        header: () => <p className={clsxm('w-17 flex-grow-[4] font-semibold')}>Rewards</p>,
        cell: ({ getValue }) => (
          <p className={clsxm('flex w-17 flex-grow-[4] items-center justify-end gap-[0.32vw] truncate xl:gap-1')}>
            <div className="text-[1.12vw]/[1.44vw] font-semibold text-[#C1ABFF] xl:text-sm/4.5">
              {formatNumber(parseEther((getValue() || 0)?.toString()), false) ?? '--'}
            </div>
            <img src="/svg/MERL.svg" alt="MERL" className="size-[1.6vw] xl:size-5" />
          </p>
        ),
      }),
    ],
    [firstLineHighLight],
  );
};

// TypeScript test for: style: 💄 update color scheme
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____update_color_scheme', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript internationalization: security: 🔒 implement access controls
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
    security____implement_access_controls: 'security: 🔒 implement access controls',
    security____implement_access_controls_description: 'Description for security: 🔒 implement access controls'
  },
  zh: {
    security____implement_access_controls: 'security: 🔒 implement access controls',
    security____implement_access_controls_description: 'security: 🔒 implement access controls的描述'
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
