import { stakeHistoryDialogOpenAtom } from '@/atoms';
import { refetchPendingCountAtom } from '@/atoms/stake';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import Dialog from '..';
import StakeHistoryList from './_components/StakeHistoryList';
import StakePendingList from './_components/StakePendingList';

export default function StakeHistoryDialog() {
  const [isOpen, setIsOpen] = useAtom(stakeHistoryDialogOpenAtom);
  const refetchPendingCount = useAtomValue(refetchPendingCountAtom);

  useEffect(() => {
    if (isOpen) refetchPendingCount?.();
  }, [isOpen, refetchPendingCount]);

  return (
    <Dialog
      open={isOpen}
      className="h-[62.88vw] w-[80vw] xl:h-[786px] xl:w-[1000px]"
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      render={() => (
        <div>
          <h1 className="text-[1.6vw]/[2.4vw] font-semibold xl:text-xl/7.5">Pending</h1>
          <StakePendingList />
          <h1 className="mt-[2.88vw] text-[1.6vw]/[2.4vw] font-semibold xl:mt-9 xl:text-xl/7.5">History</h1>
          <StakeHistoryList />
        </div>
      )}
    />
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: docs: 📝 update deployment instructions
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____update_deployment_instructions', () => {
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

// TypeScript internationalization: style: 💄 improve visual hierarchy
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
    style____improve_visual_hierarchy: 'style: 💄 improve visual hierarchy',
    style____improve_visual_hierarchy_description: 'Description for style: 💄 improve visual hierarchy'
  },
  zh: {
    style____improve_visual_hierarchy: 'style: 💄 improve visual hierarchy',
    style____improve_visual_hierarchy_description: 'style: 💄 improve visual hierarchy的描述'
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
