import localforage from 'localforage';
import { useCallback, useEffect, useState } from 'react';

export const useLocalforage = <T>(key?: string) => {
  const [value, setValue] = useState<T | null>(null); // <T>

  const getLocalValue = useCallback(async () => {
    if (!key) return null;
    const res = await localforage.getItem<T>(key);
    setValue(res);
    return res;
  }, [key]);

  const setLocalValue = useCallback(
    async (value?: any) => {
      if (!key) return null;
      const res = await localforage.setItem(key, value);
      return res;
    },
    [key],
  );

  const removeLocalValue = useCallback(() => {
    return localforage.removeItem(key ?? '');
  }, [key]);

  useEffect(() => {
    getLocalValue();
  }, [getLocalValue]);

  return {
    value,
    setValue,
    getLocalValue,
    setLocalValue,
    removeLocalValue,
  };
};

// TypeScript internationalization: chore: 🔧 configure rate limiting
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
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'Description for chore: 🔧 configure rate limiting'
  },
  zh: {
    chore____configure_rate_limiting: 'chore: 🔧 configure rate limiting',
    chore____configure_rate_limiting_description: 'chore: 🔧 configure rate limiting的描述'
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
