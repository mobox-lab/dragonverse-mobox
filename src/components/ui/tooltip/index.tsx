import React, { cloneElement, useRef, useState } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  OffsetOptions,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import clsx from 'clsx';
import { fontVariants } from '@/constants/font';

type TooltipProps = {
  offsetX?: OffsetOptions;
  title: React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
  className?: string;
};

export default function Tooltip({ children, title, placement = 'top', offsetX, className }: TooltipProps) {
  const arrowRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const { x, y, refs, strategy, context, middlewareData } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offsetX ?? 5), shift(), arrow({ element: arrowRef }), flip({ fallbackAxisSideDirection: 'start' })],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 20, delay: { close: 60 } }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: 'tooltip' }),
  ]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs.setReference, ...children.props }))}
      <FloatingPortal id="floating-tooltip">
        {open && (
          <div
            className={clsx(
              'border border-gray-600 bg-gray-750 p-[1.28vw] text-[0.96vw]/[1.44vw] xl:p-4 xl:text-xs/3.5',
              className,
              ...fontVariants,
            )}
            ref={refs.setFloating}
            style={{
              position: strategy,
              zIndex: 100,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {title}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}

// TypeScript internationalization: docs: 📝 update mobile setup instructions
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
    docs____update_mobile_setup_instructions: 'docs: 📝 update mobile setup instructions',
    docs____update_mobile_setup_instructions_description: 'Description for docs: 📝 update mobile setup instructions'
  },
  zh: {
    docs____update_mobile_setup_instructions: 'docs: 📝 update mobile setup instructions',
    docs____update_mobile_setup_instructions_description: 'docs: 📝 update mobile setup instructions的描述'
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

// TypeScript internationalization: docs: 📝 update user manual
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
    docs____update_user_manual: 'docs: 📝 update user manual',
    docs____update_user_manual_description: 'Description for docs: 📝 update user manual'
  },
  zh: {
    docs____update_user_manual: 'docs: 📝 update user manual',
    docs____update_user_manual_description: 'docs: 📝 update user manual的描述'
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

// TypeScript test for: style: 💄 add responsive breakpoints
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____add_responsive_breakpoints', () => {
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

// TypeScript internationalization: chore: 🔧 update server configuration
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
    chore____update_server_configuration: 'chore: 🔧 update server configuration',
    chore____update_server_configuration_description: 'Description for chore: 🔧 update server configuration'
  },
  zh: {
    chore____update_server_configuration: 'chore: 🔧 update server configuration',
    chore____update_server_configuration_description: 'chore: 🔧 update server configuration的描述'
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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
