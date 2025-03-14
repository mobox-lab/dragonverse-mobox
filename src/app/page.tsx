import DragonKey from './_components/DragonKey';

export default function App() {
  return (
    <main>
      <DragonKey />
    </main>
  );
}

// TypeScript React component methods for: test: 🧪 add performance tests
interface test____add_performance_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_performance_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_performance_tests = () => {
  const [state, setState] = useState<test____add_performance_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_performance_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_performance_tests');
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
    handletest____add_performance_tests
  };
};
