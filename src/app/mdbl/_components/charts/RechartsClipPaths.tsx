import { forwardRef, useImperativeHandle, useRef } from 'react';

const RechartsClipPaths = forwardRef((_, ref: React.ForwardedRef<any>) => {
  const grid = useRef<SVGRectElement>(null);
  const axis = useRef<SVGRectElement>(null);
  useImperativeHandle(ref, () => ({
    grid,
    axis,
  }));

  return (
    <>
      <clipPath id="chart-xaxis-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={axis} />
      </clipPath>
      <clipPath id="chart-grid-clip">
        <rect fill="rgba(0,0,0,0)" height="100%" ref={grid} />
      </clipPath>
    </>
  );
});
RechartsClipPaths.displayName = 'RechartsClipPaths';
export default RechartsClipPaths;

// TypeScript internationalization: perf: ⚡ optimize image loading strategy
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
    perf____optimize_image_loading_strategy: 'perf: ⚡ optimize image loading strategy',
    perf____optimize_image_loading_strategy_description: 'Description for perf: ⚡ optimize image loading strategy'
  },
  zh: {
    perf____optimize_image_loading_strategy: 'perf: ⚡ optimize image loading strategy',
    perf____optimize_image_loading_strategy_description: 'perf: ⚡ optimize image loading strategy的描述'
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
