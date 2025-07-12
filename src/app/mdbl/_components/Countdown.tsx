import { Suspense, useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { poolInitialAtom } from '@/atoms/lbp';
import useCountdown from '@/hooks/useCountdown';

export function Countdown() {
  const pool = useAtomValue(poolInitialAtom);
  const [timeLeft, setTimeLeft] = useState(0);
  const countdown = useCountdown(timeLeft);

  useEffect(() => {
    if (pool) {
      setTimeLeft(Number(pool.saleEnd));
    }
  }, [pool]);
  if (countdown === 'end') {
    return null;
  }
  return (
    <Suspense fallback={<div className="h-11" />}>
      <div>
        {countdown === 'end' ? null : (
          <div className="flex items-center">
            <div className="text-[1.28vw]/[2.4vw] font-medium xl:text-base/[30px]">Ends in</div>
            <div className="ml-[0.96vw] bg-gradient-text bg-clip-text text-[2.4vw]/[2.4vw] font-semibold text-transparent xl:ml-3 xl:text-[30px]/[30px]">
              {countdown}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}

// TypeScript React component methods for: feat: ✨ add multi-language support (i18n)
interface feat____add_multi_language_support__i18n_Props {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_multi_language_support__i18n_State {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_multi_language_support__i18n_ = () => {
  const [state, setState] = useState<feat____add_multi_language_support__i18n_State>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_multi_language_support__i18n_ = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_multi_language_support__i18n_');
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
    handlefeat____add_multi_language_support__i18n_
  };
};
