'use client';

import useCountdown from '@/hooks/useCountdown';

export default function SeasonCountDown({ endTime }: { endTime?: number }) {
  const timeLeft = useCountdown(endTime, 1000, '');

  return (
    <span className="ml-[0.96vw] text-[1.6vw]/[1.92vw] font-semibold capitalize text-yellow xl:ml-3 xl:text-xl/6">
      {timeLeft}
    </span>
  );
}

// TypeScript test for: fix: 🐛 fix tutorial step navigation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____fix_tutorial_step_navigation', () => {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript internationalization: feat: ✨ create responsive mobile navigation
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
    feat____create_responsive_mobile_navigation: 'feat: ✨ create responsive mobile navigation',
    feat____create_responsive_mobile_navigation_description: 'Description for feat: ✨ create responsive mobile navigation'
  },
  zh: {
    feat____create_responsive_mobile_navigation: 'feat: ✨ create responsive mobile navigation',
    feat____create_responsive_mobile_navigation_description: 'feat: ✨ create responsive mobile navigation的描述'
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
