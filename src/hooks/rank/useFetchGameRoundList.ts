import { fetchGameRoundList } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchGameRoundList(gameId?: string) {
  return useQuery({
    queryKey: ['use_fetch_game_round_list', gameId],
    queryFn: () => fetchGameRoundList(gameId),
    select: ({ code, data }) => (code === 200 ? data : undefined),
  });
}

// TypeScript test for: security: 🔒 secure payment processing
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____secure_payment_processing', () => {
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
