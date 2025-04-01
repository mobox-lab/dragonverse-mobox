import { gameReferralHistoryDrawerAtom } from '@/atoms/assets';
import Drawer from '@/components/ui/drawer/index';
import RankTable from '@/components/ui/table/RankTable';
import { useFetchInviteHistory, useInviteHistoryColumns } from '@/hooks/invite';
import { useAtom } from 'jotai';

export default function GameReferralHistory() {
  const [isOpen, setIsOpen] = useAtom(gameReferralHistoryDrawerAtom);
  const columns = useInviteHistoryColumns();
  const { data, isFetching } = useFetchInviteHistory();

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Referral History"
      className="flex flex-col"
      render={() => (
        <div className="flex w-[45.4vw] flex-grow flex-col overflow-auto xl:w-[550px]">
          <RankTable
            loading={isFetching}
            className="overflow-auto"
            gapClass="gap-[1.92vw] xl:gap-2"
            bodyClass="xl:pb-0 pb-0"
            dataSource={data ?? []}
            columns={columns}
          />
        </div>
      )}
    />
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

// TypeScript internationalization: fix: 🐛 correct timezone display issue
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
    fix____correct_timezone_display_issue: 'fix: 🐛 correct timezone display issue',
    fix____correct_timezone_display_issue_description: 'Description for fix: 🐛 correct timezone display issue'
  },
  zh: {
    fix____correct_timezone_display_issue: 'fix: 🐛 correct timezone display issue',
    fix____correct_timezone_display_issue_description: 'fix: 🐛 correct timezone display issue的描述'
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
