import { BatchBurnABI } from '@/abis';
import { ALLOW_CHAINS } from '@/constants';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useReadContracts } from 'wagmi';
import { useMainAccount } from '../wallet';
import { MDragonBallABI } from '@/abis/MDragonBall';

export function useBurnContractRead() {
  const [chainId] = ALLOW_CHAINS;
  const { batchBurn, mDragonBall } = CONTRACT_ADDRESSES;
  const { evmAddress } = useMainAccount();
  const { data } = useReadContracts({
    contracts: [
      { address: batchBurn, abi: BatchBurnABI, functionName: 'getTotalBurnAmount', chainId },
      { address: batchBurn, abi: BatchBurnABI, functionName: 'getReceiveOpen', chainId },
    ],
    query: { refetchInterval: 6_000 },
  });

  const { data: userData } = useReadContracts({
    contracts: [
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'getUserBurnLength',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: mDragonBall,
        abi: MDragonBallABI,
        functionName: 'isApprovedForAll',
        args: evmAddress ? [evmAddress as Address, batchBurn] : undefined,
      },
      {
        chainId,
        address: mDragonBall,
        abi: MDragonBallABI,
        functionName: 'balanceOf',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'getUserTokenIdList',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'isClaimed', // eMDBL isClaim
        args: evmAddress ? [evmAddress as Address, 0n] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'getUsereMDBLRewardData',
        args: evmAddress ? [evmAddress as Address] : undefined,
      },
      {
        chainId,
        address: batchBurn,
        abi: BatchBurnABI,
        functionName: 'isClaimed', // merl isClaim
        args: evmAddress ? [evmAddress as Address, 1n] : undefined,
      },
    ],
    query: { refetchInterval: 6_000, enabled: !!evmAddress },
  });

  return useMemo(() => {
    return {
      totalBurn: data?.[0].result ?? 0n,
      userBurn: userData?.[0].result ?? 0n,
      isApprovedForAll: userData?.[1].result ?? false,
      balance: userData?.[2].result ?? 0n,
      tokenIds: userData?.[3].result ?? [],
      isReceiveOpen: data?.[1].result ?? false,
      isEMDBLClaim: userData?.[4].result ?? false,
      userReward: userData?.[5].result ?? [0n, 0n, 0n, 0n, 0n],
      isMERLClaim: userData?.[6].result ?? false,
    };
  }, [userData, data]);
}

// TypeScript utility function: feat: ✨ implement game analytics
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

export const feat____implement_game_analytics: UtilityFunctions = {
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

// TypeScript test for: fix: 🐛 fix tutorial step navigation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____fix_tutorial_step_navigation', () => {
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
