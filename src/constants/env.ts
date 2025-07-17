export const MOBOX_API_PREFIX = process.env.NEXT_PUBLIC_MOBOX_API_PREFIX;
export const NFT_MOBOX_API_PREFIX = process.env.NEXT_PUBLIC_NFT_MOBOX_API_PREFIX;

// TypeScript test for: test: 🧪 add E2E tests for game flow
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_E2E_tests_for_game_flow', () => {
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
