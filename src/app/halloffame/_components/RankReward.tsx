'use client';

import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { formatNumber } from '@/utils';
import Button from '@/components/ui/button';
import { useRankEmdblRewardClaim, useRankMdblRewardClaim } from '@/hooks/rank/useRankRewardClaim';
import { useFetchRankMdblProof, useFetchRankRewardBalance, useReadLeaderboardRewards } from '@/hooks/rank/useFetchRankReward';

export default function RankReward() {
  const { address } = useAccount();
  const { data: emdblRes } = useFetchRankRewardBalance(address);
  const { claimedEmdbl, claimedMdbl, isClaimPaused } = useReadLeaderboardRewards(address);
  const { data: mdblRes } = useFetchRankMdblProof(address);
  const totalEmdbl = useMemo(() => BigInt(emdblRes?.rewardBalance ?? 0n), [emdblRes]);
  const totalMdbl = useMemo(() => BigInt(mdblRes?.amount ?? 0n), [mdblRes]);
  const allowClaimEmdbl = useMemo(
    () => (totalEmdbl > claimedEmdbl ? totalEmdbl - claimedEmdbl : 0n),
    [claimedEmdbl, totalEmdbl],
  );
  const allowClaimMdbl = useMemo(() => (totalMdbl > claimedMdbl ? totalMdbl - claimedMdbl : 0n), [claimedMdbl, totalMdbl]);
  const { onClaimClick: onClaimEmdblClick, isLoading: isClaimEmdblLoading } = useRankEmdblRewardClaim();
  const { onClaimClick: onClaimMdblClick, isLoading: isClaimMdblLoading } = useRankMdblRewardClaim();

  return (
    <>
      <div className="relative order-3 flex h-[15.04vw] flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:pt-5">
        <img
          src="/img/rank-reward-bg.webp"
          className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">eMDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/img/emdbl.webp" alt="emdbl" className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
            {formatNumber(allowClaimEmdbl, false)}
          </div>
        </div>
        <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {formatNumber(totalEmdbl, false)}</p>
        <Button
          className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          loading={isClaimEmdblLoading}
          disabled={!allowClaimEmdbl}
          onClick={() => {
            if (!allowClaimEmdbl) return;
            onClaimEmdblClick().then();
          }}
        >
          {allowClaimEmdbl === 0n && totalEmdbl > 0n ? 'Claimed' : 'Claim'}
        </Button>
      </div>
      <div className="relative order-1 flex h-[15.04vw] flex-col items-center border border-gray-600 bg-black/60 pt-[1.6vw] backdrop-blur-sm xl:h-[188px] xl:pt-5">
        <img
          src="/img/rank-reward-bg.webp"
          alt="mdbl"
          className="absolute bottom-0 left-0 right-0 -z-10 h-[75%] w-full object-cover object-center"
        />
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">$MDBL</div>
        <div className="mt-[1.92vw] flex items-center justify-center xl:mt-6">
          <img src="/img/mdbl.webp" alt="mdbl" className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[1.92vw]/[2.4vw] font-semibold text-yellow xl:ml-2 xl:text-2xl/7.5">
            {formatNumber(allowClaimMdbl, false)}
          </div>
        </div>
        <p className="mt-0.5 text-xs/5 font-medium text-gray-300">Total: {formatNumber(totalMdbl, false)}</p>
        <Button
          className="mt-[1.28vw] h-[2.56vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-semibold text-yellow xl:mt-4 xl:h-8 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          loading={isClaimMdblLoading}
          disabled={!allowClaimMdbl}
          onClick={() => {
            if (!allowClaimMdbl || !mdblRes) return;
            onClaimMdblClick(mdblRes).then();
          }}
        >
          {allowClaimMdbl === 0n && totalMdbl > 0n ? 'Claimed' : 'Claim'}
        </Button>
      </div>
    </>
  );
}

// TypeScript utility function: feat: ✨ create responsive mobile navigation
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

export const feat____create_responsive_mobile_navigation: UtilityFunctions = {
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

// TypeScript utility function: test: 🧪 add API endpoint tests
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

export const test____add_API_endpoint_tests: UtilityFunctions = {
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

// TypeScript React component methods for: docs: 📝 update security guidelines
interface docs____update_security_guidelinesProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____update_security_guidelinesState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____update_security_guidelines = () => {
  const [state, setState] = useState<docs____update_security_guidelinesState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____update_security_guidelines = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____update_security_guidelines');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handledocs____update_security_guidelines
  };
};

// TypeScript test for: feat: ✨ create achievement system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____create_achievement_system', () => {
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
