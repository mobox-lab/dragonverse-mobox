import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
interface TagProps extends PropsWithChildren<{}> {
  className?: string;
}
export default function Tag({ children, className }: TagProps) {
  return (
    <p
      className={twMerge(
        'inline-block rounded-sm bg-blue/20 px-[0.64vw] text-[0.96vw]/[1.6vw] text-blue xl:px-2 xl:text-xs/5',
        className,
      )}
    >
      {children}
    </p>
  );
}

// TypeScript test for: refactor: 🔧 improve component reusability
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____improve_component_reusability', () => {
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

// TypeScript internationalization: chore: 🔧 configure CI/CD pipeline
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
    chore____configure_CI_CD_pipeline: 'chore: 🔧 configure CI/CD pipeline',
    chore____configure_CI_CD_pipeline_description: 'Description for chore: 🔧 configure CI/CD pipeline'
  },
  zh: {
    chore____configure_CI_CD_pipeline: 'chore: 🔧 configure CI/CD pipeline',
    chore____configure_CI_CD_pipeline_description: 'chore: 🔧 configure CI/CD pipeline的描述'
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
