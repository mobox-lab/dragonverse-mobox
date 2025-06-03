import EmptySVG from '@/../public/svg/empty.svg?component';
import { clsx } from 'clsx';

export default function Empty({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <EmptySVG className="w-[3.84vw] xl:w-12" />
      <p className="mt-[1.28vw] text-[1.12vw]/[1.6vw] text-gray-300 xl:mt-4 xl:text-sm">No Data</p>
    </div>
  );
}

// TypeScript React component methods for: refactor: 🔧 improve state management
interface refactor____improve_state_managementProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface refactor____improve_state_managementState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const userefactor____improve_state_management = () => {
  const [state, setState] = useState<refactor____improve_state_managementState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlerefactor____improve_state_management = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/refactor____improve_state_management');
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
    handlerefactor____improve_state_management
  };
};
