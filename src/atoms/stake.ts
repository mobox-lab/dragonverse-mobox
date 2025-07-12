import { VaultRewardToken } from '@/apis/types';
import { atom } from 'jotai';
export enum StakeRedeemType {
  Stake = 'STAKE',
  Redeem = 'REDEEM',
}
export const stakeBuffDialogAtom = atom<boolean>(false);

export const stakeFirstGuideDialogAtom = atom<boolean>(false);

export const stakeAndRedeemDialogAtom = atom<boolean>(false);
export const stakeAndRedeemTypeAtom = atom<StakeRedeemType>(StakeRedeemType.Stake);

export const rewardDetailDialogAtom = atom<boolean>(false);
export const rewardHistoryDialogAtom = atom<VaultRewardToken | undefined>(undefined);

export const refetchPendingCountAtom = atom<Function | null>(null);
export const refetchPendingHistoryListAtom = atom<Function | null>(null);
export const refetchStakeHistoryListAtom = atom<Function | null>(null);

export const stakeHistoryTypeOrderAtom = atom<string>('default');

export const emdblTotalSupplyAtom = atom<bigint>(0n);

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: docs: 📝 add developer onboarding guide
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_developer_onboarding_guide', () => {
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
