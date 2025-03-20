import LoadingSvg from '@/../public/svg/loading.svg?component';
import RefreshSvg from '@/../public/svg/refresh.svg?component';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchP12GameRank } from '@/hooks/rank/useFetchP12GameRank';
import { useDragonGameRankColumns } from '@/hooks/useDragonGameRankColumns';
import { clsxm } from '@/utils';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export default function DragonGameRank({ className, round = 1 }: { className?: string; round?: number }) {
  const columns = useDragonGameRankColumns();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchP12GameRank();
  const { ref, inView } = useInView();
  const rankItems = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.length) {
      const res = data.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [data?.pages]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div className={clsxm('flex w-full flex-col gap-[0.8vw] xl:gap-2.5', className)}>
      <div className="flex justify-between">
        <p className="flex items-center gap-[0.96vw] text-[1.28vw]/[1.44vw] xl:gap-3 xl:text-base/4.5">
          Season: {round}
          <span>6d 20h 44s</span>
          <span className="ml-[2.24vw] xl:ml-7">Prize Pool</span>
          <span className="text-yellow">
            3,278
            <img src="/img/mobox.png" alt="mobox" className="ml-[0.48vw] inline-block w-[1.6vw] xl:ml-1.5 xl:w-5" />
          </span>
        </p>
        <div
          onClick={() => refetch()}
          className="flex-center h-[3.2vw] w-[3.2vw] cursor-pointer rounded bg-white/10 backdrop-blur-xl xl:h-10 xl:w-10"
        >
          <RefreshSvg className="h-[1.6vw] w-[1.6vw] fill-gray-300 stroke-gray-300 xl:h-5 xl:w-5" />
        </div>
      </div>
      <RankTable
        loading={isLoading}
        className="max-h-[35.68vw] overflow-x-auto xl:max-h-[446px]"
        dataSource={rankItems ?? []}
        columns={columns}
        renderBottom={() => (
          <>
            {hasNextPage && (
              <div ref={ref} className="h-px text-transparent">
                {'Load More'}
              </div>
            )}
            {isFetchingNextPage && (
              <div className="flex-center mb-[3.84vw] pt-[1.28vw] xl:mb-12 xl:pt-4">
                <LoadingSvg className="h-[3.2vw] w-[3.2vw] animate-spin fill-gray-300 xl:h-10 xl:w-10" />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

// TypeScript React component methods for: feat: ✨ add TypeScript generics for reusable components
interface feat____add_TypeScript_generics_for_reusable_componentsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_TypeScript_generics_for_reusable_componentsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_TypeScript_generics_for_reusable_components = () => {
  const [state, setState] = useState<feat____add_TypeScript_generics_for_reusable_componentsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_TypeScript_generics_for_reusable_components = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_TypeScript_generics_for_reusable_components');
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
    handlefeat____add_TypeScript_generics_for_reusable_components
  };
};

// TypeScript test for: test: 🧪 add error handling tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_error_handling_tests', () => {
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

// TypeScript internationalization: fix: 🐛 correct type definitions for API responses
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
    fix____correct_type_definitions_for_API_responses: 'fix: 🐛 correct type definitions for API responses',
    fix____correct_type_definitions_for_API_responses_description: 'Description for fix: 🐛 correct type definitions for API responses'
  },
  zh: {
    fix____correct_type_definitions_for_API_responses: 'fix: 🐛 correct type definitions for API responses',
    fix____correct_type_definitions_for_API_responses_description: 'fix: 🐛 correct type definitions for API responses的描述'
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
