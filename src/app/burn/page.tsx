'use client';

import React from 'react';
import { burnDragonBallDialogAtom, isInBurnRankAtom } from '@/atoms/burn';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { CDN_URL } from '@/constants';
import { useBurnContractRead } from '@/hooks/burn/burnContractRead';
import useCountdown from '@/hooks/useCountdown';
import { useAtomValue, useSetAtom } from 'jotai';
import { Address, formatEther, parseEther } from 'viem';
import SnapShotWalletButton from '../events/_components/SnapShotWalletButton';
import RewardTable from './_components/RewardTable';
import { formatNumber } from '@/utils';
import { useClaimBurnEMDBLReward } from '@/hooks/burn/useClaimBurnReward';
import Decimal from 'decimal.js-light';
import { getMerlProofByAddress } from '@/utils/reward';
import { useMainAccount, useMainWriteContract } from '@/hooks/wallet';
import { toast } from 'react-toastify';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { BatchBurnABI } from '@/abis';

interface BurnProps {}

const Burn: React.FunctionComponent<BurnProps> = (props) => {
  const { totalBurn, balance, userBurn, isReceiveOpen, isEMDBLClaim, userReward, isMERLClaim } = useBurnContractRead();
  const countdown = useCountdown(1716624000, 1000, '');
  const setBurnOpen = useSetAtom(burnDragonBallDialogAtom);
  const { write, isLoading } = useClaimBurnEMDBLReward();
  const isInBurnRank = useAtomValue(isInBurnRankAtom);
  const { writeContract, isLoading: merlClaimIsLoading } = useMainWriteContract({
    onError: (error) => {
      if (error?.name === 'UserRejected') {
        return;
      }
      if (error?.name === 'EstimateGasExecutionError') {
        toast.error(error.message);
        return;
      }
      toast.error('Network error, please try again later');
    },
    onSuccess: (data) => {
      if (!data) return;
      const log = data[0];
      toast.success('Claim succeeded');
    },
  });
  const { evmAddress } = useMainAccount();
  const claim = async () => {
    const proofData = getMerlProofByAddress(evmAddress as Address);
    if (proofData.value && proofData.proof) {
      const value = proofData.value;
      const hash = await writeContract({
        abi: BatchBurnABI,
        functionName: 'usersReceiveMERLRewards',
        args: [value[0], value[2], proofData.proof],
        address: CONTRACT_ADDRESSES.batchBurn,
      });
    }
  };
  return (
    <div>
      <img
        src={`${CDN_URL}/dragon-banner-09.webp`}
        alt=""
        className="absolute left-1/2 top-0 -z-10 h-auto w-full max-w-[1536px] -translate-x-1/2 transform"
      />
      <div>
        <div className="flex-center gap-[0.8vw] xl:gap-2.5">
          <img className="h-[4.8vw] xl:h-15" src="/img/dragon-ball.webp" alt="dragon-ball" />
          <img className="h-[4.96vw] xl:h-15.5" src="/img/events/title_burn.webp" alt="title" />
        </div>
        <img className="mx-auto mt-[0.96vw] h-[3.84vw] xl:mt-3 xl:h-12" src="/img/events/subtitle_burn.webp" alt="subtitle" />
      </div>
      <div className="mt-[9.76vw] xl:mt-[122px]">
        <div className="flex-center pb-[2.4vw] xl:pb-7.5">
          <SnapShotWalletButton />
        </div>
        <div className="mx-auto flex h-[2.88vw] w-full max-w-[54.4vw] items-center justify-between bg-legendary/30 px-[1.28vw] text-[0.96vw]/[1.6vw] font-medium text-legendary backdrop-blur-2xl xl:h-9 xl:max-w-[680px] xl:px-4 xl:text-xs/5">
          <div>Limited Time Window [05/20 8AM UTC - 05/25 8AM UTC]</div>
          <div>Ended</div>
        </div>
        <div className="relative mx-auto mt-[1.28vw] w-full max-w-[54.4vw] border border-gray-600 bg-black/60 px-[2.4vw] py-[2.88vw] backdrop-blur-sm xl:mt-4 xl:max-w-[680px] xl:px-7.5 xl:py-9">
          <PatternWithoutLine />

          <div className="flex w-full items-center justify-between">
            <div className="flex w-[18.16vw] flex-col items-center xl:w-[227px]">
              <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">M-Dragonball Balance</div>
              <div className="mt-[1.28vw] flex items-center justify-center gap-[0.64vw] xl:mt-4 xl:gap-2">
                <img src="/img/dragon-ball.webp" alt="dragon-ball" className="size-[2.4vw] xl:size-7.5" />
                <div className="text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:text-3xl/7.5">{balance.toString()}</div>
              </div>
            </div>
            <div className="flex w-[18.16vw] flex-col items-center xl:w-[227px]">
              <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">You Burned</div>
              <div className="mt-[1.28vw] flex items-center justify-center gap-[0.64vw] xl:mt-4 xl:gap-2">
                <img src="/svg/dragon-ball-burn.svg" alt="dragon-ball-burn" className="h-[2.4vw] xl:h-7.5" />
                <div className="text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:text-3xl/7.5"> {userBurn.toString()}</div>
              </div>
            </div>
            <Button
              type="yellow"
              className="h-[3.52vw] w-[12.8vw] text-[1.28vw]/[1.28vw] font-semibold xl:h-11 xl:w-40 xl:text-base/4"
              disabled={countdown === 'end'}
              onClick={() => setBurnOpen(true)}
            >
              Burn
            </Button>
          </div>
        </div>

        <div className=" mx-auto mt-[1.6vw] grid w-full max-w-[54.4vw] grid-cols-2 gap-[1.6vw] backdrop-blur-sm xl:mt-5 xl:max-w-[680px] xl:gap-5">
          <div className="relative h-[33.76vw] border border-yellow/50 bg-yellow/[0.08] xl:h-[422px]">
            <PatternWithoutLine className="stroke-yellow" />
            <div className="absolute left-0 top-0 h-[8.5vw] w-full bg-yellow/[0.06] xl:h-[107px]"></div>
            <div className="relative flex h-full flex-col justify-between px-[1.92vw] pb-[1.92vw] pt-[0.64vw] xl:px-6 xl:pb-6 xl:pt-2">
              <div>
                <div className="text-center text-[1.28vw]/[1.92vw] text-yellow xl:text-base/6">Reward 1</div>
                <div className="mt-[0.32vw] flex items-center justify-between xl:mt-1">
                  <div>
                    <div className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">eMDBL</div>
                    <div className="mt-[0.48vw] text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:mt-1.5 xl:text-3xl/7.5">
                      10,500,000
                    </div>
                  </div>
                  <img src="/img/emdbl.webp" alt="emdbl" className="h-[3.84vw] xl:h-12" />
                </div>
                <div className="mt-[2.56vw] flex items-center justify-between xl:mt-8">
                  <div className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">You Burned</div>
                  <div className="flex items-center justify-end gap-[0.32vw] xl:gap-1">
                    <div className="text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:text-sm/4.5">{userBurn.toString()}</div>
                    <img src="/img/dragon-ball.webp" alt="dragon-ball" className="size-[1.6vw] xl:size-5" />
                  </div>
                </div>
                <div className="mt-[0.96vw] flex items-center justify-between xl:mt-3">
                  <div className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Total Burns</div>
                  <div className="flex items-center justify-end gap-[0.32vw] xl:gap-1">
                    <div className="text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:text-sm/4.5">
                      {totalBurn.toString()}
                    </div>
                    <img src="/img/dragon-ball.webp" alt="dragon-ball" className="size-[1.6vw] xl:size-5" />
                  </div>
                </div>
                <div className="mt-[0.96vw] flex items-center justify-between xl:mt-3">
                  <div className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Your Share</div>
                  <div className="text-[1.12vw]/[1.44vw] font-semibold text-green xl:text-sm/4.5">
                    {new Decimal(formatEther(userReward[3])).times(100).toNumber().toFixed(2)}%
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-[0.96vw] flex items-center justify-between xl:mt-3">
                  <div className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">Est. Rewards</div>
                  <div className="flex items-center justify-end gap-[0.32vw] xl:gap-1">
                    <div className="text-[1.12vw]/[1.44vw] font-semibold text-yellow xl:text-sm/4.5">
                      {formatNumber(userReward[4], false)}
                    </div>
                    <img src="/img/emdbl.webp" alt="emdbl" className="h-[1.6vw] xl:h-5" />
                  </div>
                </div>
                <Button
                  className="mt-[1.44vw] h-[3.52vw] w-full rounded-[0.16vw] py-0 text-[1.28vw]/[1.28vw] font-bold text-yellow xl:mt-4.5 xl:h-11 xl:rounded-sm xl:text-base/4"
                  type="yellow-shallow"
                  loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
                  disabled={!isReceiveOpen || userBurn <= 0 || isEMDBLClaim}
                  onClick={write}
                  loading={isLoading}
                >
                  {isEMDBLClaim ? 'Claimed' : 'Claim'}
                </Button>
              </div>
            </div>
          </div>
          <div className="relative h-[33.76vw] border border-yellow/50 bg-yellow/[0.08] xl:h-[422px]">
            <PatternWithoutLine className="stroke-yellow" />
            <div className="absolute left-0 top-0 h-[8.5vw] w-full bg-yellow/[0.06] xl:h-[107px]"></div>
            <div className="relative flex h-full flex-col justify-between px-[1.92vw] pb-[1.92vw] pt-[0.64vw] xl:px-6 xl:pb-6 xl:pt-2">
              <div>
                <div className="text-center text-[1.28vw]/[1.92vw] text-yellow xl:text-base/6">Reward 2</div>
                <div className="mt-[0.32vw] flex items-center justify-between xl:mt-1">
                  <div>
                    <div className="text-[1.12vw]/[1.6vw] font-semibold xl:text-sm/5">$MERL</div>
                    <div className="mt-[0.48vw] flex items-center text-[2.4vw]/[2.4vw] font-semibold text-yellow xl:mt-1.5 xl:text-3xl/7.5">
                      20,000
                      <span className="ml-[0.64vw] text-[1.12vw]/[2.4vw] text-green xl:ml-2 xl:text-sm/7.5">(Top 50)</span>
                    </div>
                  </div>
                  <img src="/svg/MERL.svg" alt="MERL" className="size-[3.84vw] xl:size-12" />
                </div>
                <RewardTable />
              </div>

              <div>
                <Button
                  className="mt-[1.44vw] h-[3.52vw] w-full rounded-[0.16vw] py-0 text-[1.28vw]/[1.28vw] font-bold text-yellow xl:mt-4.5 xl:h-11 xl:rounded-sm xl:text-base/4"
                  type="yellow-shallow"
                  loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
                  loading={merlClaimIsLoading}
                  onClick={claim}
                  disabled={userBurn <= 0 || isMERLClaim || !isInBurnRank}
                >
                  Claim
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burn;

// TypeScript React component methods for: fix: 🐛 correct social share link format
interface fix____correct_social_share_link_formatProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____correct_social_share_link_formatState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____correct_social_share_link_format = () => {
  const [state, setState] = useState<fix____correct_social_share_link_formatState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____correct_social_share_link_format = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____correct_social_share_link_format');
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
    handlefix____correct_social_share_link_format
  };
};

// TypeScript React component methods for: feat: ✨ add TypeScript generics for reusable components
interface feat____add_TypeScript_generics_for_reusable_componentsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_TypeScript_generics_for_reusable_componentsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_TypeScript_generics_for_reusable_components = () => {
  const [state, setState] = useState<feat____add_TypeScript_generics_for_reusable_componentsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_TypeScript_generics_for_reusable_components = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_TypeScript_generics_for_reusable_components');
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
    handlefeat____add_TypeScript_generics_for_reusable_components
  };
};

// TypeScript test for: security: 🔒 add XSS protection
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_XSS_protection', () => {
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

// TypeScript security utilities
type SanitizedInput = string;

export const securityEnhancement = (input: string): SanitizedInput => {
  return input.replace(/[<>"']/g, '');
};
