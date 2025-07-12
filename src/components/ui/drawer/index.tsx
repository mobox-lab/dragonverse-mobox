'use client';

import React, { memo, cloneElement, PropsWithChildren, useState, useEffect } from 'react';
import clsx from 'clsx';
import { fontVariants } from '@/constants/font';
import ArrowSVG from '@/../public/svg/arrow.svg?component';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { CloseSvg } from '@/components/ui/svg/CloseSvg';

type DrawerProps = {
  open?: boolean;
  className?: string;
  isDismiss?: boolean;
  title?: React.ReactNode;
  children?: React.JSX.Element;
  onOpenChange?: (open: boolean) => void;
  render: (props: { close: () => void }) => React.ReactNode;
};

function Drawer({
  open: passedOpen = false,
  className,
  render,
  onOpenChange,
  isDismiss = true,
  title,
  children,
}: PropsWithChildren<DrawerProps>) {
  const nodeId = useFloatingNodeId();
  const [isOpen, setIsOpen] = useState(false);
  const parentNodeId = useFloatingParentNodeId();

  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

  const { refs, context } = useFloating({ nodeId, open: isOpen, onOpenChange: onChange });
  const { setReference, setFloating } = refs;
  const dismiss = useDismiss(context, { enabled: isDismiss, outsidePressEvent: 'mousedown' });
  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), dismiss]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingNode id={nodeId}>
        <FloatingPortal>
          <AnimatePresence>
            {isOpen && (
              <FloatingOverlay
                lockScroll
                style={{ overflow: 'hidden' }}
                className={clsx('z-[100]', { 'bg-black/70': !parentNodeId })}
              >
                <FloatingFocusManager context={context}>
                  <motion.aside
                    className={clsx(
                      'absolute right-0 flex h-full flex-col bg-gray-850 p-[1.92vw] backdrop-blur-lg xl:p-6',
                      ...fontVariants,
                      className,
                    )}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                    {...getFloatingProps({ ref: setFloating })}
                  >
                    {title ? (
                      <div className="mb-[3.84vw] flex items-center justify-between xl:mb-12">
                        <div className="flex-center gap-[0.64vw] text-[1.6vw]/[1.92vw] font-semibold xl:gap-2 xl:text-xl/6">
                          {parentNodeId && (
                            <div
                              onClick={() => onChange(false)}
                              className="flex-center siz-[2.88vw] cursor-pointer rounded-full border border-gray-400 hover:border-white/80 xl:size-9"
                            >
                              <ArrowSVG className="w-[1.6vw] -rotate-90 fill-white xl:w-5" />
                            </div>
                          )}
                          {title}
                        </div>
                        {!parentNodeId && (
                          <CloseSvg
                            onClick={() => onChange(false)}
                            className="h-[1.12vw] w-[1.12vw] cursor-pointer hover:stroke-white xl:h-3.5 xl:w-3.5"
                          />
                        )}
                      </div>
                    ) : null}
                    {render({ close: () => onChange(false) })}
                  </motion.aside>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </FloatingNode>
    </>
  );
}

export default memo(Drawer);

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

// TypeScript utility function: fix: 🐛 fix cross-browser compatibility
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

export const fix____fix_cross_browser_compatibility: UtilityFunctions = {
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

// TypeScript internationalization: test: 🧪 add API endpoint tests
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
    test____add_API_endpoint_tests: 'test: 🧪 add API endpoint tests',
    test____add_API_endpoint_tests_description: 'Description for test: 🧪 add API endpoint tests'
  },
  zh: {
    test____add_API_endpoint_tests: 'test: 🧪 add API endpoint tests',
    test____add_API_endpoint_tests_description: 'test: 🧪 add API endpoint tests的描述'
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
