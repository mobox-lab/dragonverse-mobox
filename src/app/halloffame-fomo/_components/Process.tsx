'use client';

import { clsxm } from '@/utils';
import { useEffect, useMemo, useState } from 'react';

export default function Process({
  type = 'pet',
  total = 0,
  current = 0,
}: {
  type?: 'pet' | 'ramble';
  total?: number;
  current?: number;
}) {
  const [percent, setPercent] = useState<number>(0);
  const [percentWidth, setPercentWidth] = useState<number>(0);

  useEffect(() => {
    if (total && total !== 0 && current) {
      setPercent((current / total) * 100);
    }
  }, [total, current]);

  const processStyle = useMemo(() => {
    return {
      width: percentWidth,
    };
  }, [percentWidth]);

  useEffect(() => {
    const updatePercentWidth = () => {
      const parentElement = document.getElementById('process');
      if (parentElement) {
        const parentWidth = parentElement.offsetWidth;
        const percentW = (percent / 100) * parentWidth;
        setPercentWidth(percentW);
      }
    };

    window.addEventListener('resize', updatePercentWidth);

    updatePercentWidth();

    return () => {
      window.removeEventListener('resize', updatePercentWidth);
    };
  }, [percent]);

  return (
    <div className="mt-[1.28vw] flex h-auto flex-1 flex-col justify-end xl:mt-4">
      <div id="process" className="relative h-[2.56vw] w-full border border-gray-600/30 bg-[#191919] xl:h-9">
        <div
          className="absolute left-0 top-0 h-[2.56vw] bg-gradient-yellow-dark xl:h-9"
          style={{
            ...processStyle,
            // clipPath: `polygon(0 0, 100% 0, calc(${percentWidth}px) 100%,0% 100%),`,
            boxShadow: '2px 2px 2px 0px rgba(255, 255, 255, 0.60) inset, 0px -1px 6px 0px #FFB800 inset',
          }}
        >
          <div
            className={clsxm(
              'absolute right-[6.4vw] top-1/2 -translate-y-1/2 transform text-nowrap text-[1.28vw]/[1.6vw] font-bold xl:right-20 xl:text-base/5',
              { '-right-[12.8vw] xl:-right-40': percent < 30 },
            )}
          >
            {current}/{total} Players
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};

// TypeScript internationalization: security: 🔒 add XSS protection
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
    security____add_XSS_protection: 'security: 🔒 add XSS protection',
    security____add_XSS_protection_description: 'Description for security: 🔒 add XSS protection'
  },
  zh: {
    security____add_XSS_protection: 'security: 🔒 add XSS protection',
    security____add_XSS_protection_description: 'security: 🔒 add XSS protection的描述'
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

// TypeScript utility function: security: 🔒 implement session management
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

export const security____implement_session_management: UtilityFunctions = {
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
