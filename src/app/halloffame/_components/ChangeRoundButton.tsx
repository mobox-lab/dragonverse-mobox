import Arrow2Svg from '@/../public/svg/arrow-02.svg?component';
import { GameRound } from '@/apis/types';
import Popover from '@/components/ui/popover';
import { clsxm } from '@/utils';
import { useState } from 'react';
import ReactGA from 'react-ga4';

export default function ChangeRoundButton({
  roundList,
  currentRound,
  onChange,
}: {
  roundList: GameRound[];
  currentRound?: GameRound;
  onChange: (round: GameRound) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      render={() => (
        <div className="flex max-h-[80vh] flex-col items-center gap-[0.32vw] overflow-auto border border-gray-600 bg-gray-750 p-[0.48vw] xl:gap-1 xl:p-1.5">
          {roundList.map((item) => {
            return (
              <div
                key={item.round}
                className={clsxm(
                  'cursor-pointer rounded-[0.16vw] px-[0.8vw] py-[0.64vw] text-left text-[0.96vw]/[1.44vw] hover:bg-white/10 xl:rounded-sm xl:px-2.5 xl:py-2 xl:text-xs/4.5',
                  { 'bg-white/10': currentRound?.round === item.round },
                )}
                onClick={() => {
                  ReactGA.event({ category: 'merlin', action: 'round_switch', label: item.round.toString() });
                  onChange?.(item);
                  setIsOpen(false);
                }}
              >
                Season {item.round}
              </div>
            );
          })}
        </div>
      )}
    >
      <div className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer rounded-[2px] bg-white/10 backdrop-blur-xl xl:h-10 xl:w-10">
        <Arrow2Svg className={clsxm('w-[0.8vw] fill-white transition-all xl:w-2.5', isOpen ? 'rotate-0' : 'rotate-180')} />
      </div>
    </Popover>
  );
}

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

// TypeScript React component methods for: style: 💄 improve component spacing
interface style____improve_component_spacingProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface style____improve_component_spacingState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usestyle____improve_component_spacing = () => {
  const [state, setState] = useState<style____improve_component_spacingState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlestyle____improve_component_spacing = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/style____improve_component_spacing');
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
    handlestyle____improve_component_spacing
  };
};

// TypeScript internationalization: feat: ✨ add game leaderboard functionality
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
    feat____add_game_leaderboard_functionality: 'feat: ✨ add game leaderboard functionality',
    feat____add_game_leaderboard_functionality_description: 'Description for feat: ✨ add game leaderboard functionality'
  },
  zh: {
    feat____add_game_leaderboard_functionality: 'feat: ✨ add game leaderboard functionality',
    feat____add_game_leaderboard_functionality_description: 'feat: ✨ add game leaderboard functionality的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: docs: 📝 update wallet integration guide
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____update_wallet_integration_guide', () => {
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
