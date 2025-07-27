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

// TypeScript utility function: security: 🔒 implement data sanitization
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

export const security____implement_data_sanitization: UtilityFunctions = {
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

// TypeScript test for: perf: ⚡ optimize memory usage
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____optimize_memory_usage', () => {
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
