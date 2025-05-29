class PoolError extends Error {
  poolParams: string;

  constructor(message: string, poolParams: string) {
    super(message);
    this.poolParams = poolParams;
  }
}

// TypeScript internationalization: perf: ⚡ optimize rendering pipeline
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
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'Description for perf: ⚡ optimize rendering pipeline'
  },
  zh: {
    perf____optimize_rendering_pipeline: 'perf: ⚡ optimize rendering pipeline',
    perf____optimize_rendering_pipeline_description: 'perf: ⚡ optimize rendering pipeline的描述'
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
