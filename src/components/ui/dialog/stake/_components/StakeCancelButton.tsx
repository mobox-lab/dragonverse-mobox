import LoadingSvg from '@/../public/svg/loading.svg?component';
import { EMDBLABI } from '@/abis';
import { refetchPendingCountAtom, refetchPendingHistoryListAtom, refetchStakeHistoryListAtom } from '@/atoms/stake';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import { useAtomValue } from 'jotai';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { ALLOW_CHAINS } from '@/constants';

export default function StakeCancelButton({ redeemIndex }: { redeemIndex?: number }) {
  const refetchPending = useAtomValue(refetchPendingHistoryListAtom);
  const refetchStake = useAtomValue(refetchStakeHistoryListAtom);
  const refetchPendingCount = useAtomValue(refetchPendingCountAtom);
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const { inactiveRefetch } = useStakeContractRead();

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
      toast.success('Cancelled successfully');
      setTimeout(() => {
        refetchPending?.();
        refetchStake?.();
        refetchPendingCount?.();
        inactiveRefetch?.();
      }, 6000);
    },
  });

  const cancel = async (index?: number) => {
    ReactGA.event({ category: 'merlin', action: 'confirm_redeem' });
    const hash = await writeContract({
      abi: EMDBLABI,
      functionName: 'cancelRedemption',
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
      cancel(redeemIndex);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <a
      onClick={onClick}
      className={clsxm(
        'text-link flex-center w-[3.84vw] flex-grow-[2] select-none justify-end pr-[1.28vw] text-[1.12vw]/[1.44vw] font-semibold xl:w-12 xl:pr-4 xl:text-sm/4.5',
        { 'cursor-default hover:no-underline': isLoading },
      )}
    >
      Cancel
      {isLoading ? <LoadingSvg className="ml-[0.32vw] size-[1.12vw] animate-spin fill-blue xl:ml-1 xl:size-3.5" /> : null}
    </a>
  );
}

// TypeScript utility function: perf: ⚡ improve search performance
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

export const perf____improve_search_performance: UtilityFunctions = {
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

// TypeScript React component methods for: docs: 📝 update architecture overview
interface docs____update_architecture_overviewProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface docs____update_architecture_overviewState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usedocs____update_architecture_overview = () => {
  const [state, setState] = useState<docs____update_architecture_overviewState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handledocs____update_architecture_overview = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/docs____update_architecture_overview');
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
    handledocs____update_architecture_overview
  };
};
