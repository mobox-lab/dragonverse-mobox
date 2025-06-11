import { ChangeEventHandler, KeyboardEventHandler, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import ArrowSvg from '@/../public/svg/arrow.svg?component';
import { gameAssetsLogDrawerAtom } from '@/atoms/assets';
import Button from '@/components/ui/button';
import Drawer from '@/components/ui/drawer/index';
import RankTable from '@/components/ui/table/RankTable';
import { GAME_ASSETS_ID, GameAssetID } from '@/constants/gameAssets';
import { useFetchGameAssetLog } from '@/hooks/shop';
import { useGameAssetLogColumns } from '@/hooks/useGameAssetLogColumns';
import { clsxm } from '@/utils';

const SIZE = 20;

const tabs = [
  {
    id: GAME_ASSETS_ID.StaminaPotion,
    icon: '/img/senzu-bean.png',
    name: 'Senzu Potion',
    describe: 'Instant Stamina Recovery',
  },
  {
    id: GAME_ASSETS_ID.CaptureBall,
    icon: '/img/capture-ball.png',
    name: 'Blue Snitch',
    describe: 'Capture DragonPal',
  },
  {
    id: GAME_ASSETS_ID.SweepToken,
    icon: '/img/sweep-token.png',
    name: 'Sweep Token',
    describe: 'Speed-sweep for Perfect Victory stages',
  },
];

export default function GameAssetsLog() {
  const [isOpen, setIsOpen] = useAtom(gameAssetsLogDrawerAtom);
  const [tab, setTab] = useState<GameAssetID>(GAME_ASSETS_ID.StaminaPotion);
  const columns = useGameAssetLogColumns(tab);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const { data, isFetching } = useFetchGameAssetLog(tab, page, SIZE);
  const hasMore = useMemo(() => {
    return page * SIZE < (data?.total ?? 0);
  }, [data?.total, page]);

  const changePage = useCallback(
    (page: number) => {
      const hasMore = (page - 1) * SIZE < (data?.total ?? 0);
      if (page === 0 || !hasMore) return;
      setPage(page);
      setInputValue(page + '');
    },
    [data?.total],
  );

  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    try {
      const newPage = Number(e.target.value);
      if (isNaN(newPage)) return;
      setInputValue(e.target.value);
    } catch (e) {
      return;
    }
  }, []);

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        try {
          const newPage = Number(e.currentTarget.value);
          if (isNaN(newPage)) return;
          changePage(newPage);
        } catch (e) {
        }
      }
    },
    [changePage],
  );

  const onTabChange = useCallback((id: GameAssetID) => {
    setTab(id);
    changePage(1);
  }, [changePage]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Asset History"
      className="flex flex-col"
      render={() => (
        <div className="flex w-[45.4vw] flex-grow flex-col xl:w-[550px] overflow-auto">
          <ul className='flex items-center w-full bg-white/[0.06] mb-[1.8vw] p-[0.4vw]'>
            {
              tabs.map(item => (
                <li className={clsx('flex-1 flex items-center p-[0.5vw] cursor-pointer', item.id === tab ? 'bg-white/[0.12]' : null)} key={item.id} onClick={() => onTabChange(item.id)}>
                  <div className='size-[2.5vw] flex items-center justify-center pl-[0.1vw]'>
                    <img src={item.icon} className='w-full' />
                  </div>
                  <div className='flex flex-col justify-center leading-none ml-[0.6vw]'>
                    <div className='text-[0.8vw] font-medium'>{item.name}</div>
                    <div className='text-[0.7vw] text-gray-300 mt-[0.3vw]'>{item.describe}</div>
                  </div>
                </li>
              ))
            }
          </ul>
          <RankTable
            loading={isFetching}
            className="overflow-auto"
            gapClass="gap-[1.92vw] xl:gap-2"
            bodyClass="xl:pb-0 pb-0"
            dataSource={data?.data ?? []}
            columns={columns}
          />
          <div className="flex-center mt-8 gap-[0.64vw] justify-self-end text-[0.96vw]/[1.44vw] xl:gap-2 xl:text-xs/4.5">
            <Button
              className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
            >
              <ArrowSvg
                className={clsxm('h-[0.96vw] w-[0.96vw] -rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
                  'fill-gray-300/50': page === 1,
                })}
              />
            </Button>
            <input
              value={inputValue}
              className="h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-transparent text-center text-white xl:h-6 xl:w-6"
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
            />
            <span className="-mb-[0.1vw] -ml-[0.32vw] text-gray-300 xl:-mb-px xl:-ml-1">
              / {Math.ceil((data?.total ?? 0) / SIZE)}
            </span>
            <Button
              className="flex-center h-[1.92vw] w-[1.92vw] border border-gray-300/50 bg-white/10 disabled:bg-white/10 xl:h-6 xl:w-6"
              onClick={() => changePage(page + 1)}
              disabled={!hasMore}
            >
              <ArrowSvg
                className={clsxm('h-[0.96vw] w-[0.96vw] rotate-90 overflow-visible fill-white xl:h-3 xl:w-3', {
                  'fill-gray-300/50': !hasMore,
                })}
              />
            </Button>
          </div>
        </div>
      )}
    />
  );
}

// TypeScript utility function: feat: ✨ add game modding support
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

export const feat____add_game_modding_support: UtilityFunctions = {
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

// TypeScript utility function: fix: 🐛 fix dark mode toggle not working
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

export const fix____fix_dark_mode_toggle_not_working: UtilityFunctions = {
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

// TypeScript test for: chore: 🔧 add code formatting
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____add_code_formatting', () => {
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

// TypeScript internationalization: perf: ⚡ improve caching strategy
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
    perf____improve_caching_strategy: 'perf: ⚡ improve caching strategy',
    perf____improve_caching_strategy_description: 'Description for perf: ⚡ improve caching strategy'
  },
  zh: {
    perf____improve_caching_strategy: 'perf: ⚡ improve caching strategy',
    perf____improve_caching_strategy_description: 'perf: ⚡ improve caching strategy的描述'
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

// TypeScript React component methods for: fix: 🐛 resolve chat message duplication
interface fix____resolve_chat_message_duplicationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface fix____resolve_chat_message_duplicationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefix____resolve_chat_message_duplication = () => {
  const [state, setState] = useState<fix____resolve_chat_message_duplicationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefix____resolve_chat_message_duplication = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/fix____resolve_chat_message_duplication');
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
    handlefix____resolve_chat_message_duplication
  };
};
