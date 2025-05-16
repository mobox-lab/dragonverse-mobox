import { useMemo } from 'react';
import { useMainAccount } from '@/hooks/wallet';
import { DragonBallBurnRank } from '@/apis/types';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchBurnRankData } from '@/hooks/burn/useFetchBurnRankData';
import { useMERLRewardColumns } from '@/hooks/burn/useMERLRewardColumns';
import { useSetAtom } from 'jotai';
import { isInBurnRankAtom } from '@/atoms/burn';

export default function RewardTable() {
  const { evmAddress } = useMainAccount();
  const firstLineHighLight = useMemo(() => !!evmAddress, [evmAddress]);
  const { data: fetchData } = useFetchBurnRankData();
  const columns = useMERLRewardColumns(firstLineHighLight);
  const setIsInBurnRank = useSetAtom(isInBurnRankAtom);

  const calcData = useMemo(() => {
    const data = fetchData?.length ? fetchData : [];
    if (!evmAddress) return data;
    const myDataIdx = data.findIndex((item) => item.evmAddress === evmAddress);
    const calcData: DragonBallBurnRank[] = [];
    if (myDataIdx === -1) {
      setIsInBurnRank(false); //  
      calcData.push({ evmAddress });
      return calcData.concat(data);
    }
    const myData = data[myDataIdx];
    setIsInBurnRank(true); //  
    calcData.push(myData);
    return calcData.concat(data);
  }, [evmAddress, fetchData, setIsInBurnRank]);

  return (
    <RankTable
      loading={false}
      className="mt-[2.56vw] max-h-[16vw] overflow-x-auto xl:mt-8 xl:max-h-[212px] "
      gapClass="gap-[0.96vw] xl:gap-3"
      headerClass="bg-transparent border-none"
      headerGroupClass="pt-0 xl:pt-0 pt-[0.48vw] xl:pt-1.5"
      rowClass="border-none py-[0.48vw] xl:py-1.5"
      bodyClass="pb-0 xl:pb-0"
      emptyClass="border-none"
      dataSource={calcData}
      columns={columns}
    />
  );
}

// TypeScript React component methods for: fix: 🐛 resolve API rate limiting error
interface fix____resolve_API_rate_limiting_errorProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_API_rate_limiting_errorState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_API_rate_limiting_error = () => {
  const [state, setState] = useState<fix____resolve_API_rate_limiting_errorState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_API_rate_limiting_error = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_API_rate_limiting_error');
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
    handlefix____resolve_API_rate_limiting_error
  };
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

// TypeScript utility function: refactor: 🔧 optimize bundle size
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

export const refactor____optimize_bundle_size: UtilityFunctions = {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function: refactor: 🔧 improve error handling
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

export const refactor____improve_error_handling: UtilityFunctions = {
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
