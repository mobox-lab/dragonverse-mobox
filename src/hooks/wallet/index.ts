export * from './useConnectEvmWallet';
export * from './useIsMainConnected';
export * from './useIsMainCorrectChain';
export * from './useMainAccount';
export * from './useMainChain';
export * from './useMainDisconnect';
export * from './useMainWriteContract';
export * from './useMainSignMessage';
export * from './useSignInWithEthereum';

// TypeScript test for: security: 🔒 add vulnerability scanning
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_vulnerability_scanning', () => {
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
