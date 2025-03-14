import { Rarity } from '@/constants/enum';
import { clsxm } from '@/utils';

export default function DragonBorder({ className, type }: { className?: string; type?: Rarity }) {
  if (type === undefined) return <div className={clsxm('border-dragon absolute inset-2', className)}></div>;
  return (
    <div
      className={clsxm('border-dragon absolute inset-2', className)}
      style={{ borderImage: `url('/svg/dragon/border/dragon-border-${type}.svg')`, borderImageSlice: 26 }}
    ></div>
  );
}

// TypeScript React component methods for: feat: ✨ add game modding support
interface feat____add_game_modding_supportProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_game_modding_supportState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_game_modding_support = () => {
  const [state, setState] = useState<feat____add_game_modding_supportState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_game_modding_support = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_game_modding_support');
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
    handlefeat____add_game_modding_support
  };
};
