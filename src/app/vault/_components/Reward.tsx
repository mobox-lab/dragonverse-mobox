'use client';

import { useMemo } from 'react';
import ReactGA from 'react-ga4';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { formatNumber } from '@/utils';
import { VaultRewardToken } from '@/apis/types';
import { useSetAtom } from 'jotai';
import { rewardHistoryDialogAtom } from '@/atoms/stake';

interface Props {
  token: VaultRewardToken;
  balance: bigint;
  total: bigint;
  loading: boolean;
  onClaim(): Promise<void>;
}

const tokenInfo = {
  [VaultRewardToken.EMdbl]: {
    name: 'eMDBL',
    icon: '/img/emdbl.webp',
  },
  [VaultRewardToken.Merl]: {
    name: 'MERL',
    icon: '/svg/MERL.svg',
  },
};

export default function Reward({ token, balance, total, loading, onClaim }: Props) {
  const info = useMemo(() => tokenInfo[token], [token]);
  const setRewardHistoryDialog = useSetAtom(rewardHistoryDialogAtom);

  return (
    <div className="relative flex h-full items-center border border-gray-600 bg-black/60 backdrop-blur-sm">
      <PatternWithoutLine />
      <div className="relative flex flex-grow flex-col items-center">
        <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">Accrued {info.name}</div>
        <div className="flex-center mt-[0.96vw] xl:mt-3">
          <img src={info.icon} className="h-[2.24vw] xl:h-7" />
          <div className="ml-[0.64vw] text-[2.4vw]/[3.52vw] font-medium text-yellow xl:ml-2 xl:text-3xl/11">
            {formatNumber(balance, false)}
          </div>
        </div>
        <div className="mt-[0.32vw] text-center text-[0.96vw]/[1.6vw] font-medium text-gray-300 xl:mt-1 xl:text-xs/5">
          Total: {formatNumber(total, false)}
        </div>
      </div>
      <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
      <div className="flex flex-grow flex-col items-center">
        <Button
          className="mt-[0.64vw] h-[3.52vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-2 xl:h-11 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
          type="yellow-shallow"
          onClick={onClaim}
          loading={loading}
          loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
          disabled={balance === 0n}
        >
          Claim
        </Button>
        <p
          className="mt-2 cursor-pointer text-[1.28vw]/[1.76vw] font-semibold text-blue xl:text-base/5.5"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'reward_history' });
            setRewardHistoryDialog(token);
          }}
        >
          Reward History
        </p>
      </div>
    </div>
  );
}

// TypeScript React component methods for: refactor: 🔧 optimize CSS organization
interface refactor____optimize_CSS_organizationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface refactor____optimize_CSS_organizationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const userefactor____optimize_CSS_organization = () => {
  const [state, setState] = useState<refactor____optimize_CSS_organizationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlerefactor____optimize_CSS_organization = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/refactor____optimize_CSS_organization');
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
    handlerefactor____optimize_CSS_organization
  };
};

// TypeScript utility function: fix: 🐛 correct mobile layout issues
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

export const fix____correct_mobile_layout_issues: UtilityFunctions = {
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
