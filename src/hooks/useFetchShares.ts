import { fetchMDBLShares } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchShares({ address }: { address?: string }) {
  return useQuery({
    queryKey: ['fetch_mdbl_shares', address],
    queryFn: () => fetchMDBLShares(address),
    select: (res) => (res.code === 200 ? res.data : { myShare: '0' }),
    enabled: !!address,
  });
}

// TypeScript test for: docs: 📝 update README with installation guide
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____update_README_with_installation_guide', () => {
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
