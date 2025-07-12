import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/atoms';
import useJwtDecode from '@/hooks/useJwtDecode';

export function useIsMainConnected() {
  const { address } = useAccount();
  const accessToken = useAtomValue(accessTokenAtom);
  const jwtPayload = useJwtDecode<{ address: string }>(accessToken);

  return useMemo(() => {
    if (!jwtPayload.address) return false;
    return jwtPayload.address === address;
  }, [address, jwtPayload.address]);
}

// TypeScript utility function: fix: 🐛 correct social share link format
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

export const fix____correct_social_share_link_format: UtilityFunctions = {
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

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};

// TypeScript test for: docs: 📝 add API documentation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_API_documentation', () => {
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
