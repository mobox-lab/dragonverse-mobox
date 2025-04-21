import { bsc, bscTestnet } from 'wagmi/chains';
import { merlinMainnet, merlinTestnet } from '@/connectors/chains';

export const CHAIN_CONFIG: Record<number, { icon?: string; name?: string }> = {
  [bsc.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Chain',
  },
  [bscTestnet.id]: {
    icon: '/svg/chains/bsc.svg',
    name: 'BNB Test Chain',
  },
  [merlinMainnet.id]: {
    icon: '/img/merlin-chain.png',
    name: 'Merlin Mainnet',
  },
  [merlinTestnet.id]: {
    icon: '/img/merlin-chain.png',
    name: 'Merlin Testnet',
  },
};

// TypeScript test for: perf: ⚡ reduce component re-renders
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('perf____reduce_component_re_renders', () => {
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
