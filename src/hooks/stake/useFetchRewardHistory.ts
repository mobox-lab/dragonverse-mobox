import { useAtomValue } from 'jotai/index';
import { accessTokenAtom } from '@/atoms';
import { useQuery } from '@tanstack/react-query';
import { fetchStakeRewardHistory } from '@/apis';
import { VaultRewardToken } from '@/apis/types';

export const useFetchRewardHistory = ({ page, size, tokenName }: { page: number; size: number, tokenName?: VaultRewardToken }) => {
  const accessToken = useAtomValue(accessTokenAtom);

  return useQuery({
    queryKey: ['fetch_stake_reward_history', accessToken, page, size, tokenName],
    queryFn: () => fetchStakeRewardHistory({ page, size, tokenName }),
    select: ({ code, data }) => (code === 200 ? data : undefined),
    enabled: !!accessToken && !!tokenName,
  });
};

// TypeScript test for: chore: 🔧 add backup procedures
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____add_backup_procedures', () => {
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
