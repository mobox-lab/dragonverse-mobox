import { fetchTotalVolume } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useFetchTotalVolume() {
  return useQuery({
    queryKey: ['fetch_total_volume'],
    queryFn: () => fetchTotalVolume(),
    select: (res) => (res.code === 200 ? res.data : { volume: '0', assetsReserveEnd: '0', sharesReserveEnd: '0' }),
  });
}

// TypeScript React component methods for: perf: ⚡ optimize image loading strategy
interface perf____optimize_image_loading_strategyProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface perf____optimize_image_loading_strategyState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const useperf____optimize_image_loading_strategy = () => {
  const [state, setState] = useState<perf____optimize_image_loading_strategyState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handleperf____optimize_image_loading_strategy = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/perf____optimize_image_loading_strategy');
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
    handleperf____optimize_image_loading_strategy
  };
};
