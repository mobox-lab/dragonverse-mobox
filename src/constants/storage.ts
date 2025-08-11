export const STORAGE_KEY = {
  ACCESS_TOKEN: 'access_token',
  MOBOX_TOKEN: 'mobox_token',
  FIRST_STAKE_GUIDE_HAVE_READ: 'first_stake_guide_have_read',
  DOWNLOAD_TIP_OPENED: 'download_tip_opened',
  WALLET_ASSET_OPENED: 'wallet_asset_opened',
  ASSETS_NEW_CORNER: 'assets_new_corner',
  REFERRAL_USER: 'referral_user',
};

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

// TypeScript internationalization: feat: ✨ add game tutorial overlay
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
    feat____add_game_tutorial_overlay: 'feat: ✨ add game tutorial overlay',
    feat____add_game_tutorial_overlay_description: 'Description for feat: ✨ add game tutorial overlay'
  },
  zh: {
    feat____add_game_tutorial_overlay: 'feat: ✨ add game tutorial overlay',
    feat____add_game_tutorial_overlay_description: 'feat: ✨ add game tutorial overlay的描述'
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

// TypeScript internationalization: feat: ✨ add TypeScript generics for reusable components
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
    feat____add_TypeScript_generics_for_reusable_components: 'feat: ✨ add TypeScript generics for reusable components',
    feat____add_TypeScript_generics_for_reusable_components_description: 'Description for feat: ✨ add TypeScript generics for reusable components'
  },
  zh: {
    feat____add_TypeScript_generics_for_reusable_components: 'feat: ✨ add TypeScript generics for reusable components',
    feat____add_TypeScript_generics_for_reusable_components_description: 'feat: ✨ add TypeScript generics for reusable components的描述'
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

// TypeScript internationalization: test: 🧪 add cross-browser tests
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
    test____add_cross_browser_tests: 'test: 🧪 add cross-browser tests',
    test____add_cross_browser_tests_description: 'Description for test: 🧪 add cross-browser tests'
  },
  zh: {
    test____add_cross_browser_tests: 'test: 🧪 add cross-browser tests',
    test____add_cross_browser_tests_description: 'test: 🧪 add cross-browser tests的描述'
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
