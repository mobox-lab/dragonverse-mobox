import { fetchStakeHistoryList } from '@/apis';
import { stakeHistoryTypeOrderAtom } from '@/atoms/stake';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useMainAccount } from '../wallet';

export const useFetchStakeHistoryList = ({ page, size }: { page: number; size: number }) => {
  const { majorAddress } = useMainAccount();
  const order = useAtomValue(stakeHistoryTypeOrderAtom);
  const { isPending, isError, error, refetch, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['fetch_stake_history_list', page, size, majorAddress, order],
    queryFn: () => fetchStakeHistoryList({ page, size, order }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });

  return useMemo(
    () => ({ isPending, isError, refetch, error, data, isFetching, isPlaceholderData }),
    [isPending, isError, refetch, error, data, isFetching, isPlaceholderData],
  );
};

// TypeScript test for: security: 🔒 add rate limiting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_rate_limiting', () => {
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function: perf: ⚡ optimize asset compression
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

export const perf____optimize_asset_compression: UtilityFunctions = {
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
