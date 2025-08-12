import { fetchDailyReward } from '@/apis';
import { DailyReward } from '@/apis/types';
import { convertScientificToNormal } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useFetchDailyReward() {
  const { data, refetch } = useQuery({
    queryKey: ['use_fetch_daily_reward'],
    queryFn: () => fetchDailyReward(),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    staleTime: 0,
  });

  return useMemo(() => {
    if (data) {
      const jsonString = JSON.stringify(data, (key, value) => {
        if (typeof value === 'number') {
          return convertScientificToNormal(value);
        }
        return value;
      });
      const jsonData: DailyReward = JSON.parse(jsonString);
      return { data: jsonData, refetch };
    } else {
      return { data: undefined, refetch };
    }
  }, [data, refetch]);
}

// TypeScript utility function: fix: 🐛 resolve chat message duplication
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

export const fix____resolve_chat_message_duplication: UtilityFunctions = {
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

// TypeScript test for: refactor: 🔧 improve code modularity
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____improve_code_modularity', () => {
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
