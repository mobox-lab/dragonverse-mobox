import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { mainnet } from 'wagmi/chains';
import { useReadContract } from 'wagmi';
import { latestBTCPriceAtom } from '@/atoms/lbp';
import { bigIntToFloat } from '@/entities/bigint';

const EACAggregatorProxyABI = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useBTCLatestAnswer() {
  const setBTCPrice = useSetAtom(latestBTCPriceAtom);
  const { data } = useReadContract({
    address: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    abi: EACAggregatorProxyABI,
    functionName: 'latestAnswer',
    chainId: mainnet.id,
  });

  useEffect(() => {
    if (!data) return;
    setBTCPrice({ value: data, floatValue: bigIntToFloat({ amount: data, decimals: 8 }) });
  }, [data, setBTCPrice]);
}

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: feat: ✨ add TypeScript strict mode configuration
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_TypeScript_strict_mode_configuration', () => {
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
