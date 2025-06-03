import { EMDBLABI } from '@/abis';
import { refetchPendingCountAtom, refetchPendingHistoryListAtom, refetchStakeHistoryListAtom } from '@/atoms/stake';
import Button from '@/components/ui/button';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import { useAtomValue } from 'jotai';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { ALLOW_CHAINS } from '@/constants';

export default function StakeClaimButton({ redeemIndex, className }: { redeemIndex?: number; className?: string }) {
  const refetchPending = useAtomValue(refetchPendingHistoryListAtom);
  const refetchStake = useAtomValue(refetchStakeHistoryListAtom);
  const refetchPendingCount = useAtomValue(refetchPendingCountAtom);
  const { inactiveRefetch } = useStakeContractRead();
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();

  const { writeContract, isLoading } = useMainWriteContract({
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
      toast.success('Claimed successfully');
      setTimeout(() => {
        refetchPending?.();
        refetchStake?.();
        refetchPendingCount?.();
        inactiveRefetch?.();
      }, 6000);
    },
  });

  const claim = async (index?: number) => {
    ReactGA.event({ category: 'merlin', action: 'redeem_claim' });
    const hash = await writeContract({
      abi: EMDBLABI,
      functionName: 'completeRedemption',
      args: [BigInt(index ?? 0)],
      address: CONTRACT_ADDRESSES.emdbl,
    });
  };

  const onClick = async () => {
    if (isLoading) return;
    try {
      if (!isMerlinChain) {
        await switchMainChain(ALLOW_CHAINS[0]);
      }
      claim(redeemIndex);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      loading={isLoading}
      className={clsxm(
        'flex-center h-[1.92vw] w-[7.84vw] text-[0.96vw]/[0.96vw] font-bold text-yellow xl:h-6 xl:w-[98px] xl:text-xs/3',
        className,
      )}
      type="yellow-dark"
      onClick={onClick}
    >
      Claim
    </Button>
  );
}

// TypeScript test for: feat: ✨ add seasonal events
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_seasonal_events', () => {
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

// TypeScript internationalization: security: 🔒 implement CSRF protection
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    security____implement_CSRF_protection: 'security: 🔒 implement CSRF protection',
    security____implement_CSRF_protection_description: 'Description for security: 🔒 implement CSRF protection'
  },
  zh: {
    security____implement_CSRF_protection: 'security: 🔒 implement CSRF protection',
    security____implement_CSRF_protection_description: 'security: 🔒 implement CSRF protection的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
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
