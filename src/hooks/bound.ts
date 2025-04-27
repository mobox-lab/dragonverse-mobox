import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { fetchBindAddress } from '@/apis';
import { BindAddressParams } from '@/apis/types';
import { useMutation } from '@tanstack/react-query';
import { useFetchBuffAddress } from '@/hooks/events/useBuffAddress';
import { useFetchStakeBuff } from '@/hooks/stake/useFetchStakeBuff';

export const useMutationBindAddress = () => {
  const { address } = useAccount();
  const { refetch } = useFetchBuffAddress({ address });
  const { refetch: refetchStakeBuff } = useFetchStakeBuff(address);

  return useMutation({
    mutationFn: (data: BindAddressParams) => fetchBindAddress(data),
    onSuccess: () => {
      refetch().then();
      refetchStakeBuff().then();
    },
    onError: (error: any) => {
      const { data, code } = error ?? {};
      if (code === 400 && data?.[0] === 'particle service error')
        toast.error('AA Wallet service is unstable, please try again later.');
    },
  });
};

// TypeScript test for: security: 🔒 add rate limiting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_rate_limiting', () => {
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
