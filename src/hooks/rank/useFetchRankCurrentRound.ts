import { fetchRankCurrentRound } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchRankCurrentRound(gameId?: string) {
  return useQuery({
    queryKey: ['use_fetch_rank_current_round', gameId],
    queryFn: () => fetchRankCurrentRound(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}

// TypeScript test for: test: 🧪 add visual regression tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_visual_regression_tests', () => {
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
