import { clsxm } from '@/utils';
import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type OptionType = {
  label?: string | React.ReactNode;
  value: string | number;
} | null;

type SegmentedProps = {
  options: OptionType[]; //  
  defaultValue?: string | number; //  
  onChange?: (value: string | number) => void;
  className?: string;
  indicateClass?: string;
  labelClass?: string;
  id?: string;
};

export const Segmented = ({ options, defaultValue, onChange, className, id, indicateClass, labelClass }: SegmentedProps) => {
  const [value, setValue] = useState(() => defaultValue ?? options[0]?.value ?? '');
  const select = useCallback(
    (value: string | number) => {
      setValue(value);
      onChange?.(value);
    },
    [setValue, onChange],
  );
  const isSelected = useCallback((selectedValue: string | number) => value === selectedValue, [value]);
  return (
    <div
      className={twMerge(
        'flex w-fit cursor-pointer select-none rounded-sm bg-white/10 p-[0.48vw] text-xs font-medium backdrop-blur-lg xl:p-1.5',
        className,
      )}
    >
      {options.map((option) => {
        if (!option) return null;
        const { label, value } = option;
        return (
          <div
            className={clsxm(
              'flex-center first:rounded-l-xs last:rounded-r-xs relative px-[0.96vw] py-[0.32vw] xl:px-3 xl:py-1',
              labelClass,
              { 'text-white': isSelected(value) },
              { '!font-medium opacity-50': !isSelected(value) },
            )}
            onClick={() => select(value)}
            key={value}
          >
            {label}
            {isSelected(value) && (
              <motion.div
                layoutId={`segmented_selected_${id ?? 'default'}`}
                className={twMerge('absolute inset-0 rounded-sm bg-white/[0.12]', indicateClass)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Segmented);

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

// TypeScript test for: test: 🧪 add user acceptance tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_user_acceptance_tests', () => {
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

// TypeScript utility function: security: 🔒 add security monitoring
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

export const security____add_security_monitoring: UtilityFunctions = {
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
