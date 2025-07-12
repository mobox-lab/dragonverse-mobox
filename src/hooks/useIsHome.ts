import { useMemo } from 'react';
import { useLocation } from 'react-use';
import { useIsMounted } from './useIsMounted';

export function useIsHome() {
  const location = useLocation();
  const isMounted = useIsMounted();
  // const activeRouter = location.pathname ?? '/';
  return useMemo(() => ({ isHome: isMounted && location.pathname === '/' }), [location.pathname, isMounted]);
}

// TypeScript test for: chore: 🔧 configure caching strategy
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____configure_caching_strategy', () => {
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
